package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestEntriesContentType(t *testing.T) {
	handler := newHandler(nil, false)
	tests := []struct {
		name        string
		contentType string
		accepted    bool
	}{
		{"lowercase", "application/json", true},
		{"mixed case", "Application/JSON", true},
		{"charset", "application/json; charset=utf-8", true},
		{"mixed case with quoted charset", "APPLICATION/JSON; Charset=\"UTF-8\"", true},
		{"missing", "", false},
		{"plain text", "text/plain", false},
		{"malformed parameter", "application/json; charset", false},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// An empty message reaches validation only if the media type was accepted,
			// and avoids needing Redis for this HTTP contract test.
			request := httptest.NewRequest(http.MethodPost, "/api/entries", strings.NewReader("{\"message\":\"\"}"))
			request.Header.Set("Content-Type", tt.contentType)
			response := httptest.NewRecorder()
			handler.ServeHTTP(response, request)

			wantStatus := http.StatusUnsupportedMediaType
			wantError := "Send the message as JSON."
			if tt.accepted {
				wantStatus = http.StatusBadRequest
				wantError = "Enter a message between 1 and 280 characters."
			}
			if response.Code != wantStatus {
				t.Fatalf("status = %d, want %d; body = %s", response.Code, wantStatus, response.Body.String())
			}
			var result struct {
				Error string
			}
			if err := json.Unmarshal(response.Body.Bytes(), &result); err != nil {
				t.Fatal(err)
			}
			if result.Error != wantError {
				t.Errorf("error = %q, want %q", result.Error, wantError)
			}
		})
	}
}
