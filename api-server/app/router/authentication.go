package router

import (
	"github.com/labstack/echo"
	"github.com/sfkshan/pos/api-server/app/controllers"
)

func SetAuthenticationRoutes(e *echo.Group) {
	e.POST("/login", controllers.Login)
	e.GET("/logout", controllers.Logout)
}
