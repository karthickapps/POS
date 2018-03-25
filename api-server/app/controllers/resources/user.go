package resources

type User struct {
	ID       string `json:"userid" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

type SignUp struct {
	User
	Name string `json:"username" validate:"required"`
}
