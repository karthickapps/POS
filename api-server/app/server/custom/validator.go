package custom

import validator "gopkg.in/go-playground/validator.v9"

type Validator struct {
	Validator *validator.Validate
}

func (cv *Validator) Validate(i interface{}) error {
	return cv.Validator.Struct(i)
}
