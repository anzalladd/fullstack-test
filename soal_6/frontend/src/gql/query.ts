import { gql } from '@apollo/client';

export const GET_LIST_PRODUCT = gql`
  query getlist {
    listProducts {
      id
      name
      price
      category
      description
    }
  }`

export const GET_DETAIL_PRODUCT = gql`
 query getDetailProduct($id: ID!) {
  getProduct(id: $id) {
    id
    name
    price
    category
    description
    stock
  }
}`

