package models

type Receiving struct {
	ID        int64   `json:"-" gorm:"primary_key;AUTO_INCREMENT;not null" validate:"-"`
	ProductID string  `json:"productId" gorm:"not null" validate:"required" sql:"type:varchar REFERENCES products(id) ON DELETE RESTRICT"`
	VendorID  string  `json:"vendorId" gorm:"not null" validate:"required" sql:"type:varchar REFERENCES vendors(id) ON DELETE RESTRICT"`
	Qty       int64   `json:"qty" gorm:"not null" validate:"required"`
	Price     float64 `json:"price" gorm:"not null" validate:"required"`
	Paid      float64 `json:"paid" gorm:"not null" validate:"required"`
	Status    string  `json:"-" gorm:"not null" validate:"-"`
	Base

	// Navigation properties
	Product Product `json:"-" gorm:"foreign_key:ProductID" validate:"-"`
}
