package router

import (
	"github.com/labstack/echo"
)

// Init : Configure all the routes
func Init(e *echo.Group) {
	SetAuthenticationRoutes(e)
}
