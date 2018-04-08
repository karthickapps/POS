package seed

import (
	"fmt"

	_ "github.com/jinzhu/gorm/dialects/sqlite"
	"github.com/sfkshan/pos/api-server/app/models"
	"github.com/sfkshan/pos/api-server/app/services/sqlengine"
)

func SeedDb() {
	// AddUsers()
	// AddProductTypes()

	// engine := sqlengine.Default()
	// // db := engine.Db

	// var count int64
	// var model = models.ProductType{}
	// engine.Db.Model(&model).Where("ID like ?", "%prod%").Count(count)

	// engine.FetchPage(10, 1, &model)

	// fmt.Println(count)

	engine := sqlengine.Default()
	err := engine.OpenConnection()

	if err != nil {
		fmt.Println("Couldn't connect databse")
		return
	}

	db := engine.Db
	defer db.Close()

	var count int64

	// db.Model(&model).Where("id like ?", "%statHnI%").Count(&count)

	// engine.Db.Model(&model).Where("id like ?", "%statHnI%").Count(&count)

	query := sqlengine.Query{}
	query.DataSet = []models.ProductType{}
	// query.Query = "id like ?"
	// query.Args = []interface{}{"%statHnI%"}
	count, _ = engine.Count(query)

	fmt.Println(count)
}
