const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: Int!
    first_name: String!
    last_name: String
    address: String
    email: String!
    phone: String
    createdAt: String!
    updatedAt: String!
    owner: [Product!]
    buyer: [Product!]
    rental: [Rental!]
  }

  type Product {
    id: Int!
    title: String!
    categories: [String!]!
    description: String!
    price: Float!
    rent_price: Float!
    rent_period: String!
    views: Int
    status: String
    createdAt: String!
    updatedAt: String!
    owner: User!
    owner_id: Int!
    buyer: User
    buyer_id: Int
    rental: [Rental!]
  }

  type Rental {
    id: Int!
    rent_from: String!
    rent_to: String!
    product: Product!
    product_id: Int!
    renter: User!
    renter_id: Int!
  }

  type Query {
    users: [User!]!
    user(id: Int!): User
    products: [Product!]!
    product(id: Int!): Product
    rentals: [Rental!]!
    rental(id: Int!): Rental
  }

  input CreateUserInput {
    first_name: String!
    last_name: String
    address: String
    email: String!
    phone: String
    password: String!
  }

  input UpdateUserInput {
    first_name: String
    last_name: String
    address: String
    email: String
    phone: String
    password: String
  }

  input CreateProductInput {
    title: String!
    categories: [String!]!
    description: String!
    price: Float!
    rent_price: Float!
    rent_period: String!
    owner_id: Int!
  }

  input UpdateProductInput {
    title: String
    categories: [String!]
    description: String
    price: Float
    rent_price: Float
    rent_period: String
    status: String
    buyer_id: Int
  }

  input CreateRentalInput {
    rent_from: String!
    rent_to: String!
    product_id: Int!
    renter_id: Int!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: Int!, input: UpdateUserInput!): User!
    deleteUser(id: Int!): User!

    createProduct(input: CreateProductInput!): Product!
    updateProduct(id: Int!, input: UpdateProductInput!): Product!
    deleteProduct(id: Int!): Product!

    createRental(input: CreateRentalInput!): Rental!
    deleteRental(id: Int!): Rental!
  }
`;

module.exports = typeDefs;
