package graph

import (
	"context"
	"errors"
	"strconv"

	"github.com/qraphql-services/graph/model"
	"golang.org/x/exp/rand"
)

type DescriptionType *string

func generateID() string {
	return strconv.Itoa(rand.Intn(1000000)) // This generates a random integer ID
}

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

// Mutation Resolver: AddProduct
func (r *Resolver) AddProduct(ctx context.Context, input model.ProductInput) (*model.Product, error) {
	newProduct := &model.Product{
		ID:          generateID(),
		Name:        input.Name,
		Price:       input.Price,
		Description: input.Description,
		Category:    &input.Category,
		Stock:       &input.Stock,
	}

	products = append(products, newProduct)

	return newProduct, nil
}

// Mutation Resolver: EditProduct
func (r *Resolver) EditProduct(ctx context.Context, id string, input model.ProductInput) (*model.Product, error) {
	for i, product := range products {
		if product.ID == id {
			products[i].Name = input.Name
			products[i].Price = input.Price
			products[i].Description = input.Description
			products[i].Category = &input.Category
			products[i].Stock = &input.Stock

			return products[i], nil
		}
	}

	return nil, errors.New("product not found")
}

// Mutation Resolver: Delete a product by ID
func (r *Resolver) DeleteProduct(ctx context.Context, id string) (bool, error) {
	// Find and remove the product by ID
	for i, product := range products {
		if product.ID == id {
			products = append(products[:i], products[i+1:]...)
			return true, nil
		}
	}

	return false, errors.New("product not found")
}
