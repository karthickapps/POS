package models

type Product struct {
	ID            string  `json:"id" gorm:"primary_key;not null;varchar(150)" validate:"required"`
	Description   string  `json:"description" gorm:"not null;varchar(1000)" validate:"required"`
	CostPrice     float64 `json:"costPrice" gorm:"not null" validate:"required"`
	SellingPrice  float64 `json:"sellingPrice" gorm:"not null" validate:"required"`
	ProductTypeID string  `json:"productType" gorm:"not null" sql:"type:varchar REFERENCES product_types(id)" validate:"required"`
	Base

	// Navigation properties
	ProductType ProductType `json:"-" gorm:"foreign_key:ProductTypeID" validate:"-"`
}
