import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers.js";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ prisma }),
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log(
      `🚀 Server running at http://localhost:4000${server.graphqlPath}`
    );
  });
}

startServer();
