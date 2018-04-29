package seed

import (
	"fmt"
	"time"

	"github.com/sfkshan/pos/api-server/app/models"
	"github.com/sfkshan/pos/api-server/app/services/sqlengine"
)

func AddProducts() {
	engine := sqlengine.Default()
	err := engine.OpenConnection()

	if err != nil {
		fmt.Println("Couldn't connect database")
		return
	}

	db := engine.Db
	defer db.Close()

	pen := newProduct("pen", 100, 10, 12)
	db.Create(pen)

	pencil := newProduct("pencil", 100, 10, 12)
	db.Create(pencil)

	paper := newProduct("paper", 100, 10, 12)
	db.Create(paper)
}

func newProduct(id string, qty int64, cp float64, sp float64) (p *models.Product) {
	p = new(models.Product)
	p.ID = id
	p.Description = "description"
	p.ProductTypeID = "stationery"
	p.Qty = qty
	p.CostPrice = cp
	p.SellingPrice = sp
	p.UpdatedBy = "admin"
	p.CreatedBy = "admin"
	p.CreatedAt = time.Now()
	p.UpdatedAt = time.Now()
	return
}