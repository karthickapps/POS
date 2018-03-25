package models

import "time"

type Base struct {
	UpdatedAt time.Time `json:"updatedAt" validate:"required"`
	CreatedAt time.Time `json:"createdAt" validate:"required"`
	CreatedBy string    `json:"createdBy" gorm:"not null" sql:"type:varchar REFERENCES users(id)" validate:"required"`
	UpdatedBy string    `json:"updatedBy" gorm:"not null" sql:"type:varchar REFERENCES users(id)" validate:"required"`
}
