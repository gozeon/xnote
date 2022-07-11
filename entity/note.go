package entity

type Note struct {
	Id      string `json:"id"`
	Content string `json:"content"`
}

//ID any struct that needs to persist should implement this function defined
//in Entity interface.
func (c Note) ID() (jsonField string, value interface{}) {
	value = c.Id
	jsonField = "id"
	return
}
