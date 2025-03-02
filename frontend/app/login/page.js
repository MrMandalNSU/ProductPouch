"use client";

import { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Text,
  Anchor,
  Center,
} from "@mantine/core";
import { IconMail, IconLock } from "@tabler/icons-react";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login clicked with:", { email, password });
  };

  return (
    <Center style={{ height: "100vh", backgroundColor: "#f8f9fa" }}>
      <div>
        {/* Sign In Heading */}
        <Text align="center" size="xl" weight={700} mb="md">
          SIGN IN
        </Text>

        {/* Login Box */}
        <Paper withBorder shadow="md" p="xl" radius="md" w={350}>
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Email"
              placeholder="Enter your email"
              icon={<IconMail size={16} />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              icon={<IconLock size={16} />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              mt="md"
            />
            <Button type="submit" fullWidth mt="md" color="indigo">
              LOGIN
            </Button>
          </form>

          {/* Signup Link */}
          <Text align="center" size="sm" mt="md">
            Don’t have an account?{" "}
            <Anchor component={Link} href="/signup" color="blue">
              Signup
            </Anchor>
          </Text>
        </Paper>
      </div>
    </Center>
  );
}
