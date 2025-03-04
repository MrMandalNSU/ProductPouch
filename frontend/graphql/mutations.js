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
