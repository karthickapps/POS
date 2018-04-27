package receivings

import (
	"errors"
	"net/http"

	"github.com/jinzhu/gorm"
	"github.com/labstack/echo"
	"github.com/sfkshan/pos/api-server/app/constants"
	"github.com/sfkshan/pos/api-server/app/models"
	"github.com/sfkshan/pos/api-server/app/services/sqlengine"

	utils "github.com/sfkshan/pos/api-server/app/utils/context"
)

var engine = sqlengine.Default()

func AddNewReceiving(c echo.Context) (err error) {
	var receiving *models.Receiving

	if err, receiving = bindAndValidateForCreateRequest(c); err != nil {
		return
	}

	if err = engine.OpenConnection(); err != nil {
		return
	}

	// <== Transction Start **
	if err = engine.OpenTransaction(); err != nil {
		return
	}

	defer clean(engine.Db, receiving)

	if err = engine.Db.Create(receiving).Error; err != nil {
		return
	}

	if err = updateProduct(engine.Db, receiving.ProductID, receiving.Qty); err != nil {
		return
	}

	engine.Db.Commit()
	// Transction End ** ==>

	return c.JSON(http.StatusCreated, receiving)
}

func bindAndValidateForCreateRequest(c echo.Context) (err error, model *models.Receiving) {
	model = new(models.Receiving)

	if err = c.Bind(model); err != nil {
		return
	}

	if model.PaidToVendor > model.ActualPrice {
		return errors.New("Invalid paid amount. It should be lesser than the actual price."), model
	}

	if model.PaidToVendor < model.ActualPrice {
		model.PaymentStatus = constants.PartialPayment
	} else {
		model.PaymentStatus = constants.FullPayment
	}

	if err = utils.SetTimestampForCreateNewAndValidate(c, model, false); err != nil {
		return
	}
	return
}

func updateProduct(tx *gorm.DB, productId string, qty int64) (err error) {
	product := new(models.Product)

	res := tx.Model(product).
		Where("id = ?", productId).
		UpdateColumn("qty", gorm.Expr("qty + ?", qty))

	if res.RowsAffected == 1 {
		return
	}

	tx.Rollback()
	return errors.New("Product not found")
}

func clean(tx *gorm.DB, model interface{}) {
	if r := recover(); r != nil {
		tx.Rollback()
	}
	// Destroy the variable. Dont know whether its required or not
	model = nil
}
