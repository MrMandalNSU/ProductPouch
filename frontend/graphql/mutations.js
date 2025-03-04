// graphql/mutations.js
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
