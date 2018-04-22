package migrations

import (
	"fmt"

	"github.com/sfkshan/pos/api-server/app/services/sqlengine"
)

type User struct {
	ID   int
	Name string
}

type Profile struct {
	ID   int
	Name string
	// User      User `gorm:"foreignkey:UserRefer"` // use UserRefer as foreign key
	UserRefer int `sql:"type:int REFERENCES users(id)"`
}

func Test() {
	engine := sqlengine.Default()
	err := engine.OpenConnection()

	if err != nil {
		fmt.Println(err)
		return
	}

	db := engine.Db
	defer db.Close()
	db.Exec("PRAGMA foreign_keys = ON")

	// db.AutoMigrate(&User{})
	// db.AutoMigrate(&Profile{})

	user := User{Name: "Shan"}
	db.Create(&user)

	Profile := Profile{Name: "shan profile", UserRefer: 10}
	db.Create(&Profile)
}
