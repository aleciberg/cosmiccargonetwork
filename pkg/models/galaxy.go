package models

type Galaxy struct {
	ID              string // UUID
	Name            string
	Supercluser     string // Foreign Key
	NumberOfPlanets int
}
