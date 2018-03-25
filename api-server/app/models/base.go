package models

import "time"

type Base struct {
	UpdatedAt time.Time `json:"updatedAt"`
	CreatedAt time.Time `json:"createdAt"`
	CreatedBy string    `json:"createdBy" gorm:"not null" sql:"type:varchar REFERENCES users(id)"`
	UpdatedBy string    `json:"updatedBy" gorm:"not null" sql:"type:varchar REFERENCES users(id)"`
}
