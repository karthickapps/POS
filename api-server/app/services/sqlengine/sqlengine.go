package sqlengine

import (
	"errors"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	"github.com/sfkshan/pos/api-server/config"
)

// Custom engine to connect the sqlite.
type SqlEngine struct {
	Db     *gorm.DB
	DbPath string
}

// Gets the default engine with the path set in config
func Default() (e *SqlEngine) {
	e = &SqlEngine{
		DbPath: config.DbPath,
	}
	return
}

// Creates a new engine with the path given in parameters
func Create(dbpath string) (e *SqlEngine) {
	e = &SqlEngine{
		DbPath: config.DbPath,
	}
	return
}

// Opens the db connection.
func (engine *SqlEngine) OpenConnection() (err error) {
	engine.Db, err = gorm.Open("sqlite3", engine.DbPath)
	engine.Db.LogMode(true)
	return
}

// Closes the opened connection
func (engine *SqlEngine) CloseConnection() (err error) {
	err = engine.Db.Close()
	return
}

func (engine *SqlEngine) Create(data interface{}) (err error) {
	if err = engine.OpenConnection(); err != nil {
		return
	}
	defer engine.CloseConnection()

	db := engine.Db
	if count := db.Create(data).RowsAffected; count == 0 {
		return errors.New("Error occurred while saving.")
	}

	return
}

func (engine *SqlEngine) Update(data interface{}) (err error) {
	if err = engine.OpenConnection(); err != nil {
		return
	}
	defer engine.CloseConnection()

	db := engine.Db
	if count := db.Save(data).RowsAffected; count == 0 {
		return errors.New("Error occurred while saving.")
	}

	return
}

func (engine *SqlEngine) DeleteById(id string, model interface{}) (err error) {
	if err = engine.OpenConnection(); err != nil {
		return
	}
	defer engine.CloseConnection()

	db := engine.Db
	response := db.Where("id = ?", id).Delete(model)
	if err = response.Error; err != nil {
		return
	}

	if response.RowsAffected == 0 {
		err = errors.New("Couldn't find a record with the id sent")
		return
	}

	return
}

func (engine *SqlEngine) Count(model interface{}) (count int64, err error) {
	if err = engine.OpenConnection(); err != nil {
		return
	}
	defer engine.CloseConnection()

	db := engine.Db
	response := db.Model(model).Count(&count)

	if err = response.Error; err != nil {
		return
	}

	return
}

func (engine *SqlEngine) FetchPage(perPage int, pageNo int, model interface{}, result interface{}) (err error) {
	toSkip := (pageNo - 1) * perPage

	if err = engine.OpenConnection(); err != nil {
		return
	}
	defer engine.CloseConnection()

	db := engine.Db

	db.Offset(toSkip).Limit(perPage).Find(result)

	return
}

func (engine *SqlEngine) FindById(id interface{}, result interface{}) (err error) {
	if err = engine.OpenConnection(); err != nil {
		return
	}
	defer engine.CloseConnection()

	db := engine.Db

	db.Where("id = ?", id).Find(result)

	return
}
