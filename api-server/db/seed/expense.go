package seed

import (
	"fmt"
	"time"

	"github.com/sfkshan/pos/api-server/app/models"
	"github.com/sfkshan/pos/api-server/app/services/sqlengine"
)

func AddExpense() {
	engine := sqlengine.Default()
	err := engine.OpenConnection()

	if err != nil {
		fmt.Println("Couldn't connect database")
		return
	}
	db := engine.Db
	defer db.Close()

	bill := newExpense("ebbill", "bill payment", 1200)
	db.Create(bill)

	service := newExpense("machineService", "machine servicing", 4700)
	db.Create(service)
}

func newExpense(expenseType string, desc string, amount float64) (e *models.Expense) {
	e = new(models.Expense)
	e.ExpenseTypeID = expenseType
	e.Description = desc
	e.Amount = amount
	e.SpentAt = time.Now()
	e.UpdatedBy = "admin"
	e.CreatedBy = "admin"
	e.CreatedAt = time.Now()
	e.UpdatedAt = time.Now()
	return
}
