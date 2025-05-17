package data

import (
	"bookswap-auth/pkg/dotenv"
	"database/sql"
	"fmt"
	"log"
)

func CreatePGConnection() *sql.DB {
	db, err := sql.Open("postgres", buildPGUrl())
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
		return db
	}
	return db
}

func buildPGUrl() string {
	user := dotenv.GetPostgresUser()
	pass := dotenv.GetPostgresPassword()
	dbName := dotenv.GetPostgresDatabase()

	connStr := fmt.Sprintf("user=%s password=%s dbname=%s sslmode=disable", user, pass, dbName)
	return connStr
}
