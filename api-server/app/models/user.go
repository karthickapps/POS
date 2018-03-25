package models

import "time"

type User struct {
	ID        string    `json:"id" gorm:"primary_key;not null" validate:"required"`
	Name      string    `json:"name" gorm:"not null" validate:"required"`
	Password  string    `json:"password" gorm:"not null" validate:"required"`
	Role      string    `json:"role" gorm:"not null" validate:"required"`
	UpdatedAt time.Time `json:"updatedAt" gorm:"not null" validate:"required"`
	CreatedAt time.Time `json:"createdAt" gorm:"not null" validate:"required"`
}
