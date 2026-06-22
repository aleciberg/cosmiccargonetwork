package api

import (
	"errors"
	"fmt"
	"math"
	"net/http"
	"strings"

	repo "cosmicCargoNetwork/internal/dto"
	"cosmicCargoNetwork/internal/utils"
	"cosmicCargoNetwork/models"

	"github.com/google/uuid"
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

	fmt.Printf("Printing name %v ", name)

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
	// Check if galaxyId query param is provided for filtering
	galaxyId := c.QueryParam("galaxyId")
	if galaxyId != "" {
		return h.HandleGetPlanetsByGalaxy(c)
	}

	var planets []models.Planet
	if err := h.DB.Find(&planets).Error; err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "failed to fetch planets")
	}

	return c.JSON(http.StatusOK, planets)
}

func (h *Handler) HandleGetPlanetsByGalaxy(c echo.Context) error {
	galaxyId := c.QueryParam("galaxyId")
	if galaxyId == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "galaxyId query parameter is required")
	}

	var planets []models.Planet
	if err := h.DB.Where("galaxy = ?", galaxyId).Find(&planets).Error; err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "failed to fetch planets")
	}

	return c.JSON(http.StatusOK, planets)
}

func (h *Handler) HandleGetAllGalaxies(c echo.Context) error {
	// Check if superclusterId query param is provided for filtering
	superclusterId := c.QueryParam("superclusterId")
	if superclusterId != "" {
		return h.HandleGetGalaxiesBySupercluster(c)
	}

	var galaxies []models.Galaxy
	if err := h.DB.Find(&galaxies).Error; err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "failed to fetch galaxies")
	}

	return c.JSON(http.StatusOK, galaxies)
}

func (h *Handler) HandleGetGalaxiesBySupercluster(c echo.Context) error {
	superclusterId := c.QueryParam("superclusterId")
	if superclusterId == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "superclusterId query parameter is required")
	}

	var galaxies []models.Galaxy
	if err := h.DB.Where("supercluster = ?", superclusterId).Find(&galaxies).Error; err != nil {
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

func CalculateDistance(p1, p2 models.Planet) float64 {
	distance := math.Sqrt(math.Pow(p2.XCoordinate-p1.XCoordinate, 2) + math.Pow(p2.YCoordinate-p1.YCoordinate, 2) + math.Pow(p2.ZCoordinate-p1.ZCoordinate, 2))
	return math.Round(distance)
}

func (h *Handler) GetShippingDistance(c echo.Context) error {
	distanceRequest := models.ShippingDistanceRequest{
		OriginPlanet:      c.QueryParam("originPlanet"),
		DestinationPlanet: c.QueryParam("destinationPlanet"),
	}

	var destinationPlanet models.Planet
	if err := h.DB.First(&destinationPlanet, "name = ?", distanceRequest.DestinationPlanet).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return echo.NewHTTPError(http.StatusNotFound, "planet not found")
		}
		return echo.NewHTTPError(http.StatusInternalServerError, "database error")
	}

	var originPlanet models.Planet
	if err := h.DB.First(&originPlanet, "name = ?", distanceRequest.OriginPlanet).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return echo.NewHTTPError(http.StatusNotFound, "planet not found")
		}
		return echo.NewHTTPError(http.StatusInternalServerError, "database error")
	}

	distance := CalculateDistance(destinationPlanet, originPlanet)

	err := distanceRequest.Validate()
	if err != nil {
		fmt.Printf("Validation error: %s\n", err.Error())
		return c.JSON(http.StatusBadRequest, "Missing query parameter")
	}

	var response = models.ShippingDistanceResponse{ShippingDistanceRequest: distanceRequest, Distance: distance}

	return c.JSON(http.StatusOK, response)
}

// QuoteRequest matches the frontend's expected request format
type QuoteRequest struct {
	OriginPlanetId      string `json:"originPlanetId"`
	DestinationPlanetId string `json:"destinationPlanetId"`
	Cargo               struct {
		Type            string  `json:"type"`
		Weight          float64 `json:"weight"`
		Volume          *float64 `json:"volume,omitempty"`
		Value           *float64 `json:"value,omitempty"`
		SpecialHandling *string  `json:"specialHandling,omitempty"`
	} `json:"cargo"`
}

// QuoteResponse matches the frontend's expected response format
type QuoteResponse struct {
	BaseCost                float64 `json:"baseCost"`
	DistanceCost            float64 `json:"distanceCost"`
	OriginTax               float64 `json:"originTax"`
	OriginPoliticalFee      float64 `json:"originPoliticalFee"`
	DestinationTax          float64 `json:"destinationTax"`
	DestinationPoliticalFee float64 `json:"destinationPoliticalFee"`
	CargoCost               float64 `json:"cargoCost"`
	Total                   float64 `json:"total"`
}

