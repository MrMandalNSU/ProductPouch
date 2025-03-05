"use client";

import { useState } from "react";
import {
  Container,
  Title,
  TextInput,
  Select,
  MultiSelect,
  Textarea,
  NumberInput,
  Button,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Navbar from "@/components/Navbar";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useMutation } from "@apollo/client";
import { UPDATE_PRODUCT } from "../../../graphql/mutations";

export default function EditProductPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();

  // Extract product details from route parameters
  const product = {
    id: params.id, // Get product ID from route params
    title: searchParams.get("title") || "",
    price: searchParams.get("price") ? Number(searchParams.get("price")) : 0,
    rent_price: searchParams.get("rent_price")
      ? Number(searchParams.get("rent_price"))
      : 0,
    rent_period: searchParams.get("rent_period") || "per hr",
    categories: searchParams.get("categories")?.split(",") || [],
    description: searchParams.get("description") || "",
  };

  // Apollo mutation hook
  const [updateProduct, { loading }] = useMutation(UPDATE_PRODUCT, {
    onCompleted: (data) => {
      console.log("Product Updated: ", data);
      window.location.href = "/my-products";
    },
    onError: (error) => {
      console.log("data", data);
      console.error("Error creating user:", error);
      setError(error.message);
    },
  });

  // Initialize form with values from route parameters
  const form = useForm({
    initialValues: {
      title: product.title,
      categories: product.categories,
      description: product.description,
      price: product.price,
      rent: product.rent_price,
      rentPeriod: product.rent_period,
    },
    validate: {
      title: (value) =>
        value.trim().length === 0 ? "Title is required" : null,
      categories: (value) =>
        value.length === 0 ? "Select at least one category" : null,
      price: (value) => (value <= 0 ? "Price must be positive" : null),
      rent: (value) => (value < 0 ? "Rent cannot be negative" : null),
    },
  });

  const handleSubmit = (values) => {
    // Placeholder for actual update mutation
    console.log("Product update values:", values);
    console.log("Product ID:", product.id);

    // GraphQL input structure
    const userInput = {
      title: values.title,
      description: values.description,
      categories: values.categories,
      price: Number(values.price),
      rent_price: Number(values.rent),
      rent_period: values.rentPeriod,
    };

    console.log("user input: ", userInput);

    // Trigger mutation
    updateProduct({
      variables: {
        updateProductId: Number(product.id),
        input: userInput,
      },
    });
  };

  return (
    <>
      <Navbar />
      <Container size="xs" py="xl">
        <Title order={2} ta="center" mb="xl">
          Edit Product
        </Title>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Title"
            placeholder="Enter product title"
            {...form.getInputProps("title")}
            mb="md"
          />

          <MultiSelect
            label="Categories"
            placeholder="Select categories"
            data={[
              { value: "Electronics", label: "Electronics" },
              { value: "Furniture", label: "Furniture" },
              { value: "Home Appliances", label: "Home Appliances" },
              { value: "Sporting Goods", label: "Sporting Goods" },
              { value: "Outdoor", label: "Outdoor" },
              { value: "Toys", label: "Toys" },
            ]}
            {...form.getInputProps("categories")}
            mb="md"
          />

          <Textarea
            label="Description"
            placeholder="Enter product description"
            minRows={4}
            {...form.getInputProps("description")}
            mb="md"
          />

          <Group grow mb="md">
            <NumberInput
              label="Price"
              placeholder="Product price"
              prefix="$"
              min={0}
              {...form.getInputProps("price")}
            />

            <NumberInput
              label="Rent"
              placeholder="Rent price"
              prefix="$"
              min={0}
              {...form.getInputProps("rent")}
            />
            <Select
              label="Rent Period"
              data={["daily", "weekly", "monthly", "yearly"]}
              {...form.getInputProps("rentPeriod")}
            />
          </Group>

          <Button type="submit" fullWidth color="violet" loading={loading}>
            Edit Product
          </Button>
        </form>
      </Container>
    </>
  );
}
