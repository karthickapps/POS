package seed

import (
	"fmt"
	"time"

	"github.com/sfkshan/pos/api-server/app/models"
	"github.com/sfkshan/pos/api-server/app/services/sqlengine"
)

func AddUsers() {
	engine := sqlengine.Default()
	err := engine.OpenConnection()

	if err != nil {
		fmt.Println("Couldn't connect databse")
		return
	}

	db := engine.Db
	defer db.Close()

	// Default admin user
	u := &models.User{}
	u.ID = "admin@mail.com"
	u.Name = "admin user"
	u.Password = "admin"
	u.Role = models.RoleAdmin
	u.CreatedAt = time.Now()
	u.UpdatedAt = time.Now()

	db.Create(u)
}
