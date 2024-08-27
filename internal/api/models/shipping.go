package models

import (
	"errors"
	"time"

	"github.com/google/uuid"
)

type ShippingQuoteRequest struct {
	ShipmentDate         time.Time `json:"shipmentDate"`
	OriginPlanet         uuid.UUID `json:"originPlanet"`
	DestinationPlanet    uuid.UUID `json:"destinationPlanet"`
	RequiredDeliveryDate time.Time `json:"requiredDeliveryDate"`
	CargoClass           uuid.UUID `json:"cargoCategoryId"`
	Units                int       `json:"units"`
	Client               string    `json:"client"`
	Recipient            string    `json:"recipeint"`
}

type ShippingQuoteResponse struct {
	ID    uuid.UUID
	Price float64
}

type ShippingDistanceRequest struct {
	OriginPlanet      string `json:"originPlanet"`
	DestinationPlanet string `json:"destinationPlanet"`
}

type ShippingDistanceResponse struct {
	ShippingDistanceRequest
	Distance float64 `json:"distance"` // Need some unit of measurement.  Kilophase?  Kilolight? 
}

func (req *ShippingDistanceRequest) Validate() error {
	if req.OriginPlanet == "" {
		return errors.New("originPlanet field cannot be empty")
	}
	if req.DestinationPlanet == "" {
		return errors.New("destinationPlanet field cannot be empty")
	}
	return nil
}
