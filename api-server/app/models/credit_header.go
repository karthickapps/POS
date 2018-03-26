package models

type CreditHeader struct {
	ID            string  `json:"custId"  gorm:"primary_key;not null" validate:"required" sql:"type:varchar REFERENCES customers(id)"`
	BalanceAmount float64 `json:"balance" gorm:"not null" validate:"-"`
	Base
}
