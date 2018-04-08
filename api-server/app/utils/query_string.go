package utils

import (
	"strconv"

	"github.com/labstack/echo"
)

// Gets the pagination details from querystring
func GetPageInfoFromQs(c echo.Context, totalNoOfRecords int64) (page int64, perPage int64) {
	if page, _ = strconv.ParseInt(c.QueryParam("page"), 10, 64); page == 0 {
		page = 1
	}

	if perPage, _ = strconv.ParseInt(c.QueryParam("per_page"), 10, 64); perPage == 0 {
		perPage = 50
	}

	if perPage > totalNoOfRecords {
		page = 1
	}

	totalPages := GetNoOfPages(totalNoOfRecords, perPage)

	if totalPages < page {
		page = totalPages
	}

	return
}
