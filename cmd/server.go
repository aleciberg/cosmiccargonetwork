package main

import (
	"github.com/labstack/echo/v4"

	"cosmicCargoNetwork/internal/api"
	"cosmicCargoNetwork/pkg/config"
)

func main() {
	config.DatabaseInit()
	db := config.DB()
	e := echo.New()

	handler := api.NewHandler(db)

	e.GET("/planets", handler.HandleGetAllPlanets)
	e.GET("/planets:name", handler.HandleGetPlanetByName)
	e.GET("/galaxies", handler.HandleGetAllGalaxies)
	e.GET("/galaxies:name", handler.HandleGetGalaxyByName)
	e.GET("/superclusters", handler.HandleGetAllSuperclusters)
	e.GET("/superclusters:name", handler.HandleGetSuperclusterByName)
	e.POST("/shipping", handler.GetShippingQuote)
	e.GET("/distance", handler.GetShippingDistance)

	e.Logger.Fatal(e.Start(":1323"))
}
