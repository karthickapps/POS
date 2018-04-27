package custom

import (
	"database/sql/driver"
	"errors"
	"fmt"
	"reflect"

	validator "gopkg.in/go-playground/validator.v9"
)

type Validator struct {
	Validator *validator.Validate
}

func (cv *Validator) Validate(i interface{}) error {
	return cv.Validator.Struct(i)
}

func GetValidator() *validator.Validate {
	validate := validator.New()
	validate.RegisterCustomTypeFunc(ValidateValuer)
	return validate
}

func ValidateValuer(field reflect.Value) interface{} {

	if valuer, ok := field.Interface().(driver.Valuer); ok {

		val, err := valuer.Value()

		fmt.Println("======>")
		fmt.Println(val)

		if val == "" {
			return errors.New("Field cannot be empty")
		}

		if err == nil {
			return val
		}
	}

	return nil
}
