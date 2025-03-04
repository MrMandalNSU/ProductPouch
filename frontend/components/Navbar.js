"use client";

import { Group, Button, Container } from "@mantine/core";
import { useRouter } from "next/navigation";
import Logo from "./logo";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    console.log("User logged out");
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

      {/* Logout button on the right */}
      <Button component="a" color="red" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
}
