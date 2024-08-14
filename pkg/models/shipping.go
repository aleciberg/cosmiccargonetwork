package models

import (
	"github.com/google/uuid"
)

type ShippingRequest struct {
	ShipmentDate         string `json:"shipmentDate"`
	OriginPlanet         string `json:"originPlanet"`
	DestinationPlanet    string `json:"destinationPlanet"`
	RequiredDeliveryDate string `json:"requiredDeliveryDate"`
	CargoClass           string `json:"cargoClass"`
	Client               string `json:"client"`
	Recipient            string `json:"recipeint"`
}

type ShippingResponse struct {
	Token uuid.UUID
	Price int
}

// Add validation logic here
