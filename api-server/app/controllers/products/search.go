package products

import (
	"net/http"

	"github.com/labstack/echo"
	"github.com/sfkshan/pos/api-server/app/controllers/resources"
	"github.com/sfkshan/pos/api-server/app/models"
	"github.com/sfkshan/pos/api-server/app/services/sqlengine"
)

func Search(c echo.Context) (err error) {
	products := []models.Product{}

	q := c.QueryParam("q")

	if err = getData(&products, q); err != nil {
		return
	}

	items := []resources.Product{}

	for idx := range products {
		product := products[idx]
		newItem := resources.Product{
			ID:    product.ID,
			Name:  product.Name,
			Price: product.SellingPrice,
		}
		items = append(items, newItem)
	}

	return c.JSON(http.StatusOK, items)
}

func getData(products interface{}, id string) (err error) {
	engine := sqlengine.Default()

	if err = engine.OpenConnection(); err != nil {
		return
	}
	defer engine.CloseConnection()

	db := engine.Db

	idLike := "%" + id + "%"

	res := db.Where("id like ?", idLike).Or("name like ?", idLike).Find(products)

	if err = res.Error; res != nil {
		return
	}

	return
}
