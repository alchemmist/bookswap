package main

import (
	"bookswap-auth/internal/api"
	"bookswap-auth/internal/data"
	startertoolkit "bookswap-auth/internal/starter-toolkit"
	"fmt"
	"log"
	"net/http"

	_ "github.com/lib/pq"
)

func main() {
	db := data.CreatePGConnection()
	defer db.Close()

	mux := http.NewServeMux()
	api.SetupHandlers(mux, db)

	fmt.Println("Server running at http://localhost:8081")
	startertoolkit.InitRootUser(db)
	log.Fatal(http.ListenAndServe(":8081", mux))
}
