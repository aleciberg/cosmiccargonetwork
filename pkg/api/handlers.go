package api

import (
	"errors"
	"fmt"
	"net/http"

	"cosmicCargoNetwork/pkg/models"
	"cosmicCargoNetwork/pkg/utils"

	"github.com/labstack/echo/v4"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

const dsn = "host=localhost user=postgres password=root dbname=cosmiccargonetwork port=5432 sslmode=disable TimeZone=Asia/Shanghai"

func HandleGetPlanetByName(c echo.Context) error {
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	name := c.QueryParam("name")

	var planet models.Planet
	if err := db.First(&planet, "name = ?", name).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return echo.NewHTTPError(http.StatusNotFound, "planet not found")
		}
		return echo.NewHTTPError(http.StatusInternalServerError, "database error")
	}

	return c.JSON(http.StatusOK, planet)
}

func HandleGetAllPlanets(c echo.Context) error {
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "failed to connect to the database")
	}

	var planets []models.Planet
	if err := db.Find(&planets).Error; err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "failed to fetch planets")
	}

	return c.JSON(http.StatusOK, planets)
}

func HandleGetAllGalaxies(c echo.Context) error {
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "failed to connect to the database")
	}

	var galaxies []models.Galaxy
	if err := db.Find(&galaxies).Error; err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "failed to fetch galaxies")
	}

	return c.JSON(http.StatusOK, galaxies)
}

func HandleGetGalaxyByName(c echo.Context) error {
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	name := c.QueryParam("name")

	var galaxy models.Galaxy
	if err := db.First(&galaxy, "name = ?", name).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return echo.NewHTTPError(http.StatusNotFound, "galaxy not found")
		}
		return echo.NewHTTPError(http.StatusInternalServerError, "database error")
	}

	return c.JSON(http.StatusOK, galaxy)
}

func HandleGetAllSuperclusters(c echo.Context) error {
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "failed to connect to the database")
	}

	var superclusters []models.Supercluster
	if err := db.Find(&superclusters).Error; err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "failed to fetch superclusters")
	}

	return c.JSON(http.StatusOK, superclusters)
}

func HandleGetSuperclusterByName(c echo.Context) error {
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	name := c.QueryParam("name")

	var supercluster models.Supercluster
	if err := db.First(&supercluster, "name = ?", name).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return echo.NewHTTPError(http.StatusNotFound, "supercluster not found")
		}
		return echo.NewHTTPError(http.StatusInternalServerError, "database error")
	}

	return c.JSON(http.StatusOK, supercluster)
}

func GetShippingQuote(c echo.Context) error {
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	var request models.ShippingQuoteRequest
	err = c.Bind(&request)
	if err != nil {
		fmt.Printf("Printing the err %v", err)
		return c.String(http.StatusBadRequest, "bad request")
	}

	var cargoCategory models.CargoCategory
	err = db.First(&cargoCategory, request.CargoClass).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return c.String(http.StatusBadRequest, "Incorrect Cargo Class")
	}

	var cargoClass models.CargoClass
	err = db.First(&cargoClass, "category_class = ?", cargoCategory.CategoryClass).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return c.String(http.StatusBadRequest, "Incorrect Cargo Class")
	}

	fmt.Printf("Quoting: %v\n", cargoCategory.CategoryDesc)
	fmt.Printf("Printing units %v\n", request.Units)
	fmt.Printf("Printing fees for base fee %v\n", cargoClass.BaseFee)
	fmt.Printf("Printing fees for premium %v%%", float64(cargoCategory.CategoryPremiumPercentage)/100)

	initialFee := utils.ShippingRateCalc(cargoClass.BaseFee, cargoCategory.CategoryPremiumPercentage, request.Units)

	// Save to quotes table
	

	return c.JSON(http.StatusOK, initialFee)
}
