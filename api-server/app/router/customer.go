package router

import (
	"github.com/labstack/echo"
	"github.com/sfkshan/pos/api-server/app/controllers/crud"
	"github.com/sfkshan/pos/api-server/app/models"
)

func SetCustomerRoutes(e *echo.Group) {
	p := crud.CrudHandler{}
	p.EchoGroup = e
	p.GetModel = func() interface{} {
		return new(models.Customer)
	}
	p.GetResultSetPtr = func() interface{} {
		return new([]models.Customer)
	}
	p.Register("/customers")
}
