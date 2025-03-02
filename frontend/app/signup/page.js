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
} from "@mantine/core";
import {
  IconUser,
  IconAt,
  IconPhone,
  IconLock,
  IconHome,
} from "@tabler/icons-react";
import Link from "next/link";

export default function Signup() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup clicked with:", form);
  };

  return (
    <Center style={{ height: "100vh", backgroundColor: "#f8f9fa" }}>
      <div>
        {/* Sign Up Heading */}
        <Text align="center" size="xl" weight={700} mb="md">
          SIGN UP
        </Text>

        {/* Signup Box */}
        <Paper withBorder shadow="md" p="xl" radius="md" w={600}>
          <form onSubmit={handleSubmit}>
            <Group grow>
              <TextInput
                name="firstName"
                label="First Name"
                placeholder="John"
                icon={<IconUser size={16} />}
                value={form.firstName}
                onChange={handleChange}
                required
              />
              <TextInput
                name="lastName"
                label="Last Name"
                placeholder="Doe"
                icon={<IconUser size={16} />}
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </Group>

            <TextInput
              name="address"
              label="Address"
              placeholder="123 Main St"
              icon={<IconHome size={16} />}
              value={form.address}
              onChange={handleChange}
              required
              mt="md"
            />

            <Group grow mt="md">
              <TextInput
                name="email"
                label="Email"
                placeholder="johndoe@example.com"
                icon={<IconAt size={16} />}
                value={form.email}
                onChange={handleChange}
                required
              />
              <TextInput
                name="phone"
                label="Phone Number"
                placeholder="123-456-7890"
                icon={<IconPhone size={16} />}
                value={form.phone}
                onChange={handleChange}
                required
              />
            </Group>

            <PasswordInput
              name="password"
              label="Password"
              placeholder="Enter password"
              icon={<IconLock size={16} />}
              value={form.password}
              onChange={handleChange}
              required
              mt="md"
            />
            <PasswordInput
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Re-enter password"
              icon={<IconLock size={16} />}
              value={form.confirmPassword}
              onChange={handleChange}
              required
              mt="md"
            />

            <Button type="submit" fullWidth mt="md" color="indigo">
              REGISTER
            </Button>
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
