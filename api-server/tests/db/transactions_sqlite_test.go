package db

import (
	"testing"

	"github.com/jinzhu/gorm"
	"github.com/sfkshan/pos/api-server/app/models"
	"github.com/sfkshan/pos/api-server/app/services/sqlengine"
	"github.com/sfkshan/pos/api-server/tests/mock"
	"github.com/stretchr/testify/assert"
)

var productType models.ProductType
var expenseType models.ExpenseType
var assertIns *assert.Assertions

func TestTransactionSqlite(t *testing.T) {
	assertIns = assert.New(t)

	insertDataAndRollBack()
	verifyTablesForDataIsRolledBackCorrectly()
}

func verifyTablesForDataIsRolledBackCorrectly() {
	engine := initializeDb()

	result := models.ExpenseType{}

	err, actualCount := engine.FindById(expenseType.ID, &result)

	if err != nil {
		assertIns.Error(err)
	}

	var expectedCount int64 = 0
	assertIns.Equal(expectedCount, actualCount)
}

func insertDataAndRollBack() {
	db := initializeDb().Db

	// begin a transaction
	tx := db.Begin()

	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
			db.Close()
		}
	}()

	if tx.Error != nil {
		assertIns.Error(tx.Error)
	}

	runInTransaction(tx)

	// Rollback transaction and check if it works properly.
	tx.Rollback()
}

func runInTransaction(tx *gorm.DB) {
	productType = *mock.GetProductType()
	expenseType = *mock.GetExpenseType()

	tx.Create(productType)
	tx.Create(expenseType)
}

func initializeDb() (db *sqlengine.SqlEngine) {
	engine := sqlengine.Create("../../pos.db")

	if err := engine.OpenConnection(); err != nil {
		assertIns.Error(err)
		return
	}

	return engine
}
