package api

import (
	"fmt"
	"net/http"

	"cosmicCargoNetwork/pkg/models"

	"github.com/labstack/echo/v4"
)

func HandleGet(c echo.Context) error {
	newPlanet := models.Planet{
		ID:            "Holder",
		Name:          "Aldaaron",
		Galaxy:        "Hoh",
		Climate:       models.Tundra,
		NumberOfDocks: 88,
		TaxRate:       0.0,
		PoliticalFee:  0.0,
	}

	fmt.Printf("Printing new planet %v", newPlanet)

	return c.JSON(http.StatusOK, newPlanet)
}
