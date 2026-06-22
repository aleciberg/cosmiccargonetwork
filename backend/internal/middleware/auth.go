package middleware

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
)

// SoftJWT parses a Bearer token if present and sets "userID" in context.
// It does not reject requests without a token — use RequireAuth for that.
func SoftJWT(secret string) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			authHeader := c.Request().Header.Get("Authorization")
			if authHeader == "" {
				return next(c)
			}

			parts := strings.SplitN(authHeader, " ", 2)
			if len(parts) != 2 || parts[0] != "Bearer" {
				return next(c)
			}

			token, err := jwt.Parse(parts[1], func(token *jwt.Token) (interface{}, error) {
				if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
				}
				return []byte(secret), nil
			})

			if err != nil || !token.Valid {
				return next(c)
			}

			claims, ok := token.Claims.(jwt.MapClaims)
			if !ok {
				return next(c)
			}

			if sub, ok := claims["sub"].(string); ok {
				c.Set("userID", sub)
			}

			return next(c)
		}
	}
}

// RequireAuth rejects requests where SoftJWT did not resolve a userID.
func RequireAuth(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		if c.Get("userID") == nil {
			return echo.NewHTTPError(http.StatusUnauthorized, "authentication required")
		}
		return next(c)
	}
}
