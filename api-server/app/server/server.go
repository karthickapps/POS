package server

import (
	"html/template"
	"net/http"
	"strconv"

	"github.com/sfkshan/pos/api-server/app/controllers/resources"
	"github.com/sfkshan/pos/api-server/app/router"
	"github.com/sfkshan/pos/api-server/app/server/custom"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	validator "gopkg.in/go-playground/validator.v9"
)

var e *echo.Echo

func Run() {
	server := createServer()
	server.Logger.Fatal(server.Start(":3500"))
}

func createServer() *echo.Echo {

	e = echo.New()

	addSpaRoutes()

	addRenderer()

	addMiddlewares()

	addFormValidator()

	addRoutes()

	customErrorHandler()

	return e
}

func addRoutes() {
	api := e.Group("/api")

	// api test route
	api.GET("/ping", func(c echo.Context) error {
		return c.String(200, "Api ping request")
	})

	// All the api routes are registered here
	router.Init(api)

	// SPA Routes.
	e.GET("*", func(c echo.Context) error {
		return c.Render(http.StatusOK, "index.html", c.QueryParam("name"))
	})
}

func customHTTPErrorHandler(err error, c echo.Context) {
	code := http.StatusInternalServerError
	if he, ok := err.(*echo.HTTPError); ok {
		code = he.Code
	}
	c.JSON(code, &resources.Response{Code: strconv.Itoa(code), Message: err.Error()})
}

func addMiddlewares() {
	e.Use(custom.AddCustomContext())
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())
}

// Sets the template renderer. This may not be required when using SPA
func addRenderer() {
	renderer := &TemplateRenderer{
		templates: template.Must(template.ParseGlob("app/views/*.html")),
	}
	e.Renderer = renderer
}

// Adds the custom form validator
func addFormValidator() {
	e.Validator = &custom.Validator{Validator: validator.New()}
}

func customErrorHandler() {
	e.HTTPErrorHandler = customHTTPErrorHandler
}

// This adds all the react app build files to the server.
func addSpaRoutes() {
	e.Static("/static", "public/static")
	e.File("/favicon.ico", "public/favicon.ico")
	e.File("/service-worker.js", "public/service-worker.js")
	e.File("/static/js/main.9c888fed.js", "public/static/js/main.9c888fed.js")
}
