package models

import "github.com/google/uuid"

type Supercluster struct {
	ID               uuid.UUID // UUID
	Name             string
	NumberOfGalaxies string
	XCoordinate      float64
	YCoordinate      float64
	ZCoordinate      float64
}
