package utils

import (
	"errors"
	"reflect"
	"time"
)

func SetTimeStamp(m interface{}) (err error) {
	typ := reflect.TypeOf(m).Elem()
	val := reflect.ValueOf(m).Elem()

	if typ.Kind() != reflect.Struct {
		err = errors.New("Binding element must be a struct")
	}

	baseValue := val.FieldByName("Base")

	updatedAt := baseValue.FieldByName("UpdatedAt")
	createdAt := baseValue.FieldByName("CreatedAt")

	if !updatedAt.CanSet() || !createdAt.CanSet() {
		return
	}

	updatedAt.Set(reflect.ValueOf(time.Now()))
	createdAt.Set(reflect.ValueOf(time.Now()))

	return
}

func UpdateBaseModelField(m interface{}, field string, value interface{}) (err error) {
	typ := reflect.TypeOf(m).Elem()
	val := reflect.ValueOf(m).Elem()

	if typ.Kind() != reflect.Struct {
		err = errors.New("Binding element must be a struct")
	}

	baseValue := val.FieldByName("Base")

	toUpdate := baseValue.FieldByName(field)

	if !toUpdate.CanSet() {
		return
	}

	toUpdate.Set(reflect.ValueOf(value))

	return
}
