import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { makeSchema } from "nexus";
import path from "path";

// Import GraphQL types and resolvers
import { Query } from "./graphql/Query.js";
import { Mutation } from "./graphql/Mutation.js";
import { User } from "./graphql/types/User.js";
import { Product } from "./graphql/types/Product.js";
import { Rental } from "./graphql/types/Rental.js";

// Load environment variables
dotenv.config();

// Initialize Prisma
const prisma = new PrismaClient();

// Setup Express App
const app = express();

// Enable CORS for frontend
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Create Nexus Schema
const schema = makeSchema({
  types: [Query, Mutation, User, Product, Rental],
  outputs: {
    schema: path.join(process.cwd(), "generated/schema.graphql"),
    typegen: path.join(process.cwd(), "generated/nexus-types.d.ts"),
  },
});

// Initialize Apollo Server
const server = new ApolloServer({
  schema,
  context: ({ req }) => ({ prisma, req }),
});

// Start Apollo Server
await server.start();

// Apply middleware to Express
app.use("/graphql", express.json(), expressMiddleware(server));

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
});
