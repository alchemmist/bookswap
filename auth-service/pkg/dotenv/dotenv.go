package dotenv

import (
	"log"
	"os"
)

func GetPostgresUser() string {
	varName := "POSTGRES_USER"
	user := os.Getenv(varName)
	if user == "" {
		log.Fatalf("%s env variable doesn't set", varName)
		return ""
	}
	return user
}

func GetPostgresPassword() string {
	varName := "POSTGRES_PASSWORD"
	pass := os.Getenv(varName)
	if pass == "" {
		log.Fatalf("%s env variable doesn't set", varName)
		return ""
	}
	return pass
}

func GetPostgresDatabase() string {
	varName := "POSTGRES_DB"
	user := os.Getenv(varName)
	if user == "" {
		log.Fatalf("%s env variable doesn't set", varName)
		return ""
	}
	return user
}
