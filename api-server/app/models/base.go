package models

import "time"

type Base struct {
	UpdatedAt time.Time `json:"-" validate:"required"`
	CreatedAt time.Time `json:"-" validate:"required"`
	CreatedBy string    `json:"-" gorm:"not null" sql:"type:varchar REFERENCES users(id)" validate:"required"`
	UpdatedBy string    `json:"-" gorm:"not null" sql:"type:varchar REFERENCES users(id)" validate:"required"`
}
