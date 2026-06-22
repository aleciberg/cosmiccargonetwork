package models

import (
	"time"

	"github.com/google/uuid"
)

type SavedQuote struct {
	ID                      uuid.UUID `gorm:"type:uuid;primaryKey"      json:"id"`
	UserID                  uuid.UUID `gorm:"type:uuid;not null;index"  json:"userId"`
	OriginPlanetID          uuid.UUID `gorm:"type:uuid;not null"        json:"originPlanetId"`
	DestinationPlanetID     uuid.UUID `gorm:"type:uuid;not null"        json:"destinationPlanetId"`
	OriginPlanetName        string    `json:"originPlanetName"`
	DestinationPlanetName   string    `json:"destinationPlanetName"`
	CargoType               string    `json:"cargoType"`
	CargoWeight             float64   `json:"cargoWeight"`
	CargoValue              *float64  `json:"cargoValue,omitempty"`
	BaseCost                float64   `json:"baseCost"`
	DistanceCost            float64   `json:"distanceCost"`
	OriginTax               float64   `json:"originTax"`
	OriginPoliticalFee      float64   `json:"originPoliticalFee"`
	DestinationTax          float64   `json:"destinationTax"`
	DestinationPoliticalFee float64   `json:"destinationPoliticalFee"`
	CargoCost               float64   `json:"cargoCost"`
	Total                   float64   `json:"total"`
	CreatedAt               time.Time `json:"createdAt"`
}
