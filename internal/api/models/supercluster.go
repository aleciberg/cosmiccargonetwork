package models

import "github.com/google/uuid"

type Supercluster struct {
	ID               uuid.UUID // UUID
	Name             string
	NumberOfGalaxies string
}
