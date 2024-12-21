package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/mavsin/revolut-backend/controllers"
	"github.com/mavsin/revolut-backend/middlewares"
	"github.com/mavsin/revolut-backend/models"
)

func main() {
	router := gin.Default()
	models.ConnectDatabase()
	router.Use(cors.Default())

	router.POST("/api/auth/sign-up", controllers.SignUp)
	router.POST("/api/auth/sign-in", controllers.SignIn)

	router.GET("/api/admin/card/get/:pageNumber", middlewares.JWTMiddleware(), controllers.GetCardsByPage)

	router.POST("/api/card/create", controllers.CreateCard)
	router.PUT("/api/card/update/:cardId", controllers.UpdateCard)

	router.Run("localhost:8080")
}
