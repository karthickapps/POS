package models

type Product struct {
	ID            string  `json:"id" gorm:"primary_key;not null;varchar(150)" validate:"required"`
	Description   string  `json:"description" gorm:"not null;varchar(1000)" validate:"required"`
	Price         float64 `json:"price" gorm:"not null" validate:"required"`
	ProductTypeID string  `json:"productTypeId" gorm:"not null" validate:"require" sql:"type:varchar REFERENCES product_types(id)" validate:"required"`
	Base

	// Navigation properties
	ProductType ProductType `json:"-" gorm:"foreign_key:ProductTypeID" validate:"-"`
}
