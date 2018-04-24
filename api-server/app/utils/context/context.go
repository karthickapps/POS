package context

import (
	"github.com/labstack/echo"
	"github.com/sfkshan/pos/api-server/app/server/custom"
	"github.com/sfkshan/pos/api-server/app/utils"
)

func Validate(c echo.Context, model interface{}) (err error) {
	if err = c.Bind(model); err != nil {
		return
	}

	if err = utils.SetFieldsForCreated(model, c.(*custom.Context).UserID); err != nil {
		return
	}

	if err = c.Validate(model); err != nil {
		return
	}

	return
}
