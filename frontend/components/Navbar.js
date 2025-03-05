"use client";

import { Group, Button, Container, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import Logo from "./logo";
import { useState, useEffect } from "react";
import { useAuth } from "../context/auth-context";

export default function Navbar() {
  const router = useRouter();
  const { logout: authLogin } = useAuth();
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    // Get the token and user info from localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUserName(user.first_name || null);
  }, []);

  const handleLogout = () => {
    console.log("User logged out");
    authLogin();
    router.push("/login");
  };

  return (
    <Container
      size="xl"
      py="md"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #ddd",
      }}
    >
      {/* Logo on the left */}
      <Logo />

      <Group>
        <Button
          component="a"
          color="violet"
          variant="outline"
          size="compact-md"
          onClick={() => (window.location.href = "/all-products")}
        >
          All Products
        </Button>
        <Button
          component="a"
          color="violet"
          variant="outline"
          size="compact-md"
          onClick={() => router.push("/my-products")}
        >
          My Products
        </Button>

        <Button
          component="a"
          color="violet"
          variant="outline"
          size="compact-md"
          onClick={() => router.push("/my-products-history")}
        >
          My History
        </Button>
      </Group>

      <Text>{userName}</Text>
      <Button component="a" color="red" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
}
