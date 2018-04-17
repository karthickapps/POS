package router

import (
	"github.com/labstack/echo"
	"github.com/sfkshan/pos/api-server/app/controllers/crud"
	"github.com/sfkshan/pos/api-server/app/models"
)

func SetProductRoutes(e *echo.Group) {
	p := crud.CrudHandler{}
	p.EchoGroup = e
	p.Model = &models.Product{}
	p.GetResultSetPtr = func() interface{} {
		return &[]models.Product{}
	}
	p.Register("/product")
}
