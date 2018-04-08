package utils

import (
	"fmt"
	"strings"

	"github.com/labstack/echo"
)

func SetLinkHeader(c echo.Context, recordsPerpage int64, currentPageNo int64, totalrecords int64) {
	var linkHeaderString string

	params := c.QueryParams()
	qs := "?"

	for key := range params {
		if key == "page" {
			continue
		}
		qs += fmt.Sprintf("&%s=%s", key, params.Get(key))
	}

	url := fmt.Sprintf("http://%s%s%s", c.Request().Host, strings.Split(c.Request().RequestURI, "?")[0], qs)
	totalpages := GetNoOfPages(totalrecords, recordsPerpage)

	var nextPage int64

	if currentPageNo > totalpages {
		nextPage = totalpages
	} else if (currentPageNo + 1) < totalpages {
		nextPage = currentPageNo + 1
	} else {
		nextPage = totalpages
	}

	linkHeaderString += fmt.Sprintf("%s&page=%d;rel=\"next\",", url, nextPage)

	var prevPage int64

	if currentPageNo == 1 {
		prevPage = 1
	} else {
		prevPage = currentPageNo - 1
	}

	linkHeaderString += fmt.Sprintf("%s?page=%d;rel=\"prev\",", url, prevPage)
	linkHeaderString += fmt.Sprintf("%s?page=%d;rel=\"first\",", url, 1)
	linkHeaderString += fmt.Sprintf("%s?page=%d;rel=\"last\",", url, totalpages)

	// This is a custom entry which breaks the standard. For now go with this.
	linkHeaderString += fmt.Sprintf("%d;rel=\"count\",", totalpages)

	linkHeaderString = strings.TrimSuffix(linkHeaderString, ",")

	c.Response().Header().Add("Link", linkHeaderString)
}

func GetNoOfPages(totalrecords int64, recordsPerpage int64) (noOfPages int64) {
	if recordsPerpage > totalrecords {
		noOfPages = 1
		return
	}

	noOfPages = totalrecords / recordsPerpage
	rem := totalrecords % recordsPerpage

	if rem > 0 {
		noOfPages++
	}
	return
}
