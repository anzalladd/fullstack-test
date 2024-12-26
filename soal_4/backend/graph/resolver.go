package graph

import (
	"context"
	"errors"

	"github.com/qraphql-services/graph/model"
)

type DescriptionType *string

var products = []*model.Product{
	{
		ID:          "1",
		Name:        "Smartphone",
		Price:       699.99,
		Description: &[]string{"A powerful smartphone with 128GB storage."}[0],
		Category:    &[]string{"electronics"}[0],
		Stock:       &[]int32{10}[0],
	},
	{
		ID:          "2",
		Name:        "Laptop",
		Price:       999.99,
		Description: &[]string{"A high-performance laptop for work and gaming."}[0],
		Category:    &[]string{"electronics"}[0],
		Stock:       &[]int32{5}[0],
	},
	{
		ID:          "3",
		Name:        "Coffee Mug",
		Price:       15.99,
		Description: &[]string{"A ceramic mug for your favorite beverages."}[0],
		Category:    &[]string{"home"}[0],
		Stock:       &[]int32{50}[0],
	},
}

// Resolver struct for GraphQL
type Resolver struct{}

// Query Resolver: GetProduct by ID
func (r *Resolver) GetProduct(ctx context.Context, id string) (*model.Product, error) {
	for _, product := range products {
		if product.ID == id {
			return product, nil
		}
	}
	return nil, errors.New("product not found")
}

// Query Resolver: ListProducts with optional category and limit
func (r *Resolver) ListProducts(ctx context.Context, category *string, limit *int) ([]*model.Product, error) {
	var filteredProducts []*model.Product

	// Filter by category if provided
	for _, product := range products {
		if category == nil || product.Category == category {
			filteredProducts = append(filteredProducts, product)
		}
	}

	// Apply limit if provided
	if *limit != 0 && *limit < len(filteredProducts) {
		filteredProducts = filteredProducts[:*limit]
	}

	return filteredProducts, nil

}
