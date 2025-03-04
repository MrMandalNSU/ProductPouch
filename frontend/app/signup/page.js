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
  LoadingOverlay,
  Alert,
} from "@mantine/core";
import {
  IconUser,
  IconAt,
  IconPhone,
  IconLock,
  IconHome,
  IconAlertCircle,
} from "@tabler/icons-react";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../graphql/mutations";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Apollo mutation hook
  const [createUser, { loading }] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      console.log("User created:", data);
      router.push("/login");
    },
    onError: (error) => {
      console.error("Error creating user:", error);
      setError(error.message || "An error occurred during signup.");
    },
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Password confirmation validation
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // GraphQL input structure
    const userInput = {
      first_name: form.firstName,
      last_name: form.lastName,
      address: form.address,
      email: form.email,
      phone: form.phone,
      password: form.password,
    };

    // Trigger mutation
    createUser({
      variables: {
        input: userInput,
      },
    });
  };

  return (
    <Center style={{ height: "100vh", backgroundColor: "#f8f9fa" }}>
      <div>
        {/* Sign Up Heading */}
        <Text align="center" size="xl" weight={700} mb="md">
          SIGN UP
        </Text>

        {/* Signup Box */}
        <Paper withBorder shadow="md" p="xl" radius="md" w={600} pos="relative">
          <LoadingOverlay visible={loading} />

          {error && (
            <Alert icon={<IconAlertCircle size={16} />} color="red" mb="md">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Group grow>
              <TextInput
                name="firstName"
                label=""
                placeholder="First Name"
                icon={<IconUser size={16} />}
                value={form.firstName}
                onChange={handleChange}
                required
              />
              <TextInput
                name="lastName"
                label=""
                placeholder="Last Name"
                icon={<IconUser size={16} />}
                value={form.lastName}
                onChange={handleChange}
              />
            </Group>

            <TextInput
              name="address"
              label=""
              placeholder="Address"
              icon={<IconHome size={16} />}
              value={form.address}
              onChange={handleChange}
              mt="md"
            />

            <Group grow mt="md">
              <TextInput
                name="email"
                label=""
                placeholder="Email"
                icon={<IconAt size={16} />}
                value={form.email}
                onChange={handleChange}
                required
              />
              <TextInput
                name="phone"
                label=""
                placeholder="Phone Number"
                icon={<IconPhone size={16} />}
                value={form.phone}
                onChange={handleChange}
              />
            </Group>

            <PasswordInput
              name="password"
              label=""
              placeholder="Password"
              icon={<IconLock size={16} />}
              value={form.password}
              onChange={handleChange}
              required
              mt="md"
            />
            <PasswordInput
              name="confirmPassword"
              label=""
              placeholder="Confirm Password"
              icon={<IconLock size={16} />}
              value={form.confirmPassword}
              onChange={handleChange}
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
                REGISTER
              </Button>
            </Group>
          </form>

          {/* Login Link */}
          <Text align="center" size="sm" mt="md">
            Already have an account?{" "}
            <Anchor component={Link} href="/login" color="blue">
              Sign In
            </Anchor>
          </Text>
        </Paper>
      </div>
    </Center>
  );
}
