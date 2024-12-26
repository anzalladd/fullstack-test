import { gql } from '@apollo/client';

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`

export const ADD_PRODUCT = gql`
mutation addProduct($name: String!, $price: Float!, $description: String!, $category: String!, $stock: Int!) {
  addProduct(
    input: {
      name: $name
      price: $price
      description: $description
      category: $category
      stock: $stock
    }
  ) {
    id
    name
    price
    description
    category
    stock
  }
}
`

export const EDIT_PRODUCT = gql`
mutation editProduct($name: String!, $price: Float!, $description: String!, $category: String!, $stock: Int!, $id: ID!) {
  editProduct(
    id: $id
    input: {
      name: $name
      price: $price
      description: $description
      category: $category
      stock: $stock
    }
  ) {
    id
    name
    price
    description
    category
    stock
  }
}
`