package models

import "time"

type Base struct {
	UpdatedAt time.Time `json:"-" validate:"-"`
	CreatedAt time.Time `json:"-" validate:"-"`
	CreatedBy string    `json:"-"  sql:"type:varchar REFERENCES users(id)" validate:"-"`
	UpdatedBy string    `json:"-"  sql:"type:varchar REFERENCES users(id)" validate:"-"`
}
