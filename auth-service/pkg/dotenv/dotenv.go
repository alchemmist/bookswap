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

func GetPostgresPort() string {
	varName := "POSTGRES_PORT"
	port := os.Getenv(varName)
	if port == "" {
		log.Fatalf("%s env variable doesn't set", varName)
		return ""
	}
	return port
}

func GetRootUserLogin() string {
	varName := "ROOT_USER_LOGIN"
	port := os.Getenv(varName)
	if port == "" {
		log.Fatalf("%s env variable doesn't set", varName)
		return ""
	}
	return port
}

func GetRootUserPassword() string {
	varName := "ROOT_USER_PASSWORD"
	port := os.Getenv(varName)
	if port == "" {
		log.Fatalf("%s env variable doesn't set", varName)
		return ""
	}
	return port
}
