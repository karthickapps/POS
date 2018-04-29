package services

import (
	"testing"

	"github.com/sfkshan/pos/api-server/app/services"
	"github.com/stretchr/testify/assert"
)

var assertIns *assert.Assertions

func TestGetTransId(t *testing.T) {
	assertIns = assert.New(t)

	err, transId := services.GetTransId()

	if err != nil {
		assertIns.Error(err)
		return
	}

	assertIns.Equal("290418", transId)
}
