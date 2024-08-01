package api

import (
	"fmt"
	"net/http"

	"cosmicCargoNetwork/pkg/models"

	"github.com/labstack/echo/v4"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func HandleGet(c echo.Context) error {
	dsn := "host=localhost user=postgres password=root dbname=cosmiccargonetwork port=5432 sslmode=disable TimeZone=Asia/Shanghai"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	name := c.QueryParam("name")
	fmt.Printf("Printing the name %v", name)

	var planet models.Planet
	db.First(&planet, "name = ?", &name) // find product with code D42

	return c.JSON(http.StatusOK, planet)
}
