package models

import (
	"github.com/google/uuid"
)

type CargoClass struct {
	ID            uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	CategoryClass string    `gorm:"type:varchar(255);not null"`
	BaseFee       int       `gorm:"type:int;not null"`
}
