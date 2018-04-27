package router

import (
	"github.com/labstack/echo"
	"github.com/sfkshan/pos/api-server/app/controllers/receivings"
)

func SetReceivingsRoutes(e *echo.Group) {
	e.GET("/receivings", receivings.GetAllReceivings)
	e.POST("/receivings", receivings.AddNewReceiving)
}
