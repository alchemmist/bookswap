package api

import (
	"bookswap-auth/internal/data"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"golang.org/x/crypto/bcrypt"
)

func SetupHandlers(mux *http.ServeMux, db *sql.DB) {
	mux.HandleFunc("/login", handleLogin(db))
	mux.HandleFunc("/register", handleRegister(db))
}

func handleLogin(db *sql.DB) http.HandlerFunc {
	return enableCORS(func(w http.ResponseWriter, r *http.Request) {

		if r.Method != http.MethodPost {
			log.Printf("Wrong method: %s", r.Method)
			http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
			return
		}

		var creds data.Credentials
		if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
			log.Printf("JSON decode error: %v", err) // <-- Добавлено логирование
			http.Error(w, "Invalid JSON", http.StatusBadRequest)
			return
		}

		var hashedPassword string
		err := db.QueryRow("SELECT password FROM users WHERE username = $1", creds.Username).Scan(&hashedPassword)
		if err == sql.ErrNoRows {
			http.Error(w, "User not found", http.StatusNotFound)
			return
		} else if err != nil {
			log.Printf("Database error: %v", err)
			http.Error(w, "Database error", http.StatusInternalServerError)
			return
		}

		if err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(creds.Password)); err != nil {
			http.Error(w, "Invalid password", http.StatusUnauthorized)
			return
		}

		w.WriteHeader(http.StatusOK)
		fmt.Fprintln(w, "Login successful")
	})
}

func handleRegister(db *sql.DB) http.HandlerFunc {
	return enableCORS(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		if r.Method != http.MethodPost {
			w.WriteHeader(http.StatusMethodNotAllowed)
			json.NewEncoder(w).Encode(map[string]string{"message": "Only POST allowed"})
			return
		}

		var creds data.Credentials
		if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{"message": "Invalid JSON format"})
			return
		}

		if creds.Username == "" || creds.Password == "" {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{"message": "Username and password required"})
			return
		}

		var exists bool
		err := db.QueryRow("SELECT EXISTS(SELECT 1 FROM users WHERE username=$1)", creds.Username).Scan(&exists)
		if err != nil {
			log.Printf("Database error: %v", err)
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(map[string]string{"message": "Database error"})
			return
		}

		if exists {
			w.WriteHeader(http.StatusConflict)
			json.NewEncoder(w).Encode(map[string]string{"message": "Username already exists"})
			return
		}

		hash, err := bcrypt.GenerateFromPassword([]byte(creds.Password), bcrypt.DefaultCost)
		if err != nil {
			log.Printf("Bcrypt error: %v", err)
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(map[string]string{"message": "Server error"})
			return
		}

		_, err = db.Exec(
			"INSERT INTO users (username, password) VALUES ($1, $2)",
			creds.Username, string(hash),
		)
		if err != nil {
			log.Printf("Insert error: %v", err)
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(map[string]string{"message": "Database error"})
			return
		}

		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": true,
			"message": "User registered successfully",
		})
	})
}
