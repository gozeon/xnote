package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"xnotte/entity"

	cp "github.com/otiai10/copy"
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
		// copy sample folder
		_ = cp.Copy(filepath.Join(cwd, "sample"), filepath.Join(cwd, "data"))
	}
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
