package router

import (
	"github.com/labstack/echo"
	authController "github.com/sfkshan/pos/api-server/app/controllers/authentication"
)

func SetAuthenticationRoutes(e *echo.Group) {
	e.POST("/login", authController.Login)
	e.GET("/logout", authController.Logout)
}
