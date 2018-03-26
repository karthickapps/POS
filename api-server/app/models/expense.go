package models

import "time"

type Expense struct {
	ID            int       `json:"id" gorm:"primary_key;not null;AUTO_INCREMENT" validate:"-"`
	Description   string    `json:"description" gorm:"not null;varchar(1000)" validate:"required"`
	Amount        float64   `json:"amount" gorm:"not null" validate:"required"`
	SpentAt       time.Time `json:"spentAt" gorm:"not null" validate:"required"`
	ExpenseTypeID string    `json:"expenseTypeId" gorm:"not null" validate:"required" sql:"type:varchar REFERENCES expense_types(id)"`
	Base

	// Navigation properties
	ExpenseType ExpenseType `json:"-" gorm:"foreign_key:ExpenseTypeID" validate:"-"`
}
