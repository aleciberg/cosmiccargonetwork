package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	"cosmicCargoNetwork/internal/api"
	"cosmicCargoNetwork/internal/config"
)

func main() {
	config.DatabaseInit()
	db := config.DB()
	e := echo.New()
	e.Use(middleware.CORS())

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
