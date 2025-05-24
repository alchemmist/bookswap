package api

import (
	"bookswap-auth/internal/data"
	"database/sql"
	"encoding/json"
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
		w.Header().Set("Content-Type", "application/json")

		if r.Method != http.MethodPost {
			log.Printf("Wrong method: %s", r.Method)
			http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
			return
		}

		var user data.User
		if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
			log.Printf("JSON decode error: %v", err)
			http.Error(w, "Invalid JSON", http.StatusBadRequest)
			return
		}

		var stored data.User

		err := db.QueryRow(
			"SELECT id, username, avatar, is_admin FROM users WHERE username = $1", user.Username,
		).Scan(&stored.Id, &stored.Username, &stored.Avatar, &stored.IsAdmin)
		if err == sql.ErrNoRows {
			http.Error(w, "User not found", http.StatusNotFound)
			return
		} else if err != nil {
			log.Printf("Database error: %v", err)
			http.Error(w, "Database error", http.StatusInternalServerError)
			return
		}

		var hashedPassword string
		err = db.QueryRow("SELECT password FROM users WHERE username = $1", user.Username).Scan(&hashedPassword)
		if err != nil {
			log.Printf("Error retrieving password: %v", err)
			http.Error(w, "Server error", http.StatusInternalServerError)
			return
		}

		if err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(user.Password)); err != nil {
			http.Error(w, "Invalid password", http.StatusUnauthorized)
			return
		}

		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": true,
			"user":    stored,
		})
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

		var user data.User
		if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{"message": "Invalid JSON format"})
			return
		}

		if user.Username == "" || user.Password == "" {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{"message": "Username and password required"})
			return
		}

		// Check username availability
		var exists bool
		err := db.QueryRow("SELECT EXISTS(SELECT 1 FROM users WHERE username=$1)", user.Username).Scan(&exists)
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

		// Hash password
		hash, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
		if err != nil {
			log.Printf("Bcrypt error: %v", err)
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(map[string]string{"message": "Server error"})
			return
		}

		var newID string
		err = db.QueryRow(
			"INSERT INTO users (username, password, is_admin) VALUES ($1, $2, $3) RETURNING id",
			user.Username, string(hash), user.IsAdmin,
		).Scan(&newID)
		if err != nil {
			log.Printf("Insert error: %v", err)
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(map[string]string{"message": "Database error"})
			return
		}

		var stored data.User
		err = db.QueryRow(
			"SELECT id, username, avatar, is_admin FROM users WHERE username = $1", user.Username,
		).Scan(&stored.Id, &stored.Username, &stored.Avatar, &stored.IsAdmin)
		if err == sql.ErrNoRows {
			http.Error(w, "User not found", http.StatusNotFound)
			return
		} else if err != nil {
			log.Printf("Database error: %v", err)
			http.Error(w, "Database error", http.StatusInternalServerError)
			return
		}

		created := data.User{
			Id:       newID,
			Username: user.Username,
			Avatar:   user.Avatar,
			IsAdmin:  user.IsAdmin,
		}

		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": true,
			"user":    created,
		})
	})
}
