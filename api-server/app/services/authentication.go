package services

import (
	"errors"
	"log"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/sfkshan/pos/api-server/app/models"
	"github.com/sfkshan/pos/api-server/app/services/domain"
	"github.com/sfkshan/pos/api-server/app/services/sqlengine"
	"github.com/sfkshan/pos/api-server/config"
)

const (
	LoginErrorMessage = "Something went wrong. Couldn't login, please try again later."
)

func Login(userid string, password string) (token domain.UserToken, err error) {
	engine := sqlengine.Default()
	token = domain.UserToken{}

	var resultSet = &models.User{}
	if err = engine.FindById(userid, resultSet); err != nil {
		return
	}

	if resultSet.Password != password {
		err = errors.New("User name or password is incorrect")
		return
	}

	token, err = CreateNewTokens(userid, password)

	return
}

func CreateNewTokens(userid string, role string) (token domain.UserToken, err error) {
	// generate the csrf secret
	csrfSecret, err := domain.GenerateCSRFSecret()
	if err != nil {
		return
	}

	authTokenString, err := createTokenString(userid, role, domain.AuthTokenValidTime, csrfSecret)
	if err != nil {
		return
	}

	refreshTokenString, err := createTokenString(userid, role, domain.AuthTokenValidTime, csrfSecret)
	if err != nil {
		return
	}

	token = domain.UserToken{
		AuthToken:    authTokenString,
		RefreshToken: refreshTokenString,
		Csrf:         csrfSecret,
	}
	return
}

// TODO : Cache in redis/db and cross verify whether the user is authenticated user.
func RefreshToken(oldAuthTokenString string, oldRfreshTokenString string, oldCsrfTokenString string) (token domain.UserToken, err error) {
	if oldCsrfTokenString == "" {
		log.Println("No CSRF token!")
		err = errors.New("Unauthorized")
		return
	}

	// now, check that it matches what's in the auth token claims
	refreshToken, err := jwt.ParseWithClaims(oldRfreshTokenString, &domain.TokenClaims{}, func(token *jwt.Token) (interface{}, error) {
		return config.SignKey, nil
	})
	refreshTokenClaims, ok := refreshToken.Claims.(*domain.TokenClaims)
	if !ok {
		return
	}
	if oldCsrfTokenString != refreshTokenClaims.Csrf {
		log.Println("CSRF token doesn't match jwt!")
		err = errors.New("Unauthorized")
		return
	}

	if refreshToken.Valid {
		return CreateNewTokens(refreshTokenClaims.Subject, refreshTokenClaims.Role)
	}
	return
}

func createTokenString(userid string, role string, duration time.Duration, csrfSecret string) (tokenString string, err error) {
	authTokenExp := time.Now().Add(duration).Unix()

	authClaims := domain.TokenClaims{
		StandardClaims: jwt.StandardClaims{
			Subject:   userid,
			ExpiresAt: authTokenExp,
		},
		Role: role,
		Csrf: csrfSecret,
	}
	// create a signer for rsa 256
	authJwt := jwt.NewWithClaims(jwt.SigningMethodHS256, authClaims)
	// generate the auth token string
	tokenString, err = authJwt.SignedString([]byte(config.SignKey))
	return
}
