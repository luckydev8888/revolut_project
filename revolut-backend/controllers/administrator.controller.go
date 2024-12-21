package controllers

import (
	"math"
	"net/http"
	"strconv"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/mavsin/revolut-backend/models"
	"golang.org/x/crypto/bcrypt"
)

//	------------------------------------------------------------------------------------------------

type SignUpInput struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type SignInInput struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type AdminResponse struct {
	ID        uint      `json:"id"`
	Email     string    `json:"email"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

//	------------------------------------------------------------------------------------------------

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(bytes), nil
}

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func CreateToken(userID uint) (string, error) {
	var err error

	// Creating a JWT token
	atClaims := jwt.MapClaims{}
	atClaims["authorized"] = true
	atClaims["user_id"] = userID
	atClaims["exp"] = time.Now().Add(time.Hour * 24).Unix() // Token expires after 24 hours
	at := jwt.NewWithClaims(jwt.SigningMethodHS256, atClaims)

	token, err := at.SignedString([]byte("your_secret_key")) // Use a secret from your environment
	if err != nil {
		return "", err
	}
	return token, nil
}

func ConvertToAdminResponse(admin models.Administrator) AdminResponse {
	return AdminResponse{
		ID:        admin.ID,
		Email:     admin.Email,
		CreatedAt: admin.CreatedAt,
		UpdatedAt: admin.UpdatedAt,
	}
}

//	------------------------------------------------------------------------------------------------

const amountPerPage int = 15

//	------------------------------------------------------------------------------------------------

// Sign up
func SignUp(c *gin.Context) {
	var input SignUpInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	var admin models.Administrator
	if err := models.DB.Where("email = ?", input.Email).First(&admin).Error; err == nil {
		//	If the email already exists
		c.AbortWithStatusJSON(http.StatusConflict, gin.H{
			"error": "The email already exists",
		})
		return
	}

	passwordHash, err := HashPassword(input.Password)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
			"error": "Hashing password failed",
		})
		return
	}

	//	If the email doesn't exist
	newAdmin := models.Administrator{
		Email:    input.Email,
		Password: passwordHash,
	}
	if err := models.DB.Create(&newAdmin).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to create admin",
		})
		return
	}

	adminResponse := ConvertToAdminResponse(newAdmin)
	c.JSON(http.StatusOK, gin.H{"data": adminResponse})
}

// Sign in
func SignIn(c *gin.Context) {
	var input SignInInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	var admin models.Administrator

	if err := models.DB.Where("email = ?", input.Email).First(&admin).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{
			"error": "Email not found",
		})
		return
	}

	passwordMatched := CheckPasswordHash(input.Password, admin.Password)

	if !passwordMatched {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid password",
		})
		return
	}

	token, err := CreateToken(admin.ID)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to create JWT token",
		})
		return
	}

	adminResponse := ConvertToAdminResponse(admin)

	c.JSON(http.StatusOK, gin.H{"data": adminResponse, "token": token})
}

func GetCardsByPage(c *gin.Context) {
	var cards []models.Card
	var totalAmount int64
	var totalVisitor int64
	var visitors []models.Visitor

	//	Get current page
	currentPage, err := strconv.Atoi(c.Param("pageNumber"))
	if err != nil {
		c.JSON(400, gin.H{"error": err})
		return
	}

	//	Get cards of the current page
	if result := models.DB.Order("updated_at desc").Limit(amountPerPage).Offset((currentPage - 1) * amountPerPage).Find(&cards); result.Error != nil {
		c.JSON(500, gin.H{"error": result.Error.Error()})
		return
	}

	//	Get the amount of total cards
	if result := models.DB.Model(&models.Card{}).Count(&totalAmount); result.Error != nil {
		c.JSON(500, gin.H{"error": result.Error.Error()})
		return
	}

	// Get the number of total visitors
	if err := models.DB.Model(&models.Visitor{}).Select("COALESCE(SUM(number_of_visitors), 0) as total_visitor").Row().Scan(&totalVisitor); err != nil {
		c.JSON(500, gin.H{"error": err})
		return
	}

	//	Get all visitors by country
	if result := models.DB.Find(&visitors); result.Error != nil {
		c.JSON(500, gin.H{"error": result.Error.Error()})
		return
	}

	maxPage := math.Ceil(float64(totalAmount) / float64(amountPerPage))

	c.JSON(http.StatusOK, gin.H{
		"cards":       cards,
		"totalAmount": totalAmount,
		"maxPage":     maxPage,
		"visitorData": gin.H{
			"totalVisitor": totalVisitor,
			"visitors":     visitors,
		},
	})
}
