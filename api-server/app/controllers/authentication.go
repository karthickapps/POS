package controllers

import (
	"net/http"

	"github.com/labstack/echo"
	"github.com/sfkshan/pos/api-server/app/controllers/resources"
	"github.com/sfkshan/pos/api-server/app/controllers/resources/responsecodes"
	"github.com/sfkshan/pos/api-server/app/services"
)

func Login(c echo.Context) (err error) {
	u := &resources.User{}

	if err = c.Bind(u); err != nil {
		return
	}
	if err = c.Validate(u); err != nil {
		return
	}

	token, err := services.Login(u.ID, u.Password)
	if err != nil {
		response := &resources.Response{Code: responsecodes.AuthFailed, Message: err.Error()}
		return c.JSON(http.StatusUnauthorized, response)
	}

	return c.JSON(http.StatusOK, token)
}

func Logout(c echo.Context) error {
	// TODO Implement logout, probably clear the session or delete the refresh token
	// from db.
	response := &resources.Response{Code: responsecodes.Success, Message: "Successfully logged out"}
	return c.JSON(http.StatusOK, response)
}
