package api_test

import (
	"bookswap-auth/internal/api"
	"bytes"
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/jackc/pgx/v5/pgxpool"
	_ "github.com/jackc/pgx/v5/stdlib"
)

const dsn = "postgres://test:test@localhost:5433/test?sslmode=disable"

var pool *pgxpool.Pool
var db *sql.DB

func TestMain(m *testing.M) {
	var err error
	pool, err = pgxpool.New(context.Background(), dsn)
	if err != nil {
		fmt.Fprintf(os.Stderr, "unable to connect pool: %v\n", err)
		os.Exit(1)
	}
	defer pool.Close()

	if _, err = pool.Exec(context.Background(), `
		CREATE EXTENSION IF NOT EXISTS "pgcrypto";
		CREATE TABLE IF NOT EXISTS users (
			id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
			username TEXT UNIQUE NOT NULL,
			password TEXT NOT NULL,
			avatar TEXT NOT NULL DEFAULT '',
			is_admin BOOLEAN DEFAULT FALSE
		);
	`); err != nil {
		fmt.Fprintf(os.Stderr, "failed to create table: %v", err)
		os.Exit(1)
	}

	db, err = sql.Open("pgx", dsn)
	if err != nil {
		fmt.Fprintf(os.Stderr, "sql.Open error: %v\n", err)
		os.Exit(1)
	}
	defer db.Close()

	code := m.Run()

	pool.Exec(context.Background(), "DROP TABLE users;")

	os.Exit(code)
}

func resetTable(t *testing.T) {
	if _, err := pool.Exec(context.Background(), "TRUNCATE TABLE users;"); err != nil {
		t.Fatalf("could not truncate users: %v", err)
	}
}

func TestRegister_Success(t *testing.T) {
	resetTable(t)
	mux := http.NewServeMux()
	api.SetupHandlers(mux, db)

	user := map[string]interface{}{"username": "alice", "password": "password123", "is_admin": false}
	body, _ := json.Marshal(user)
	req := httptest.NewRequest(http.MethodPost, "/register", bytes.NewReader(body))
	rec := httptest.NewRecorder()
	mux.ServeHTTP(rec, req)

	if rec.Code != http.StatusCreated {
		t.Fatalf("expected status 201, got %d", rec.Code)
	}

	var resp map[string]interface{}
	if err := json.NewDecoder(rec.Body).Decode(&resp); err != nil {
		t.Fatalf("invalid response JSON: %v", err)
	}
	if success, ok := resp["success"].(bool); !ok || !success {
		t.Error("expected success=true")
	}
}

func TestRegister_Duplicate(t *testing.T) {
	resetTable(t)
	if _, err := pool.Exec(context.Background(), "INSERT INTO users (username, password) VALUES ($1,$2)", "bob", "hash"); err != nil {
		t.Fatalf("setup insert error: %v", err)
	}

	mux := http.NewServeMux()
	api.SetupHandlers(mux, db)

	user := map[string]string{"username": "bob", "password": "secret"}
	body, _ := json.Marshal(user)
	req := httptest.NewRequest(http.MethodPost, "/register", bytes.NewReader(body))
	rec := httptest.NewRecorder()
	mux.ServeHTTP(rec, req)

	if rec.Code != http.StatusConflict {
		t.Fatalf("expected 409, got %d", rec.Code)
	}
}

func TestLogin_Success(t *testing.T) {
	resetTable(t)

	mux := http.NewServeMux()
	api.SetupHandlers(mux, db)

	userReg := map[string]interface{}{"username": "carol", "password": "pw123", "is_admin": false}
	bodyReg, _ := json.Marshal(userReg)
	mux.ServeHTTP(httptest.NewRecorder(), httptest.NewRequest(http.MethodPost, "/register", bytes.NewReader(bodyReg)))

	loginData := map[string]string{"username": "carol", "password": "pw123"}
	bodyLogin, _ := json.Marshal(loginData)
	req := httptest.NewRequest(http.MethodPost, "/login", bytes.NewReader(bodyLogin))
	rec := httptest.NewRecorder()
	mux.ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d", rec.Code)
	}
}

func TestLogin_WrongPassword(t *testing.T) {
	resetTable(t)

	mux := http.NewServeMux()
	api.SetupHandlers(mux, db)
	userReg := map[string]interface{}{"username": "dave", "password": "pw000", "is_admin": false}
	bodyReg, _ := json.Marshal(userReg)
	mux.ServeHTTP(httptest.NewRecorder(), httptest.NewRequest(http.MethodPost, "/register", bytes.NewReader(bodyReg)))

	loginData := map[string]string{"username": "dave", "password": "wrongpw"}
	bodyLogin, _ := json.Marshal(loginData)
	req := httptest.NewRequest(http.MethodPost, "/login", bytes.NewReader(bodyLogin))
	rec := httptest.NewRecorder()
	mux.ServeHTTP(rec, req)

	if rec.Code != http.StatusUnauthorized {
		t.Fatalf("expected 401, got %d", rec.Code)
	}
}

func TestLogin_NotFound(t *testing.T) {
	resetTable(t)
	mux := http.NewServeMux()
	api.SetupHandlers(mux, db)

	req := httptest.NewRequest(http.MethodPost, "/login", bytes.NewReader([]byte(`{"username":"x","password":"y"}`)))
	rec := httptest.NewRecorder()
	mux.ServeHTTP(rec, req)

	if rec.Code != http.StatusNotFound {
		t.Fatalf("expected 404, got %d", rec.Code)
	}
}

func TestMethods_NotAllowed(t *testing.T) {
	resetTable(t)
	mux := http.NewServeMux()
	api.SetupHandlers(mux, db)

	rec1 := httptest.NewRecorder()
	mux.ServeHTTP(rec1, httptest.NewRequest(http.MethodGet, "/register", nil))
	if rec1.Code != http.StatusMethodNotAllowed {
		t.Errorf("register GET: expected 405, got %d", rec1.Code)
	}

	rec2 := httptest.NewRecorder()
	mux.ServeHTTP(rec2, httptest.NewRequest(http.MethodGet, "/login", nil))
	if rec2.Code != http.StatusMethodNotAllowed {
		t.Errorf("login GET: expected 405, got %d", rec2.Code)
	}
}
