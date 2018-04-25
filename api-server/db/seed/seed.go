package seed

import (
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

func SeedDb() {
	AddUsers()
	AddProductTypes()
	AddProducts()
	AddVendors()
	AddCustomers()
	AddExpenseTypes()
	AddExpense()
}
