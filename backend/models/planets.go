package models

import (
	"database/sql/driver"
	"fmt"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

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

func (c ClimateType) IsValid() bool {
	return c >= TropicalRainforest && c <= Monsoon
}

func (c *ClimateType) Scan(value interface{}) error {
	if value == nil {
		return nil
	}
	intValue, ok := value.(int64)
	if !ok {
		return fmt.Errorf("cannot scan type %T into ClimateType", value)
	}
	*c = ClimateType(intValue)
	return nil
}

func (c ClimateType) Value() (driver.Value, error) {
	return int(c), nil
}

type Planet struct {
	ID            uuid.UUID // UUID
	Name          string
	Galaxy        string // Foreign Key
	Climate       ClimateType
	NumberOfDocks int
	TaxRate       int
	PoliticalFee  int
	XCoordinate   float64
	YCoordinate   float64
	ZCoordinate   float64
}

func (p *Planet) Insert(db *gorm.DB) error {
	// Ensure ClimateType is valid
	if !p.Climate.IsValid() {
		return fmt.Errorf("invalid ClimateType: %d", p.Climate)
	}

	// Convert ClimateType to int before inserting
	return db.Create(p).Error
}
