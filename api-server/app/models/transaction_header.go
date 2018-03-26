package models

type TransactionHeader struct {
	ID         int64   `json:"id" gorm:"primary_key;not null" validate:"required" sql:"type:varchar REFERENCES transactions(id)"`
	BillAmount float64 `json:"billAmount" gorm:"not null" validate:"required"`
	Discount   float64 `json:"discount" gorm:"not null" validate:"required"`
	NetAmount  float64 `json:"netAmount" gorm:"not null" validate:"required"`
	AmountPaid float64 `json:"amountPaid" gorm:"not null" validate:"required"`
	SalesType  string  `json:"salesType" gorm:"not null" validate:"required"`
	CustID     string  `json:"custId" validate:"-" sql:"type:varchar REFERENCES customers(id)"`
	Comments   string  `json:"comments" gorm:"varchar(2000)" validate:"-"`

	Base

	// Navigation properties
	Customer    Customer    `json:"-" gorm:"foreign_key:CustID" validate:"-"`
	Transaction Transaction `json:"-" gorm:"foreign_key:ID" validate:"-"`
}
