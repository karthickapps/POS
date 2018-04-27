package context

import (
	"github.com/labstack/echo"
	"github.com/sfkshan/pos/api-server/app/server/custom"
	"github.com/sfkshan/pos/api-server/app/utils"
)

func SetTimestampForUpdateAndValidate(c echo.Context, current interface{}, prev interface{}, shouldBind bool) (err error) {
	if shouldBind == true {
		if err = c.Bind(current); err != nil {
			return
		}
	}

	if err = utils.SetFieldsForUpdated(prev, current, c.(*custom.Context).UserID); err != nil {
		return
	}

	if err = c.Validate(current); err != nil {
		return
	}

	return
}

func SetTimestampForCreateNewAndValidate(c echo.Context, model interface{}, shouldBind bool) (err error) {
	if shouldBind == true {
		if err = c.Bind(model); err != nil {
			return
		}
	}

	if err = utils.SetFieldsForCreated(model, c.(*custom.Context).UserID); err != nil {
		return
	}

	if err = c.Validate(model); err != nil {
		return
	}

	return
}
