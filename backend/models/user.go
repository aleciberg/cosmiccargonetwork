package models

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	ID           uuid.UUID `gorm:"type:uuid;primaryKey" json:"id"`
	Email        string    `gorm:"uniqueIndex;not null"  json:"email"`
	PasswordHash string    `gorm:"not null"              json:"-"`
	CreatedAt    time.Time `json:"createdAt"`
}

type UserResponse struct {
	ID    string `json:"id"`
	Email string `json:"email"`
}

func (u *User) ToResponse() UserResponse {
	return UserResponse{ID: u.ID.String(), Email: u.Email}
}
