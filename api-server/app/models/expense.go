package models

import "time"

type Expense struct {
	ID            int         `json:"id" gorm:"primary_key;not null;AUTO_INCREMENT" validate:"required"`
	Description   string      `json:"description" gorm:"primary_key;not null;varchar(1000)" validate:"required"`
	Amount        float64     `json:"amount" gorm:"not null" validate:"required"`
	SpentAt       time.Time   `json:"spentAt" gorm:"not null" validate:"required"`
	ExpenseType   ExpenseType `json:"-" gorm:"foreign_key:ExpenseTypeID" validate:"-"`
	ExpenseTypeID string      `json:"expenseTypeId" gorm:"not null" validate:"required" sql:"type:varchar REFERENCES expense_types(id)"`
	Base
}
