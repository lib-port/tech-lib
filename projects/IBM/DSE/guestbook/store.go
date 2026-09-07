package main

import (
	"context"
	"encoding/json"
	"time"

	"github.com/redis/go-redis/v9"
)

type Entry struct {
	Message   string    `json:"message"`
	CreatedAt time.Time `json:"created_at"`
}

// Every app replica connects to the same Redis list.
// Redis handles concurrent writes as Kubernetes adds app pods.
type Store struct {
	client *redis.Client
}

func openStore(address string) *Store {
	return &Store{client: redis.NewClient(&redis.Options{
		Addr: address, DialTimeout: 2 * time.Second,
		ReadTimeout: 2 * time.Second, WriteTimeout: 2 * time.Second,
		ContextTimeoutEnabled: true,
		// Retrying RPUSH after a lost reply could save the same message twice.
		MaxRetries: -1,
	})}
}

func (s *Store) Close() error { return s.client.Close() }

func (s *Store) Ping(ctx context.Context) error {
	ctx, cancel := context.WithTimeout(ctx, 2*time.Second)
	defer cancel()
	return s.client.Ping(ctx).Err()
}

func (s *Store) List(ctx context.Context) ([]Entry, error) {
	ctx, cancel := context.WithTimeout(ctx, 3*time.Second)
	defer cancel()
	values, err := s.client.LRange(ctx, "guestbook:entries", 0, -1).Result()
	if err != nil {
		return nil, err
	}
	entries := make([]Entry, 0, len(values))
	for _, value := range values {
		var entry Entry
		if err := json.Unmarshal([]byte(value), &entry); err != nil {
			return nil, err
		}
		entries = append(entries, entry)
	}
	return entries, nil
}

func (s *Store) Add(ctx context.Context, message string) (Entry, error) {
	entry := Entry{Message: message, CreatedAt: time.Now().UTC()}
	data, err := json.Marshal(entry)
	if err != nil {
		return Entry{}, err
	}
	ctx, cancel := context.WithTimeout(ctx, 3*time.Second)
	defer cancel()
	if err := s.client.RPush(ctx, "guestbook:entries", data).Err(); err != nil {
		return Entry{}, err
	}
	return entry, nil
}
