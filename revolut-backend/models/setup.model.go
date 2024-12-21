package models

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	dsn := "host=localhost user=postgres password=MrNew0509@ dbname=revolut port=5432 sslmode=disable TimeZone=Asia/Tokyo"
	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("Failed to connect database.")
	}

	database.AutoMigrate(&Administrator{})
	database.AutoMigrate(&Card{})

	DB = database
}
