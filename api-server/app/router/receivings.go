package router

import (
	"github.com/labstack/echo"
	"github.com/sfkshan/pos/api-server/app/controllers"
)

func SetReceivingsRoutes(e *echo.Group) {
	e.POST("/receivings", controllers.AddNewReceiving)
}
