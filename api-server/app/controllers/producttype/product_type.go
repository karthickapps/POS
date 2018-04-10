package producttype

import (
	"net/http"

	"github.com/labstack/echo"
	"github.com/sfkshan/pos/api-server/app/models"
	"github.com/sfkshan/pos/api-server/app/server/custom"
	"github.com/sfkshan/pos/api-server/app/services/sqlengine"
	"github.com/sfkshan/pos/api-server/app/utils"
)

func CreateNew(c echo.Context) (err error) {
	p := &models.ProductType{}

	if err = c.Bind(p); err != nil {
		return
	}
	if err = utils.SetFieldsForCreated(p, c.(*custom.Context).UserID); err != nil {
		return
	}

	if err = c.Validate(p); err != nil {
		return
	}

	engine := sqlengine.Default()
	if err = engine.Create(p); err != nil {
		return
	}

	return c.JSON(http.StatusCreated, p)
}

func FetchAll(c echo.Context) (err error) {
	query := sqlengine.Query{}
	query.DataSet = &[]models.ProductType{}

	q := c.QueryParam("q")
	if q != "" {
		id := "%" + c.QueryParam("q") + "%"
		query.Condition = "id like ?"
		query.Args = []interface{}{id}
	}

	var count int64

	engine := sqlengine.Default()
	if count, err = engine.Count(query); err != nil {
		return
	}

	query.PageNo, query.PerPage = utils.GetPageInfoFromQs(c, count)

	if err = engine.Fetch(query); err != nil {
		return
	}

	utils.SetLinkHeader(c, query.PerPage, query.PageNo, count)

	return c.JSON(http.StatusOK, query.DataSet)
}
