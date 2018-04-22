package router

import (
	"github.com/labstack/echo"
	"github.com/sfkshan/pos/api-server/app/controllers/crud"
	"github.com/sfkshan/pos/api-server/app/models"
)

func SetExpenseTypeRoutes(e *echo.Group) {
	p := crud.CrudHandler{}
	p.EchoGroup = e
	p.GetModel = func() interface{} {
		return new(models.ExpenseType)
	}
	p.GetResultSetPtr = func() interface{} {
		return new([]models.ExpenseType)
	}
	p.Register("/expensetypes")
}
