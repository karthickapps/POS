package router

import (
	"github.com/labstack/echo"
	"github.com/sfkshan/pos/api-server/app/controllers/producttype"
)

func SetProductTypeRoutes(e *echo.Group) {
	e.POST("/productType", producttype.CreateNew)
	e.GET("/productType", producttype.FetchAll)
}
