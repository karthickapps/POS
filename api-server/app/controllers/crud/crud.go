package crud

import (
	"errors"
	"fmt"
	"net/http"
	"reflect"
	"strconv"
	"time"

	"github.com/labstack/echo"
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
	page, perPage := getPageInfo(c)

	url := c.Request().Host + c.Request().URL.String()
	fmt.Println(url)

	var count interface{}

	dest := crudHandler.GetResultSetPtr()

	// Destroy the variable. Dont know whether its required or not
	defer func() {
		dest = nil
	}()

	engine := sqlengine.Default()
	if count, err = engine.Count(dest); err != nil {
		return
	}

	if err = engine.FetchPage(perPage, page, crudHandler.Model, dest); err != nil {
		return
	}

	// TODO needs to implement link header pagination.
	fmt.Println(count)

	return c.JSON(http.StatusOK, dest)
}

// POST /
func (crudHandler *CrudHandler) POST(c echo.Context) (err error) {
	if err = c.Bind(crudHandler.Model); err != nil {
		return
	}
	if err = c.Validate(crudHandler.Model); err != nil {
		fmt.Println(err)
		return
	}
	if err = utils.SetTimeStamp(crudHandler.Model); err != nil {
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
	if err = utils.UpdateBaseModelField(crudHandler.Model, "UpdatedAt", time.Now()); err != nil {
		return
	}

	engine := sqlengine.Default()
	if err = engine.Update(crudHandler.Model); err != nil {
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

// Gets the pagination details from querystring
func getPageInfo(c echo.Context) (page int, perPage int) {
	if page, _ = strconv.Atoi(c.QueryParam("page")); page == 0 {
		page = 1
	}

	if perPage, _ = strconv.Atoi(c.QueryParam("per_page")); perPage == 0 {
		perPage = 50
	}
	return
}
