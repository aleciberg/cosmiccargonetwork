package main

import (
	"github.com/labstack/echo/v4"

	"cosmicCargoNetwork/pkg/api"
)

func main() {
	e := echo.New()
	e.GET("/", api.HandleGet)
	e.Logger.Fatal(e.Start(":1323"))
}
