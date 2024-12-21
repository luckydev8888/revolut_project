package models

import "time"

type Visitor struct {
	ID               uint      `json:"id" gorm:"primaryKey"`
	Country          string    `json:"country"`
	CountryCode      string    `json:"country_code"`
	NumberOfVisitors uint      `json:"number_of_visitors"`
	CreatedAt        time.Time `json:"created_at"`
	UpdatedAt        time.Time `json:"updated_at"`
}
