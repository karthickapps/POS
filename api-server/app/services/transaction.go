package services

import (
	"strconv"
	"time"

	"github.com/jinzhu/gorm"
	"github.com/sfkshan/pos/api-server/app/models"
	"github.com/sfkshan/pos/api-server/app/services/sqlengine"
)

func GetTransId() (err error, id string) {
	engine := sqlengine.Default()

	if err = engine.OpenConnection(); err != nil {
		return
	}

	db := engine.Db

	id = time.Now().Format("020106")
	transactionId := &models.TransactionId{}

	res := db.Model(transactionId).
		Where("id = ?", id).
		Update("count", gorm.Expr("count + ?", 1))

	if res.RowsAffected == 0 {
		if err = createNew(engine, id); err != nil {
			id = ""
			return
		}
		id = id + "1"
	}

	id = id + strconv.FormatInt(transactionId.Count, 10)

	return
}

func createNew(engine *sqlengine.SqlEngine, id string) error {
	transactionId := &models.TransactionId{
		ID:    id,
		Count: 1,
	}
	return engine.Create(transactionId)
}
