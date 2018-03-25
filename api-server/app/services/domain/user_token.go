package domain

type UserToken struct {
	AuthToken    string `json:"authToken"`
	RefreshToken string `json:"refreshToken"`
	Csrf         string `json:"csrf"`
}
