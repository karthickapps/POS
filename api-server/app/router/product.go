package router

import (
	"github.com/labstack/echo"
	"github.com/sfkshan/pos/api-server/app/controllers/crud"
	productsController "github.com/sfkshan/pos/api-server/app/controllers/products"
	"github.com/sfkshan/pos/api-server/app/models"
)

func SetProductRoutes(e *echo.Group) {
	e.GET("/products/search", productsController.Search)

	p := crud.CrudHandler{}
	p.EchoGroup = e
	p.GetModel = func() interface{} {
		return new(models.Product)
	}
	p.GetResultSetPtr = func() interface{} {
		return new([]models.Product)
	}
	p.Register("/products")
}
