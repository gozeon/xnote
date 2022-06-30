package main

import (
	"context"
	_ "embed"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"xnotte/entity"

	"github.com/skratchdot/open-golang/open"
	"github.com/sonyarouje/simdb"
)

// App struct
type App struct {
	ctx        context.Context
	dataFolder string
	db         *simdb.Driver
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

//go:embed sample/nav.json
var sampleNavData []byte

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	dirver, err := simdb.New("simdb")
	if err != nil {
		panic(dirver)
	}
	a.db = dirver

	cwd, _ := os.Getwd()
	dataFolder := filepath.Join(cwd, "data")
	a.dataFolder = dataFolder

	if _, err = os.Stat(dataFolder); os.IsNotExist(err) {
		_ = os.MkdirAll(dataFolder, os.ModePerm)

	}
	// copy sample folder
	_ = ioutil.WriteFile(filepath.Join(dataFolder, "nav.json"), sampleNavData, os.ModePerm)

}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) InsterNav(nav entity.Nav) (result bool, err error) {
	err = a.db.Insert(nav)
	result = true
	return
}

func (a *App) ListNav() (result []entity.Nav, err error) {
	var navs []entity.Nav
	err = a.db.Open(entity.Nav{}).Get().AsEntity(&navs)
	result = navs
	return
}

func (a *App) LoadData(kind string) (data map[string]interface{}, err error) {
	var result map[string]interface{}
	context, err := ioutil.ReadFile(filepath.Join(a.dataFolder, kind))
	if err != nil {
		return nil, err
	}

	err = json.Unmarshal(context, &result)
	if err != nil {
		return nil, err
	}

	return result, nil
}

func (a *App) OpenDataFile(data string) (result bool, err error) {
	err = open.Start(filepath.Join(a.dataFolder, data))
	if err != nil {
		return false, err
	}

	return true, nil
}
