package api

import (
	"errors"
	"net/http"

	"cosmicCargoNetwork/pkg/models"

	"github.com/labstack/echo/v4"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

const dsn = "host=localhost user=postgres password=root dbname=cosmiccargonetwork port=5432 sslmode=disable TimeZone=Asia/Shanghai"

func HandleGet(c echo.Context) error {
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

func HandleGetAll(c echo.Context) error {
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
