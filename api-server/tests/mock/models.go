package mock

import (
	"fmt"
	"time"

	"github.com/sfkshan/pos/api-server/app/models"
)

func GetExpenseType() (e *models.ExpenseType) {
	e = new(models.ExpenseType)
	e.ID = fmt.Sprintf("mock_expense_%d", time.Now().Second())
	e.Description = "mock expense type"
	e.UpdatedBy = "admin"
	e.CreatedBy = "admin"
	e.CreatedAt = time.Now()
	e.UpdatedAt = time.Now()
	return
}

func GetProductType() (p *models.ProductType) {
	p = new(models.ProductType)
	p.ID = fmt.Sprintf("mock_product_type_%d", time.Now().Second())
	p.Description = "mock product type"
	p.UpdatedBy = "admin"
	p.CreatedBy = "admin"
	p.CreatedAt = time.Now()
	p.UpdatedAt = time.Now()
	return
}
