package services

import (
	"errors"
	"time"

	mapper "gopkg.in/jeevatkm/go-model.v1"

	"github.com/sfkshan/pos/api-server/app/controllers/resources"
	"github.com/sfkshan/pos/api-server/app/models"
	"github.com/sfkshan/pos/api-server/app/services/sqlengine"
)

const (
	SignUpErrorMessage        = "Something went wrong (1001)"
	CouldntSignUpErrorMessage = "Couldn't do a signup now. Please try again later"
)

func SignUp(user *resources.SignUp) (err error) {
	iuser := models.User{}

	errs := mapper.Copy(&iuser, user)
	errs = mapper.Copy(&iuser, user.User)

	if len(errs) > 0 {
		return errors.New(SignUpErrorMessage)
	}

	iuser.Role = models.NormalUser
	iuser.CreatedAt = time.Now()
	iuser.UpdatedAt = time.Now()

	engine := sqlengine.Default()

	err = engine.OpenConnection()
	if err != nil {
		return errors.New(SignUpErrorMessage)
	}

	defer engine.CloseConnection()

	db := engine.Db

	res := db.Create(&iuser)

	if res.RowsAffected == 0 {
		return errors.New(CouldntSignUpErrorMessage)
	}

	return
}
