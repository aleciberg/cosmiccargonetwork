package main

import (
	"os"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	"cosmicCargoNetwork/internal/api"
	"cosmicCargoNetwork/internal/config"
	appMiddleware "cosmicCargoNetwork/internal/middleware"
	"cosmicCargoNetwork/models"
)

func main() {
	config.DatabaseInit()
	db := config.DB()

	// Create auth tables if they don't exist (safe for existing DBs)
	db.AutoMigrate(&models.User{}, &models.SavedQuote{})

	e := echo.New()

	allowedOrigin := os.Getenv("ALLOWED_ORIGIN")
	if allowedOrigin == "" {
		allowedOrigin = "http://localhost:3000"
	}

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{allowedOrigin},
		AllowMethods: []string{echo.GET, echo.POST, echo.PUT, echo.DELETE, echo.OPTIONS},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization},
	}))

	// Soft auth — sets userID in context when a valid token is present; never blocks
	e.Use(appMiddleware.SoftJWT(config.JWTSecret()))

	handler := api.NewHandler(db)

	// Public routes
	e.GET("/planets", handler.HandleGetAllPlanets)
	e.GET("/planets:name", handler.HandleGetPlanetByName)
	e.GET("/galaxies", handler.HandleGetAllGalaxies)
	e.GET("/galaxies:name", handler.HandleGetGalaxyByName)
	e.GET("/superclusters", handler.HandleGetAllSuperclusters)
	e.GET("/superclusters:name", handler.HandleGetSuperclusterByName)
	e.POST("/shipping", handler.GetShippingQuote)
	e.GET("/distance", handler.GetShippingDistance)
	e.POST("/quote", handler.HandleGetQuote) // saves to DB when authenticated

	// Auth routes
	e.POST("/auth/register", handler.Register)
	e.POST("/auth/login", handler.Login)

	// Protected routes
	protected := e.Group("")
	protected.Use(appMiddleware.RequireAuth)
	protected.GET("/auth/me", handler.Me)
	protected.GET("/quotes", handler.HandleGetQuotes)

	e.Logger.Fatal(e.Start(":1323"))
}
