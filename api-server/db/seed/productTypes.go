package seed

import (
	"fmt"
	"strconv"
	"time"

	"github.com/sfkshan/pos/api-server/app/models"
	"github.com/sfkshan/pos/api-server/app/services/sqlengine"
	"github.com/sfkshan/pos/api-server/app/utils"
)

func AddProductTypes() {
	engine := sqlengine.Default()
	err := engine.OpenConnection()

	if err != nil {
		fmt.Println("Couldn't connect databse")
		return
	}

	db := engine.Db
	defer db.Close()

	for i := 0; i < 100; i++ {
		id, _ := utils.GenerateRandomString(5)
		description, _ := utils.GenerateRandomString(10)

		p := &models.ProductType{}

		if i < 25 {
			p.ID = "stat" + id + strconv.Itoa(i)
		} else if i > 25 && i < 50 {
			p.ID = "printing" + id + strconv.Itoa(i)
		} else {
			p.ID = id + strconv.Itoa(i)
		}

		p.Description = description
		p.UpdatedBy = "admin"
		p.CreatedBy = "admin"
		p.CreatedAt = time.Now()
		p.UpdatedAt = time.Now()
		db.Create(p)
	}

}
