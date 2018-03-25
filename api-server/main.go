package main

import (
	"os"

	"github.com/sfkshan/pos/api-server/app/server"
	"github.com/sfkshan/pos/api-server/db/migrations"
	"github.com/sfkshan/pos/api-server/db/seed"
)

// entry point.
func main() {
	switch operation := os.Getenv("OPERATION"); operation {
	case "web":
		server.Run()
		return
	case "migration":
		migrations.Migrate()
		return
	case "seed":
		seed.SeedDb()
		return
	default:
		server.Run()
	}
}
