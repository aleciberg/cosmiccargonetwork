package repo

import (
	"cosmicCargoNetwork/internal/api/models"
	"time"

	"github.com/google/uuid"
)

type ShippingQuoteDB struct {
	ID                   uuid.UUID `db:"id"`
	QuoteDate            time.Time `db:"quote_date"`
	ShipmentDate         time.Time `db:"shipment_date"`
	OriginPlanet         uuid.UUID `db:"origin_planet"`
	DestinationPlanet    uuid.UUID `db:"destination_planet"`
	RequiredDeliveryDate time.Time `db:"required_delivery_date"`
	CargoClass           string    `db:"cargo_class"`
	Units                int       `db:"units"`
	Client               string    `db:"client"`
	Recipient            string    `db:"recipient"`
	Quote                float64   `db:"quote"`
}

func MapToDB(r models.ShippingQuoteRequest, quote float64) ShippingQuoteDB {
	return ShippingQuoteDB{
		ID:                   uuid.New(),
		QuoteDate:            time.Now(),
		ShipmentDate:         r.ShipmentDate,
		OriginPlanet:         r.OriginPlanet,
		DestinationPlanet:    r.DestinationPlanet,
		RequiredDeliveryDate: r.RequiredDeliveryDate,
		CargoClass:           r.CargoClass.String(), // Convert UUID to string if needed
		Units:                r.Units,
		Client:               r.Client,
		Recipient:            r.Recipient,
		Quote:                quote,
	}
}

func (ShippingQuoteDB) TableName() string {
	return "shipping_quotes"
}
