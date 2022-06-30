package entity

type Password struct {
	Id       string `json:"id"`
	Name     string `json:"name"`
	Password string `json:"password"`
}

//ID any struct that needs to persist should implement this function defined
//in Entity interface.
func (c Password) ID() (jsonField string, value interface{}) {
	value = c.Id
	jsonField = "id"
	return
}
