package models

type ClimateType int

const (
	TropicalRainforest ClimateType = iota
	Savanna
	Desert
	Mediterranean
	Tundra
	TemperateDeciduousForest
	BorealForest
	Polar
	Highland
	Monsoon
)

type Planet struct {
	ID            string // UUID
	Name          string
	Galaxy        string // Foreign Key
	Climate       ClimateType
	NumberOfDocks int
	TaxRate       int
	PoliticalFee  int
}
