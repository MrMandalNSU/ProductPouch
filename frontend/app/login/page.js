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
  Group,
  Alert,
  LoadingOverlay,
} from "@mantine/core";
import { IconMail, IconLock, IconAlertCircle } from "@tabler/icons-react";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../graphql/mutations";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/auth-context";

export default function Login() {
  const router = useRouter();
  const { login: authLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Apollo login mutation
  const [loginMutation, { loading }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      console.log("Login successful:", data);

      // Use the auth context to login
      authLogin(data.login.user, data.login.token);

      router.push("/my-products");
    },
    onError: (error) => {
      console.error("Login error:", error);
      setError(error.message || "Invalid email or password");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Triggers login mutation
    loginMutation({
      variables: {
        email,
        password,
      },
    });
  };

  return (
    <Center style={{ height: "100vh", backgroundColor: "#f8f9fa" }}>
      <div>
        {/* Sign In Heading */}
        <Text align="center" size="xl" weight={700} mb="md">
          SIGN IN
        </Text>

        {/* Login Box */}
        <Paper withBorder shadow="md" p="xl" radius="md" w={350} pos="relative">
          <LoadingOverlay visible={loading} />

          {error && (
            <Alert icon={<IconAlertCircle size={16} />} color="red" mb="md">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextInput
              label=""
              placeholder="Email"
              icon={<IconMail size={16} />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <PasswordInput
              label=""
              placeholder="Password"
              icon={<IconLock size={16} />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              mt="md"
            />
            <Group justify="center" mt="md">
              <Button
                type="submit"
                justify="center"
                size="compact-md"
                mt="md"
                color="indigo"
                loading={loading}
              >
                LOGIN
              </Button>
            </Group>
          </form>

          {/* Signup Link */}
          <Text align="center" size="sm" mt="md">
            Don't have an account?{" "}
            <Anchor component={Link} href="/signup" color="blue">
              Signup
            </Anchor>
          </Text>
        </Paper>
      </div>
    </Center>
  );
}
