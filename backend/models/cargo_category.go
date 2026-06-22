package models

import (
	"github.com/google/uuid"
)

type CargoCategory struct {
	ID                        uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	CategoryClass             string    `gorm:"type:varchar(255);not null"`
	CategoryClassID           int       `gorm:"type:int;not null"`
	CategoryDesc              string    `gorm:"type:varchar(255);not null"`
	CategoryPremiumPercentage int       `gorm:"type:int"`
}
