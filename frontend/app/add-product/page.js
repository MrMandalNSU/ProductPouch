"use client";

import React, { useState } from "react";
import {
  TextInput,
  MultiSelect,
  Textarea,
  NumberInput,
  Select,
  Stepper,
  Button,
  Group,
  Text,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";

export default function CreateProductPage() {
  const [active, setActive] = useState(0);

  const form = useForm({
    initialValues: {
      title: "",
      categories: [],
      description: "",
      price: 0,
      rentPrice: 0,
      rentPeriod: "daily", // Default rent period
    },
    validate: {
      title: (value) => (value.trim().length > 0 ? null : "Title is required"),
      categories: (value) =>
        value.length > 0 ? null : "Select at least one category",
      description: (value) =>
        value.trim().length > 0 ? null : "Description is required",
      price: (value) => (value > 0 ? null : "Price must be greater than 0"),
      rentPrice: (value) =>
        value >= 0 ? null : "Rent price cannot be negative",
      rentPeriod: (value) =>
        ["daily", "weekly", "monthly", "yearly"].includes(value)
          ? null
          : "Invalid rent period",
    },
  });

  const nextStep = () => {
    const currentStepValidation = [
      () => form.validateField("title"),
      () => form.validateField("categories"),
      () => form.validateField("description"),
      () => form.validateField("price"),
    ];

    const isStepValid = currentStepValidation[active]();

    if (isStepValid) {
      setActive((current) => (current < 4 ? current + 1 : current));
    }
  };

  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
  };

  const handleSubmit = (values) => {
    console.log("Product submitted:", values);
    // TODO: Implement your GraphQL mutation here
  };

  return (
    <Box maw={600} mx="auto" mt={20}>
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step label="Title">
          <TextInput
            label="Product Title"
            placeholder="Enter product title"
            {...form.getInputProps("title")}
          />
        </Stepper.Step>

        <Stepper.Step label="Categories">
          <MultiSelect
            label="Product Categories"
            placeholder="Select categories"
            data={[
              { value: "Electronics", label: "Electronics" },
              { value: "Toys", label: "Toys" },
              { value: "Clothing", label: "Clothing" },
              { value: "Books", label: "Books" },
            ]}
            {...form.getInputProps("categories")}
          />
        </Stepper.Step>

        <Stepper.Step label="Description">
          <Textarea
            label="Product Description"
            placeholder="Enter product description"
            {...form.getInputProps("description")}
          />
        </Stepper.Step>

        <Stepper.Step label="Pricing">
          <NumberInput
            label="Purchase Price"
            placeholder="Enter purchase price"
            prefix="$"
            {...form.getInputProps("price")}
          />
          <Group grow>
            <NumberInput
              label="Rent Price"
              placeholder="Enter rent price"
              prefix="$"
              {...form.getInputProps("rentPrice")}
            />
            <Select
              label="Rent Period"
              placeholder="Select rent period"
              data={[
                { value: "daily", label: "Daily" },
                { value: "weekly", label: "Weekly" },
                { value: "monthly", label: "Monthly" },
                { value: "yearly", label: "Yearly" },
              ]}
              {...form.getInputProps("rentPeriod")}
            />
          </Group>
        </Stepper.Step>

        <Stepper.Step label="Summary">
          <Text>Review your product details:</Text>
          <Text>Title: {form.values.title}</Text>
          <Text>
            Categories:{" "}
            {form.values.categories.length > 0
              ? form.values.categories.join(", ")
              : "No categories selected"}
          </Text>
          <Text>Description: {form.values.description}</Text>
          <Text>Purchase Price: ${form.values.price}</Text>
          <Text>
            Rent Price: ${form.values.rentPrice} {form.values.rentPeriod}
          </Text>
        </Stepper.Step>
      </Stepper>

      <Group justify="center" mt="xl">
        {active !== 0 && (
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
        )}
        {active < 4 && <Button onClick={nextStep}>Next</Button>}
        {active === 4 && (
          <Button onClick={() => handleSubmit(form.values)}>Submit</Button>
        )}
      </Group>
    </Box>
  );
}
