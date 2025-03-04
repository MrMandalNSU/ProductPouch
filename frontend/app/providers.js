"use client";

import { ApolloProvider } from "@apollo/client";
import client from "../lib/apollo-client";
import { AuthProvider } from "../context/auth-context";

export function Providers({ children }) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>{children}</AuthProvider>
    </ApolloProvider>
  );
}
