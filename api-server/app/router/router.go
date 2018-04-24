package router

import (
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"github.com/sfkshan/pos/api-server/app/server/custom"
	"github.com/sfkshan/pos/api-server/app/services/domain"
	"github.com/sfkshan/pos/api-server/config"
)

// Init : Configure all the routes
func Init(e *echo.Group) {
	SetAuthenticationRoutes(e)

	jwtMiddlewares(e)

	SetProductTypeRoutes(e)

	SetReceivingsRoutes(e)

	SetProductRoutes(e)

	SetExpenseRoutes(e)

	SetExpenseTypeRoutes(e)

	SetCustomerRoutes(e)

	SetVendorRoutes(e)
}

func jwtMiddlewares(e *echo.Group) {
	// Configure middleware with the custom claims type
	jwtConfig := middleware.JWTConfig{
		Claims:     &domain.TokenClaims{},
		SigningKey: []byte(config.SignKey),
	}
	e.Use(middleware.JWTWithConfig(jwtConfig))
	e.Use(custom.SetCustomContext())
}
