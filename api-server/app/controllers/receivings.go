package controllers

import (
	"errors"
	"net/http"

	"github.com/labstack/echo"
	"github.com/sfkshan/pos/api-server/app/constants"
	"github.com/sfkshan/pos/api-server/app/models"
	"github.com/sfkshan/pos/api-server/app/services/sqlengine"

	utils "github.com/sfkshan/pos/api-server/app/utils/context"
)

func AddNewReceiving(c echo.Context) (err error) {
	model := new(models.Receiving)

	// Destroy the variable. Dont know whether its required or not
	defer func() {
		model = nil
	}()

	if model.PaidToVendor > model.ActualPrice {
		return errors.New("Invalid paid amount. It should be lesser than the actual price.")
	}

	if model.PaidToVendor < model.ActualPrice {
		model.PaymentStatus = constants.PartialPayment
	}

	if err = utils.Validate(c, model); err != nil {
		return
	}

	engine := sqlengine.Default()
	if err = engine.Create(model); err != nil {
		return
	}

	return c.JSON(http.StatusCreated, model)
}
