package crud

import (
	"errors"
	"fmt"
	"net/http"
	"reflect"

	"github.com/labstack/echo"
	"github.com/sfkshan/pos/api-server/app/server/custom"
	"github.com/sfkshan/pos/api-server/app/services/sqlengine"
	"github.com/sfkshan/pos/api-server/app/utils"
)

const (
	GET  = "GET"
	PUT  = "PUT"
	POST = "POST"
	DEL  = "DEL"
)

// CRUD Handler to register the routes dyanmically.
type CrudHandler struct {
	// The model object
	Model interface{}

	// This func results the address of the resultset variable to fill the result.
	// This should initialize a new instance every request or every time the method
	// is called and should be destroyed when the response is sent.
	GetResultSetPtr func() interface{}

	// Echo context, here this is a grouped route under "api"
	EchoGroup *echo.Group
}

// Default method registers all the crud routes
func (crudHandler *CrudHandler) Register(route string) {
	crudHandler.EchoGroup.GET(route, crudHandler.GETAll)
	crudHandler.EchoGroup.GET(route+"/:id", crudHandler.GET)
	crudHandler.EchoGroup.POST(route, crudHandler.POST)
	crudHandler.EchoGroup.PUT(route+"/:id", crudHandler.PUT)
	crudHandler.EchoGroup.DELETE(route+"/:id", crudHandler.DEL)
}

// Registers the selective routes passed in verbs params
func (crudHandler *CrudHandler) RegisterRoutes(route string, verbs []string) {
	for _, v := range verbs {
		if v == GET {
			crudHandler.EchoGroup.GET(route, crudHandler.GETAll)
			crudHandler.EchoGroup.GET(route+"/:id", crudHandler.GET)
		} else if v == POST {
			crudHandler.EchoGroup.POST(route, crudHandler.POST)
		} else if v == PUT {
			crudHandler.EchoGroup.PUT(route+"/:id", crudHandler.PUT)
		} else if v == DEL {
			crudHandler.EchoGroup.DELETE(route+"/:id", crudHandler.DEL)
		}
	}
}

// GET  /:id
func (crudHandler *CrudHandler) GET(c echo.Context) (err error) {
	id := c.Param("id")

	engine := sqlengine.Default()

	dest := crudHandler.GetResultSetPtr()

	// Destroy the variable. Dont know whether its required or not
	defer func() {
		dest = nil
	}()

	if err = engine.FindById(id, dest); err != nil {
		return
	}

	slice := reflect.ValueOf(dest).Elem().Elem()

	if len := slice.Len(); len == 0 {
		return c.JSON(http.StatusOK, slice)
	}

	return c.JSON(http.StatusOK, slice.Index(0).Interface())
}

// GET ?per_page=10&page=2
func (crudHandler *CrudHandler) GETAll(c echo.Context) (err error) {
	dest := crudHandler.GetResultSetPtr()

	// Destroy the variable. Dont know whether its required or not
	defer func() {
		dest = nil
	}()

	query := sqlengine.Query{}
	query.DataSet = dest

	id := "%" + c.QueryParam("q") + "%"

	query.Condition = "id like ?"
	query.Args = []interface{}{id}

	var count int64

	engine := sqlengine.Default()
	if count, err = engine.Count(query); err != nil {
		return
	}

	query.PageNo, query.PerPage = utils.GetPageInfoFromQs(c, count)

	if err = engine.FetchAll(query); err != nil {
		return
	}

	utils.SetLinkHeader(c, query.PerPage, query.PageNo, count)

	return c.JSON(http.StatusOK, query.DataSet)
}

// POST /
func (crudHandler *CrudHandler) POST(c echo.Context) (err error) {
	if err = c.Bind(crudHandler.Model); err != nil {
		return
	}
	if err = utils.SetFieldsForCreated(crudHandler.Model, c.(*custom.Context).UserID); err != nil {
		return
	}
	if err = c.Validate(crudHandler.Model); err != nil {
		fmt.Println(err)
		return
	}

	engine := sqlengine.Default()
	if err = engine.Create(crudHandler.Model); err != nil {
		return
	}

	return c.JSON(http.StatusCreated, crudHandler.Model)
}

// PUT /:id
func (crudHandler *CrudHandler) PUT(c echo.Context) (err error) {
	if err = c.Bind(crudHandler.Model); err != nil {
		return
	}
	if err = c.Validate(crudHandler.Model); err != nil {
		return
	}
	if err = utils.SetFieldsForUpdated(crudHandler.Model, c.(*custom.Context).UserID); err != nil {
		return
	}

	engine := sqlengine.Default()
	query := sqlengine.Query{}
	query.DataSet = crudHandler.Model

	if err = engine.Update(query); err != nil {
		return
	}

	return c.JSON(http.StatusCreated, crudHandler.Model)
}

// DEL /:id
func (crudHandler *CrudHandler) DEL(c echo.Context) (err error) {
	id := c.Param("id")

	if len := len(id); len == 0 {
		err = errors.New("Id parameter is required")
		return
	}

	engine := sqlengine.Default()
	if err = engine.DeleteById(id, crudHandler.Model); err != nil {
		return
	}

	return c.NoContent(http.StatusNoContent)
}
