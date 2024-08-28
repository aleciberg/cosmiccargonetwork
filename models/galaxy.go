package models

import "github.com/google/uuid"

type Galaxy struct {
	ID              uuid.UUID // UUID
	Name            string
	Supercluser     string // Foreign Key
	NumberOfPlanets int
	XCoordinate     float64
	YCoordinate     float64
	ZCoordinate     float64
}
