package models

type Customer struct {
	ID          string `json:"id" gorm:"primary_key;not null" validate:"required"`
	Name        string `json:"name" gorm:"not null" validate:"required"`
	Description string `json:"description" gorm:"varchar(4000)" `
	Address     string `json:"address" gorm:"not null;varchar(4000)" validate:"required"`
	Mobile      string `json:"mobile" gorm:"not null;varchar(10)" validate:"required"`
	Email       string `json:"email" gorm:"not null" validate:"required"`
	Base
}
