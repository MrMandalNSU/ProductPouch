import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      first_name
      last_name
      email
      address
      phone
      createdAt
      updatedAt
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        first_name
        last_name
        email
      }
    }
  }
`;

export const GET_USER_PRODUCTS = gql`
  query Products($userId: Int!) {
    user(id: $userId) {
      owner {
        id
        title
        price
        description
        categories
        rent_period
        rent_price
        status
        views
        owner_id
        createdAt
        updatedAt
      }
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      owner_id
      title
      description
      categories
      price
      rent_price
      rent_period
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation Mutation($updateProductId: Int!, $input: UpdateProductInput!) {
    updateProduct(id: $updateProductId, input: $input) {
      title
      description
      categories
      price
      rent_price
      rent_period
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($deleteProductId: Int!) {
    deleteProduct(id: $deleteProductId) {
      id
    }
  }
`;

export const BUY_PRODUCT = gql`
  mutation UpdateProduct($updateProductId: Int!, $input: UpdateProductInput!) {
    updateProduct(id: $updateProductId, input: $input) {
      buyer_id
      status
    }
  }
`;

export const CREATE_RENTAL = gql`
  mutation CreateRental($input: CreateRentalInput!) {
    createRental(input: $input) {
      product_id
      rent_from
      rent_to
      renter_id
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query Products {
    products {
      id
      title
      categories
      description
      price
      rent_period
      rent_price
      status
      views
      owner_id
      updatedAt
      createdAt
      owner {
        first_name
        email
        phone
      }
      buyer {
        first_name
        email
        phone
      }
      rental {
        rent_from
        rent_to
        renter_id
      }
    }
  }
`;
