// Local adaptation of the Kubernetes/IBM Guestbook example.
// Copyright 2014 The Kubernetes Authors. Licensed under Apache-2.0.
package main

import (
	"context"
	"crypto/sha256"
	"embed"
	"encoding/json"
	"errors"
	"html/template"
	"io"
	"io/fs"
	"log"
	"mime"
	"net/http"
	"os"
	"os/signal"
	"strings"
	"syscall"
	"time"
	"unicode/utf8"
)

// The container build sets this to v1 or v2.
var version = "v1"

//go:embed public/*
var publicFiles embed.FS

func newHandler(store *Store, enableLoadGenerator bool) http.Handler {
	mux := http.NewServeMux()
	page := template.Must(template.ParseFS(publicFiles, "public/index.html"))
	staticFiles, err := fs.Sub(publicFiles, "public")
	if err != nil {
		panic(err)
	}
	mux.Handle("GET /static/", http.StripPrefix("/static/", http.FileServer(http.FS(staticFiles))))

	mux.HandleFunc("GET /{$}", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		if err := page.Execute(w, struct{ Version string }{version}); err != nil {
			log.Printf("render page: %v", err)
		}
	})

	mux.HandleFunc("GET /healthz", func(w http.ResponseWriter, r *http.Request) {
		writeJSON(w, http.StatusOK, map[string]string{"status": "ok", "version": version})
	})
	mux.HandleFunc("GET /readyz", func(w http.ResponseWriter, r *http.Request) {
		if err := store.Ping(r.Context()); err != nil {
			writeError(w, http.StatusServiceUnavailable, "The message store is unavailable.")
			return
		}
		writeJSON(w, http.StatusOK, map[string]string{"status": "ready"})
	})

	mux.HandleFunc("GET /api/entries", func(w http.ResponseWriter, r *http.Request) {
		entries, err := store.List(r.Context())
		if err != nil {
			log.Printf("read entries: %v", err)
			writeError(w, http.StatusServiceUnavailable, "Messages are unavailable. Please try again.")
			return
		}
		writeJSON(w, http.StatusOK, entries)
	})

	mux.HandleFunc("POST /api/entries", func(w http.ResponseWriter, r *http.Request) {
		mediaType, _, err := mime.ParseMediaType(r.Header.Get("Content-Type"))
		if err != nil || mediaType != "application/json" {
			writeError(w, http.StatusUnsupportedMediaType, "Send the message as JSON.")
			return
		}
		r.Body = http.MaxBytesReader(w, r.Body, 4096)
		decoder := json.NewDecoder(r.Body)
		decoder.DisallowUnknownFields()
		var input struct {
			Message string `json:"message"`
		}
		if err := decoder.Decode(&input); err != nil {
			var tooLarge *http.MaxBytesError
			if errors.As(err, &tooLarge) {
				writeError(w, http.StatusRequestEntityTooLarge, "The request is too large.")
			} else {
				writeError(w, http.StatusBadRequest, "Send a valid JSON message.")
			}
			return
		}
		if err := decoder.Decode(&struct{}{}); err != io.EOF {
			var tooLarge *http.MaxBytesError
			if errors.As(err, &tooLarge) {
				writeError(w, http.StatusRequestEntityTooLarge, "The request is too large.")
			} else {
				writeError(w, http.StatusBadRequest, "Send one JSON object.")
			}
			return
		}
		message := strings.TrimSpace(input.Message)
		if message == "" || utf8.RuneCountInString(message) > 280 {
			writeError(w, http.StatusBadRequest, "Enter a message between 1 and 280 characters.")
			return
		}
		entry, err := store.Add(r.Context(), message)
		if err != nil {
			log.Printf("save entry: %v", err)
			writeError(w, http.StatusInternalServerError, "Could not confirm whether your message was saved. Refresh the list before trying again.")
			return
		}
		writeJSON(w, http.StatusCreated, entry)
	})

	// This bounded CPU task makes the HPA exercise repeatable.
	// It is enabled only when ENABLE_LOAD_GENERATOR=true in the local lab manifest.
	if enableLoadGenerator {
		mux.HandleFunc("GET /work", func(w http.ResponseWriter, r *http.Request) {
			result := sha256.Sum256([]byte("guestbook autoscaling exercise"))
			for i := 0; i < 150000; i++ {
				result = sha256.Sum256(result[:])
			}
			writeJSON(w, http.StatusOK, map[string]any{"result": result[0]})
		})
	}

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.Header().Set("Cache-Control", "no-store")
		mux.ServeHTTP(w, r)
	})
}

func writeJSON(w http.ResponseWriter, status int, value any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	if err := json.NewEncoder(w).Encode(value); err != nil {
		log.Printf("write response: %v", err)
	}
}

func writeError(w http.ResponseWriter, status int, message string) {
	writeJSON(w, status, map[string]string{"error": message})
}

func main() {
	redisAddress := os.Getenv("REDIS_ADDR")
	if redisAddress == "" {
		redisAddress = "localhost:6379"
	}
	address := os.Getenv("LISTEN_ADDR")
	if address == "" {
		address = ":3000"
	}
	store := openStore(redisAddress)
	defer store.Close()
	server := &http.Server{
		Addr: address, Handler: newHandler(store, os.Getenv("ENABLE_LOAD_GENERATOR") == "true"),
		ReadHeaderTimeout: 5 * time.Second,
		ReadTimeout:       10 * time.Second,
		WriteTimeout:      10 * time.Second,
		IdleTimeout:       60 * time.Second,
	}
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()
	shutdownDone := make(chan struct{})
	go func() {
		<-ctx.Done()
		shutdownContext, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		if err := server.Shutdown(shutdownContext); err != nil {
			log.Printf("shutdown: %v", err)
		}
		close(shutdownDone)
	}()
	log.Printf("Guestbook %s listening on %s; Redis: %s", version, address, redisAddress)
	if err := server.ListenAndServe(); !errors.Is(err, http.ErrServerClosed) {
		log.Fatalf("serve guestbook: %v", err)
	}
	<-shutdownDone
}
