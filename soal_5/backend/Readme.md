# GraphQL Server with Dummy Product Data

This project is a GraphQL server implemented in Golang that uses dummy data to simulate a catalog service. It allows adding, editing, deleting, and querying products through GraphQL queries and mutations.

## Features

- Query products by ID or list all products.
- Add a new product.
- Edit an existing product.
- Delete a product.
- Uses in-memory dummy data for rapid testing and development.

## Prerequisites

- Go installed (version 1.18 or higher)
- `go mod` for dependency management
- A GraphQL client for testing (e.g., GraphQL Playground, Postman, or Insomnia)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/anzalladd/fullstack-test.git
   cd fullstack-test/soal_5/backend

2. Install dependencies:
   ```bash
   go mod tidy

3. Run project
   ```bash
   go run ./server.go

4. The server will start on
   ```bash
   http://localhost:8080
