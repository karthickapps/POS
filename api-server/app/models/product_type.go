package models

type ProductType struct {
	ID string `json:"id" gorm:"primary_key;not null;varchar(150)" validate:"required"`
	Base
}
