package services

import (
	"errors"
	"strconv"
	"time"

	"github.com/jinzhu/gorm"
	"github.com/sfkshan/pos/api-server/app/models"
	"github.com/sfkshan/pos/api-server/app/services/sqlengine"
)

func GetTransId() (err error, transId string) {
	engine := sqlengine.Default()

	if err = engine.OpenConnection(); err != nil {
		return
	}

	defer engine.CloseConnection()

	db := engine.Db

	idPrefix := time.Now().Format("020106")
	transactionId := models.TransactionId{}

	// Update the count +1
	res := db.Model(&transactionId).
		Where("id = ?", idPrefix).
		Update("count", gorm.Expr("count + ?", 1))

	if res.Error != nil {
		return res.Error, ""
	} else if res.RowsAffected == 0 {
		// If no records insert
		return createNew(engine, idPrefix)
	} else {
		// Gets the updated Id
		return getId(engine, idPrefix)
	}
}

func getId(engine *sqlengine.SqlEngine, id string) (err error, transId string) {
	transactionId := models.TransactionId{}

	var count int64
	if err, count = engine.FindById(id, &transactionId); err != nil {
		return
	}

	if count == 0 {
		err = errors.New("Couldn't get transId")
		return
	}

	transId = transactionId.ID + strconv.FormatInt(transactionId.Count, 10)

	return
}

func createNew(engine *sqlengine.SqlEngine, id string) (err error, transId string) {
	transactionId := &models.TransactionId{
		ID:    id,
		Count: 1,
	}

	if err = engine.Create(transactionId); err != nil {
		transId = ""
		return
	}

	transId = id + "1"

	return
}
