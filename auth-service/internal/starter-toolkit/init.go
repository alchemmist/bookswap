package startertoolkit

import (
	"bookswap-auth/pkg/dotenv"
	"database/sql"
	"log"

	"golang.org/x/crypto/bcrypt"
)

func InitRootUser(db *sql.DB) error {
	rootUsername := dotenv.GetRootUserLogin()
	defaultPassword := dotenv.GetPostgresPassword()

	var exists bool
	err := db.QueryRow(
		"SELECT EXISTS(SELECT 1 FROM users WHERE username = $1)",
		rootUsername,
	).Scan(&exists)
	if err != nil {
		return err
	}

	if exists {
		log.Println("Root user already exists, skip creation.")
		return nil
	}

	hashed, err := bcrypt.GenerateFromPassword(
		[]byte(defaultPassword),
		bcrypt.DefaultCost,
	)
	if err != nil {
		return err
	}

	_, err = db.Exec(
		"INSERT INTO users (username, password, is_admin) VALUES ($1, $2, $3)",
		rootUsername, string(hashed), true,
	)
	if err != nil {
		return err
	}

	log.Println("Root user created with default password.")
	return nil
}
