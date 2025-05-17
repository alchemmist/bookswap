package api

import (
	"bookswap-auth/internal/data"
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	"golang.org/x/crypto/bcrypt"
)

func SetupHandlers(db *sql.DB) {
	http.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
			return
		}

		var creds data.Credentials
		if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
			http.Error(w, "Invalid JSON", http.StatusBadRequest)
			return
		}

		var hashedPassword string
		err := db.QueryRow("SELECT password FROM users WHERE username = $1", creds.Username).Scan(&hashedPassword)
		if err != nil {
			http.Error(w, "User not found", http.StatusUnauthorized)
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
