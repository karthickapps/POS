package utils

import (
	"errors"
	"fmt"
	"reflect"
	"time"
)

func SetFieldsForCreated(m interface{}, userId string) (err error) {

	if err = SetBaseModelField(m, "CreatedAt", time.Now()); err != nil {
		return
	}
	if err = SetBaseModelField(m, "CreatedBy", "admin"); err != nil {
		return
	}
	if err = SetBaseModelField(m, "UpdatedAt", time.Now()); err != nil {
		return
	}
	if err = SetBaseModelField(m, "UpdatedBy", "admin"); err != nil {
		return
	}

	return
}

func SetFieldsForUpdated(prev interface{}, current interface{}, userId string) (err error) {
	createdAt := GetBaseModelFieldValue(prev, "CreatedAt")
	createdBy := GetBaseModelFieldValue(prev, "CreatedBy")

	fmt.Println(createdAt)
	fmt.Println(createdBy)

	if err = SetBaseModelField(current, "CreatedAt", createdAt); err != nil {
		return
	}

	if err = SetBaseModelField(current, "CreatedBy", createdBy); err != nil {
		return
	}

	if err = SetBaseModelField(current, "UpdatedBy", userId); err != nil {
		return
	}

	if err = SetBaseModelField(current, "UpdatedAt", time.Now()); err != nil {
		return
	}

	return
}

func GetBaseModelFieldValue(m interface{}, fieldName string) (value interface{}) {
	elem := reflect.ValueOf(m).Elem()
	baseValue := elem.FieldByName("Base")

	fmt.Println(baseValue)

	return baseValue.FieldByName(fieldName).Interface()
}

func SetBaseModelField(m interface{}, field string, value interface{}) (err error) {
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
