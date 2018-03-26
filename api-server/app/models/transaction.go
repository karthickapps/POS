package models

type Transaction struct {
	ID        int64   `json:"id" gorm:"primary_key;not null" validate:"required"`
	ProductID string  `json:"productId" gorm:"primary_key;not null" validate:"required"`
	Qty       int64   `json:"qty" gorm:"not null" validate:"required"`
	Amount    float64 `json:"amount" gorm:"not null" validate:"required"`
	Base

	// Navigation properties
	Product Product `json:"-" gorm:"foreign_key:ProductID" validate:"-"`
}
