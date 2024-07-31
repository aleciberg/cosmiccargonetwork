package main

import (
	"github.com/labstack/echo/v4"

	"cosmicCargoNetwork/config"
	"cosmicCargoNetwork/pkg/api"
)

func main() {
	config.DatabaseInit()
	gorm := config.DB()

	dbGorm, err := gorm.DB()
	if err != nil {
		panic(err)
	}

	dbGorm.Ping()

	e := echo.New()

	e.GET("/", api.HandleGet)
	// GET shipping quote
	// POST shipping lock in
	// POST distance or GET?
	// POST availability
	// GET Discounted

	e.Logger.Fatal(e.Start(":1323"))
}
