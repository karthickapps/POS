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
	GET           = "GET"
	PUT           = "PUT"
	POST          = "POST"
	DEL           = "DEL"
	UpdatedFailed = "UpdatedFailed"
)

// CRUD Handler to register the routes dyanmically.
type CrudHandler struct {
	// The model object
	GetModel func() interface{}

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

	var count int64
	if err, count = engine.FindById(id, dest); err != nil {
		return
	}

	slice := reflect.ValueOf(dest).Elem()

	if count == 0 {
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

	q := c.QueryParam("q")

	if q != "" {
		id := "%" + q + "%"
		query.Condition = "id like ?"
		query.Args = []interface{}{id}
	}

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
	model := crudHandler.GetModel()

	// Destroy the variable. Dont know whether its required or not
	defer func() {
		model = nil
	}()

	if err = c.Bind(model); err != nil {
		return
	}

	if err = utils.SetFieldsForCreated(model, c.(*custom.Context).UserID); err != nil {
		return
	}

	if err = c.Validate(model); err != nil {
		fmt.Println(err)
		return
	}

	engine := sqlengine.Default()
	if err = engine.Create(model); err != nil {
		return
	}

	return c.JSON(http.StatusCreated, model)
}

// PUT /:id
func (crudHandler *CrudHandler) PUT(c echo.Context) (err error) {
	current := crudHandler.GetModel()
	prev := crudHandler.GetModel()
	userId := c.(*custom.Context).UserID

	defer func() {
		current = nil
		prev = nil
	}()

	// Bind the posted data to the 'current' variable to read the form data
	if err = c.Bind(current); err != nil {
		return
	}

	// Id in the form data
	postedId := reflect.ValueOf(current).Elem().FieldByName("ID").Interface().(string)
	// Id passed in the url
	paramId := c.Param("id")

	if postedId != paramId {
		return errors.New("Invalid data. The ID field cannot be altered in the update request.")
	}

	engine := sqlengine.Default()

	var count int64
	err, count = engine.FindById(postedId, prev)

	// Check whether the data us already present or not.
	// This is required since if the data is not present GORM inserts
	// new record which is the way we want here.
	// TODO Needs to do allow this in a diff way for user to modify the
	// PK if they want.
	if err != nil || count == 0 {
		return errors.New("Invalid entry for update")
	}

	if err = utils.SetFieldsForUpdated(prev, current, userId); err != nil {
		return
	}

	query := sqlengine.Query{}
	query.DataSet = current

	if err = engine.Update(query); err != nil {
		return
	}

	return c.JSON(http.StatusCreated, current)
}

// DEL /:id
func (crudHandler *CrudHandler) DEL(c echo.Context) (err error) {
	model := crudHandler.GetModel()

	// Destroy the variable. Dont know whether its required or not
	defer func() {
		model = nil
	}()

	id := c.Param("id")

	if len := len(id); len == 0 {
		err = errors.New("Id parameter is required")
		return
	}

	engine := sqlengine.Default()
	if err = engine.DeleteById(id, model); err != nil {
		return
	}

	return c.NoContent(http.StatusNoContent)
}
