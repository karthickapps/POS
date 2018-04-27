package receivings

import (
	"net/http"

	"github.com/labstack/echo"
	"github.com/sfkshan/pos/api-server/app/models"
	"github.com/sfkshan/pos/api-server/app/services/sqlengine"
	"github.com/sfkshan/pos/api-server/app/utils"
)

func GetAllReceivings(c echo.Context) (err error) {
	receivings := new([]models.Receiving)

	// receivingsroy the variable. Dont know whether its required or not
	defer func() {
		receivings = nil
	}()

	query := sqlengine.Query{}
	query.DataSet = receivings

	q := c.QueryParam("q")

	if q != "" {
		vendorId := "%" + q + "%"
		query.Condition = "vendor_id like ?"
		query.Args = []interface{}{vendorId}
	}

	var count int64

	if count, err = engine.Count(query); err != nil {
		return
	}

	query.PageNo, query.PerPage = utils.GetPageInfoFromQs(c, count)

	if err = engine.FetchByPages(query); err != nil {
		return
	}

	utils.SetLinkHeader(c, query.PerPage, query.PageNo, count)

	return c.JSON(http.StatusOK, query.DataSet)
}
