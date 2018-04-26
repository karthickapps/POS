package sqlengine

import (
	"errors"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	_ "github.com/lib/pq"

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
		DbPath: dbpath,
	}
	return
}

// Opens the db connection.
func (engine *SqlEngine) OpenNgConnection() (err error) {
	engine.Db, err = gorm.Open("postgres", "host=localhost port=5432 user=mozzie dbname=pos password=mozzie@18 sslmode=disable")
	engine.Db.LogMode(true)
	return
}

// Opens the db connection.
func (engine *SqlEngine) OpenConnection() (err error) {
	engine.Db, err = gorm.Open("sqlite3", engine.DbPath)
	engine.Db.Exec("PRAGMA foreign_keys = ON")
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
	res := db.Create(data)

	if err = res.Error; err != nil {
		return
	}

	if count := res.RowsAffected; count == 0 {
		return errors.New("Duplicate entry")
	}

	return
}

func (engine *SqlEngine) Update(query Query) (err error) {
	if err = engine.OpenConnection(); err != nil {
		return
	}
	defer engine.CloseConnection()

	db := engine.Db
	var res *gorm.DB

	if query.Condition != nil {
		res = db.Where(query.Condition, query.Args).Save(query.DataSet)
	} else {
		res = db.Save(query.DataSet)
	}

	if err = res.Error; err != nil {
		return
	}

	return
}

func (engine *SqlEngine) Delete(query Query) (err error) {
	if err = engine.OpenConnection(); err != nil {
		return
	}
	defer engine.CloseConnection()

	db := engine.Db
	response := db.Where(query.Condition, query.Args).Delete(query.DataSet)
	if err = response.Error; err != nil {
		return
	}

	if response.RowsAffected == 0 {
		err = errors.New("Couldn't find a record with the id sent")
		return
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

	err = response.Error

	if err != nil && err.Error() == "FOREIGN KEY constraint failed" {
		err = errors.New("FOREIGN_KEY_CONSTRAINT")
		return
	}

	if err != nil {
		return
	}

	if response.RowsAffected == 0 {
		err = errors.New("Couldn't find a record with the id sent")
		return
	}

	return
}

func (engine *SqlEngine) Count(query Query) (count int64, err error) {
	if err = engine.OpenConnection(); err != nil {
		return
	}
	defer engine.CloseConnection()

	db := engine.Db

	q := db.Model(query.DataSet)

	if query.Condition != nil {
		q = q.Where(query.Condition, query.Args...)
	}

	response := q.Count(&count)

	if err = response.Error; err != nil {
		return
	}

	return
}

func (engine *SqlEngine) FetchByPages(query Query) (err error) {
	toSkip := (query.PageNo - 1) * query.PerPage

	if err = engine.OpenConnection(); err != nil {
		return
	}
	defer engine.CloseConnection()

	db := engine.Db

	if query.Condition != nil {
		db.Where(query.Condition, query.Args).Offset(toSkip).Limit(query.PerPage).Find(query.DataSet)
	} else {
		db.Offset(toSkip).Limit(query.PerPage).Find(query.DataSet)
	}

	return
}

func (engine *SqlEngine) FetchAll(query Query) (err error) {
	if err = engine.OpenConnection(); err != nil {
		return
	}
	defer engine.CloseConnection()

	db := engine.Db

	if query.Condition != nil {
		db.Where(query.Condition, query.Args).Find(query.DataSet)
	} else {
		db.Find(query.DataSet)
	}

	return
}

func (engine *SqlEngine) FindById(id interface{}, result interface{}) (err error, noOfRowsReturned int64) {
	if err = engine.OpenConnection(); err != nil {
		return
	}
	defer engine.CloseConnection()

	db := engine.Db

	res := db.Where("id = ?", id).Find(result)

	noOfRowsReturned = res.RowsAffected

	return
}
