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

func SetFieldsForCreated(m interface{}, userId string) (err error) {
	if err = UpdateBaseModelField(m, "CreatedAt", time.Now()); err != nil {
		return
	}
	if err = UpdateBaseModelField(m, "CreatedBy", userId); err != nil {
		return
	}
	if err = SetFieldsForUpdated(m, userId); err != nil {
		return
	}
	return
}

func SetFieldsForUpdated(m interface{}, userId string) (err error) {
	if err = UpdateBaseModelField(m, "UpdatedAt", time.Now()); err != nil {
		return
	}
	if err = UpdateBaseModelField(m, "UpdatedBy", userId); err != nil {
		return
	}
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
