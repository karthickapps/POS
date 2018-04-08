package controllers

import (
	"net/http"

	"github.com/labstack/echo"
	"github.com/sfkshan/pos/api-server/app/controllers/resources"
	"github.com/sfkshan/pos/api-server/app/services"
)

func SignUp(c echo.Context) (err error) {
	u := new(resources.SignUp)
	if err = c.Bind(u); err != nil {
		return
	}
	if err = c.Validate(u); err != nil {
		return
	}

	if err = services.SignUp(u); err != nil {
		return
	}

	return c.JSON(http.StatusOK, resources.Response{Code: "0", Message: "SUCCESS"})
}
