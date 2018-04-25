package seed

import (
	"fmt"
	"time"

	"github.com/sfkshan/pos/api-server/app/models"
	"github.com/sfkshan/pos/api-server/app/services/sqlengine"
)

func AddExpenseTypes() {
	engine := sqlengine.Default()
	err := engine.OpenConnection()

	if err != nil {
		fmt.Println("Couldn't connect database")
		return
	}
	db := engine.Db
	defer db.Close()

	ebbill := newExpenseType("ebbill", "electricity bill")
	db.Create(ebbill)

	machineService := newExpenseType("machineService", "Xerox machine servicing")
	db.Create(machineService)
}

func newExpenseType(id string, desc string) (e *models.ExpenseType) {
	e = new(models.ExpenseType)
	e.ID = id
	e.Description = desc
	e.UpdatedBy = "admin"
	e.CreatedBy = "admin"
	e.CreatedAt = time.Now()
	e.UpdatedAt = time.Now()
	return
}
