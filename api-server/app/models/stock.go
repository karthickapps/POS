package models

type Stock struct {
	ID  string `json:"productId" gorm:"primary_key;not null" validate:"required" sql:"type:varchar REFERENCES products(id)"`
	Qty int64  `json:"qty" gorm:"not null" validate:"required"`
	Base

	// Navigation properties
	Product Product `json:"-" gorm:"foreign_key:ProductID" validate:"-"`
}
