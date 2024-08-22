package models

import (
	"time"

	"github.com/google/uuid"
)

type ShippingQuoteRequest struct {
	ShipmentDate         time.Time `json:"shipmentDate"`
	OriginPlanet         string    `json:"originPlanet"`
	DestinationPlanet    string    `json:"destinationPlanet"`
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
