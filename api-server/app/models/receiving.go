package models

type Receiving struct {
	ID        int64   `json:"-" gorm:"primary_key;AUTO_INCREMENT;not null" validate:"-"`
	ProductID string  `json:"productId" gorm:"not null" validate:"required" sql:"type:varchar REFERENCES product(id)"`
	Qty       int64   `json:"qty" gorm:"not null" validate:"required"`
	Price     float64 `json:"price" gorm:"not null" validate:"required"`
	Base

	// Navigation properties
	Product Product `json:"-" gorm:"foreign_key:ProductID" validate:"-"`
}
