import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import typeDefs from "./schema.js";
import resolvers from "./resolvers.js";

async function startServer() {
  const app = express();

  // Configure CORS
  app.use(
    cors({
      origin: ["http://localhost:3000", "https://studio.apollographql.com"],
      credentials: true,
    })
  );

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      return { req };
    },
  });

  await server.start();

  server.applyMiddleware({
    app,
    cors: false,
  });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(
      `Server running at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer();