func (h *Handler) HandleGetQuote(c echo.Context) error {
	var request QuoteRequest
	if err := c.Bind(&request); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("invalid request: %v", err))
	}

	// Validate required fields
	if request.OriginPlanetId == "" || request.DestinationPlanetId == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "originPlanetId and destinationPlanetId are required")
	}
	if request.Cargo.Type == "" || request.Cargo.Weight <= 0 {
		return echo.NewHTTPError(http.StatusBadRequest, "cargo type and weight are required")
	}

	// Parse UUIDs
	originPlanetId, err := uuid.Parse(request.OriginPlanetId)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "invalid originPlanetId format")
	}
	destinationPlanetId, err := uuid.Parse(request.DestinationPlanetId)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "invalid destinationPlanetId format")
	}

	// Fetch origin planet
	var originPlanet models.Planet
	if err := h.DB.First(&originPlanet, "id = ?", originPlanetId).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return echo.NewHTTPError(http.StatusNotFound, "origin planet not found")
		}
		return echo.NewHTTPError(http.StatusInternalServerError, "failed to fetch origin planet")
	}

	// Fetch destination planet
	var destinationPlanet models.Planet
	if err := h.DB.First(&destinationPlanet, "id = ?", destinationPlanetId).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return echo.NewHTTPError(http.StatusNotFound, "destination planet not found")
		}
		return echo.NewHTTPError(http.StatusInternalServerError, "failed to fetch destination planet")
	}

	// Constants matching frontend calculation
	const BASE_COST = 1000.0
	const DISTANCE_RATE = 50.0
	const WEIGHT_RATE = 10.0
	const VALUE_RATE = 0.02

	// Calculate distance
	distance := CalculateDistance(originPlanet, destinationPlanet)

	// Base cost
	baseCost := BASE_COST

	// Distance cost
	distanceCost := distance * DISTANCE_RATE

	// Origin fees
	originTax := baseCost * (float64(originPlanet.TaxRate) / 100.0)
	originPoliticalFee := float64(originPlanet.PoliticalFee)

	// Destination fees
	destinationTax := (baseCost + distanceCost) * (float64(destinationPlanet.TaxRate) / 100.0)
	destinationPoliticalFee := float64(destinationPlanet.PoliticalFee)

	// Cargo-specific costs
	weightCost := request.Cargo.Weight * WEIGHT_RATE
	valueCost := 0.0
	if request.Cargo.Value != nil {
		valueCost = *request.Cargo.Value * VALUE_RATE
	}

	// Cargo type multipliers (matching frontend logic)
	cargoTypeMultipliers := map[string]float64{
		"standard":   1.0,
		"fragile":    1.5,
		"hazardous":  2.0,
		"perishable": 1.3,
		"valuable":   1.8,
		"bulk":       0.9,
	}
	cargoType := strings.ToLower(request.Cargo.Type)
	cargoMultiplier := cargoTypeMultipliers[cargoType]
	if cargoMultiplier == 0 {
		cargoMultiplier = 1.0 // Default multiplier
	}
	cargoCost := (weightCost + valueCost) * cargoMultiplier

	// Calculate total
	total := baseCost + distanceCost + originTax + originPoliticalFee + destinationTax + destinationPoliticalFee + cargoCost

	response := QuoteResponse{
		BaseCost:                baseCost,
		DistanceCost:            distanceCost,
		OriginTax:               originTax,
		OriginPoliticalFee:      originPoliticalFee,
		DestinationTax:          destinationTax,
		DestinationPoliticalFee: destinationPoliticalFee,
		CargoCost:               cargoCost,
		Total:                   total,
	}

	// Persist quote when the request is authenticated — errors are non-fatal
	if userIDStr, ok := c.Get("userID").(string); ok && userIDStr != "" {
		if userID, err := uuid.Parse(userIDStr); err == nil {
			saved := models.SavedQuote{
				ID:                      uuid.New(),
				UserID:                  userID,
				OriginPlanetID:          originPlanetId,
				DestinationPlanetID:     destinationPlanetId,
				OriginPlanetName:        originPlanet.Name,
				DestinationPlanetName:   destinationPlanet.Name,
				CargoType:               cargoType,
				CargoWeight:             request.Cargo.Weight,
				CargoValue:              request.Cargo.Value,
				BaseCost:                baseCost,
				DistanceCost:            distanceCost,
				OriginTax:               originTax,
				OriginPoliticalFee:      originPoliticalFee,
				DestinationTax:          destinationTax,
				DestinationPoliticalFee: destinationPoliticalFee,
				CargoCost:               cargoCost,
				Total:                   total,
			}
			h.DB.Create(&saved)
		}
	}

	return c.JSON(http.StatusOK, response)
}
