package models

type TransactionId struct {
	ID    string `gorm:"primary_key; not null"`
	Count int64  `gorm:"not null"`
}
