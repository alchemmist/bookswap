package data

type User struct {
	Id       string `json:"id"`
	Username string `json:"username"`
	Password string `json:"password"`
	Avatar   string `json:"avatar"`
	IsAdmin  bool   `json:"is_admin"`
}
