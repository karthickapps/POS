package seed

import (
	"fmt"
	"time"

	"github.com/sfkshan/pos/api-server/app/models"
	"github.com/sfkshan/pos/api-server/app/services/sqlengine"
)

func AddCustomers() {
	engine := sqlengine.Default()
	err := engine.OpenConnection()

	if err != nil {
		fmt.Println("Couldn't connect database")
		return
	}

	db := engine.Db
	defer db.Close()

	shan := newCustomer("shan", "shan sfk", "1234567890")
	db.Create(shan)

	nrAgency := newCustomer("nr_agency", "NR motor services", "9934567890")
	db.Create(nrAgency)
}

func newCustomer(id string, name string, mobile string) (v *models.Customer) {
	v = new(models.Customer)
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
