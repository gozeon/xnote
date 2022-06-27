package entity

type Nav struct {
	Id       string `json:"id"`
	Category string `json:"category"`
	Link     Link   `json:"link"`
}

type Link struct {
	Title string `json:"title"`
	Url   string `json:"url"`
}

//ID any struct that needs to persist should implement this function defined
//in Entity interface.
func (c Nav) ID() (jsonField string, value interface{}) {
	value = c.Id
	jsonField = "id"
	return
}
