package domain

import (
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/sfkshan/pos/api-server/app/utils"
)

type TokenClaims struct {
	jwt.StandardClaims
	Role string `json:"role"`
	Csrf string `json:"csrf"`
}

const RefreshTokenValidTime = time.Hour * 72

// TODO change this when going live
const AuthTokenValidTime = time.Minute * 60 * 24

func GenerateCSRFSecret() (string, error) {
	return utils.GenerateRandomString(32)
}
