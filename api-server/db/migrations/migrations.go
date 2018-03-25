package migrations

import (
	"fmt"

	"github.com/sfkshan/pos/api-server/app/models"
	"github.com/sfkshan/pos/api-server/app/services/sqlengine"
)

func Migrate() {
	engine := sqlengine.Default()
	err := engine.OpenConnection()

	if err != nil {
		fmt.Println(err)
		return
	}

	db := engine.Db
	defer db.Close()

	db.AutoMigrate(&models.User{})
}
