package api

import (
	"errors"
	"fmt"
	"net/http"

	"cosmicCargoNetwork/internal/api/models"
	"cosmicCargoNetwork/internal/repo"
	"cosmicCargoNetwork/internal/utils"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type Handler struct {
	DB *gorm.DB
}

func NewHandler(db *gorm.DB) *Handler {
	return &Handler{DB: db}
}

func (h *Handler) HandleGetPlanetByName(c echo.Context) error {
	name := c.QueryParam("name")

	var planet models.Planet
	if err := h.DB.First(&planet, "name = ?", name).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return echo.NewHTTPError(http.StatusNotFound, "planet not found")
		}
		return echo.NewHTTPError(http.StatusInternalServerError, "database error")
	}

	return c.JSON(http.StatusOK, planet)
}

func (h *Handler) HandleGetAllPlanets(c echo.Context) error {
	var planets []models.Planet
	if err := h.DB.Find(&planets).Error; err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "failed to fetch planets")
	}

	return c.JSON(http.StatusOK, planets)
}

func (h *Handler) HandleGetAllGalaxies(c echo.Context) error {
	var galaxies []models.Galaxy
	if err := h.DB.Find(&galaxies).Error; err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "failed to fetch galaxies")
	}

	return c.JSON(http.StatusOK, galaxies)
}

func (h *Handler) HandleGetGalaxyByName(c echo.Context) error {
	name := c.QueryParam("name")

	var galaxy models.Galaxy
	if err := h.DB.First(&galaxy, "name = ?", name).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return echo.NewHTTPError(http.StatusNotFound, "galaxy not found")
		}
		return echo.NewHTTPError(http.StatusInternalServerError, "database error")
	}

	return c.JSON(http.StatusOK, galaxy)
}

func (h *Handler) HandleGetAllSuperclusters(c echo.Context) error {
	var superclusters []models.Supercluster
	if err := h.DB.Find(&superclusters).Error; err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "failed to fetch superclusters")
	}

	return c.JSON(http.StatusOK, superclusters)
}

func (h *Handler) HandleGetSuperclusterByName(c echo.Context) error {
	name := c.QueryParam("name")

	var supercluster models.Supercluster
	if err := h.DB.First(&supercluster, "name = ?", name).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return echo.NewHTTPError(http.StatusNotFound, "supercluster not found")
		}
		return echo.NewHTTPError(http.StatusInternalServerError, "database error")
	}

	return c.JSON(http.StatusOK, supercluster)
}

func (h *Handler) GetShippingQuote(c echo.Context) error {
	var request models.ShippingQuoteRequest
	err := c.Bind(&request)
	if err != nil {
		fmt.Printf("Printing the err %v", err)
		return c.String(http.StatusBadRequest, "Bad Request")
	}

	var cargoCategory models.CargoCategory
	err = h.DB.First(&cargoCategory, request.CargoClass).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return c.String(http.StatusBadRequest, "Incorrect Cargo Class")
	}

	var cargoClass models.CargoClass
	err = h.DB.First(&cargoClass, "category_class = ?", cargoCategory.CategoryClass).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return c.String(http.StatusBadRequest, "Incorrect Cargo Class")
	}

	initialFee := utils.ShippingRateCalc(cargoClass.BaseFee, cargoCategory.CategoryPremiumPercentage, request.Units)

	saveQuote := repo.MapToDB(request, initialFee)
	if err := h.DB.Create(&saveQuote).Error; err != nil {
		return c.String(http.StatusInternalServerError, "Error Saving Shipping Quote")
	}

	shippingQuoteResponse := models.ShippingQuoteResponse{
		ID:    saveQuote.ID,
		Price: initialFee,
	}

	return c.JSON(http.StatusOK, shippingQuoteResponse)
}

func (h *Handler) GetShippingDistance(c echo.Context) error {
	// need a way to calc shipping distance with made up planets
}
