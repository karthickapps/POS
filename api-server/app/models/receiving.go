package models

import "time"

type Receiving struct {
	ID            int64     `json:"id" gorm:"primary_key;AUTO_INCREMENT;not null" validate:"-"`
	ProductID     string    `json:"productId" gorm:"not null" validate:"required" sql:"type:varchar REFERENCES products(id) ON DELETE RESTRICT"`
	VendorID      string    `json:"vendorId" gorm:"not null" validate:"required" sql:"type:varchar REFERENCES vendors(id) ON DELETE RESTRICT"`
	Qty           int64     `json:"qty" gorm:"not null" validate:"required"`
	ActualPrice   float64   `json:"price" gorm:"not null" validate:"required"`
	PaidToVendor  float64   `json:"paid" gorm:"not null" validate:"required"`
	PaymentStatus string    `json:"-" gorm:"not null" validate:"required"`
	PaymentDate   time.Time `json:"date" gorm:"not null" validate:"required"`
	Base

	// Navigation properties
	Product Product `json:"-" gorm:"foreign_key:ProductID" validate:"-"`
}
