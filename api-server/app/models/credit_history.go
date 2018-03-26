package models

type CreditHistory struct {
	ID         int64   `json:"-" gorm:"primary_key;not null;AUTO_INCREMENT" validate:"-"`
	CustID     string  `json:"custId" gorm:"not null" validate:"required" sql:"type:varchar REFERENCES customers(id)"`
	AmountPaid float64 `json:"amountPaid" gorm:"not null" validate:"required"`
	Base

	// Navigation properties
	Customer Customer `json:"-" gorm:"foreign_key:CustID" validate:"-"`
}
