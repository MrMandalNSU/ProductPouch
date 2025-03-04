import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: ID!
    first_name: String!
    last_name: String
    address: String
    email: String!
    phone: String
    password: String!
    createdAt: String
    updatedAt: String
  }

  type Query {
    user(id: ID!): User
  }

  type Mutation {
    createUser(
      first_name: String!
      last_name: String
      address: String
      email: String!
      phone: String
      password: String!
    ): User!
  }
`;

export default typeDefs;
