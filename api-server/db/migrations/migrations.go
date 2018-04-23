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
	db.AutoMigrate(&models.Customer{})
	db.AutoMigrate(&models.Vendor{})
	db.AutoMigrate(&models.ProductType{})

	db.AutoMigrate(&models.Product{})

	db.AutoMigrate(&models.ExpenseType{})
	db.AutoMigrate(&models.Expense{})
	db.AutoMigrate(&models.Stock{})
	db.AutoMigrate(&models.Transaction{})
	db.AutoMigrate(&models.TransactionHeader{})
	db.AutoMigrate(&models.CreditHistory{})
	db.AutoMigrate(&models.CreditHeader{})
	db.AutoMigrate(&models.Receiving{})
}
