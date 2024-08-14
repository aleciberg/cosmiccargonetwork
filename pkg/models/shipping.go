package models

import (
	"github.com/google/uuid"
)

type ShippingRequest struct {
	ShipmentDate         string    `json:"shipmentDate"`
	OriginPlanet         string    `json:"originPlanet"`
	DestinationPlanet    string    `json:"destinationPlanet"`
	RequiredDeliveryDate string    `json:"requiredDeliveryDate"`
	CargoClass           uuid.UUID `json:"cargoCategoryId"`
	Units                int       `json:"units"`
	Client               string    `json:"client"`
	Recipient            string    `json:"recipeint"`
}

type ShippingResponse struct {
	Token uuid.UUID
	Price int
}
