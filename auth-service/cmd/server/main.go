package main

import (
	"bookswap-auth/internal/api"
	"bookswap-auth/internal/data"
	"fmt"
	"log"
	"net/http"

	_ "github.com/lib/pq"
)

func main() {
	db := data.CreatePGConnection()
	defer db.Close()

	api.SetupHandlers(db)

	fmt.Println("Server running at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
