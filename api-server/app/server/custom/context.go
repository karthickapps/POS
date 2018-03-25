package custom

import (
	jwt "github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
	"github.com/sfkshan/pos/api-server/app/services/domain"
)

type Context struct {
	echo.Context
	UserID       string
	IsSuperAdmin bool
}

func AddCustomContext() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			qc := &Context{
				Context:      c,
				UserID:       "",
				IsSuperAdmin: false,
			}
			return next(qc)
		}
	}
}

func SetCustomContext() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			user := c.Get("user").(*jwt.Token)
			claims := user.Claims.(*domain.TokenClaims)

			qc := &Context{
				Context:      c,
				UserID:       claims.Subject,
				IsSuperAdmin: false,
			}
			return next(qc)
		}
	}
}
