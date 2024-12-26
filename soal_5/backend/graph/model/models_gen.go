// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

type Mutation struct {
}

type Order struct {
	ID        string       `json:"id"`
	User      *User        `json:"user"`
	OrderDate string       `json:"orderDate"`
	Status    string       `json:"status"`
	Items     []*OrderItem `json:"items"`
}

type OrderItem struct {
	Product  *Product `json:"product"`
	Quantity int32    `json:"quantity"`
}

type OrderItemInput struct {
	ProductID string `json:"productId"`
	Quantity  int32  `json:"quantity"`
}

type Product struct {
	ID          string  `json:"id"`
	Name        string  `json:"name"`
	Price       float64 `json:"price"`
	Description *string `json:"description,omitempty"`
	Category    *string `json:"category,omitempty"`
	Stock       *int32  `json:"stock,omitempty"`
}

type ProductInput struct {
	Name        string  `json:"name"`
	Price       float64 `json:"price"`
	Description *string `json:"description,omitempty"`
	Category    string  `json:"category"`
	Stock       int32   `json:"stock"`
}

type Query struct {
}

type User struct {
	ID      string  `json:"id"`
	Name    string  `json:"name"`
	Email   string  `json:"email"`
	Address *string `json:"address,omitempty"`
}
