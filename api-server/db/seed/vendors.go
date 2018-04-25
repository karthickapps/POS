package seed

import (
	"fmt"
	"time"

	"github.com/sfkshan/pos/api-server/app/models"
	"github.com/sfkshan/pos/api-server/app/services/sqlengine"
)

func AddVendors() {
	engine := sqlengine.Default()
	err := engine.OpenConnection()

	if err != nil {
		fmt.Println("Couldn't connect database")
		return
	}

	db := engine.Db
	defer db.Close()

	mrlabs := newVendor("mrlabs", "MR Color labs", "1234567890")
	db.Create(mrlabs)

	shree := newVendor("shree", "shree printers", "1234567890")
	db.Create(shree)
}

func newVendor(id string, name string, mobile string) (v *models.Vendor) {
	v = new(models.Vendor)
	v.ID = id
	v.Mobile = mobile
	v.Address = "Address"
	v.Name = name
	v.Email = "mail@mail.com"
	v.Description = "description"
	v.UpdatedBy = "admin"
	v.CreatedBy = "admin"
	v.CreatedAt = time.Now()
	v.UpdatedAt = time.Now()
	return
}
