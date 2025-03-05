"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import {
  Container,
  Title,
  Text,
  Paper,
  Button,
  Modal,
  Group,
  Stack,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";

export default function SingleProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [rentModalOpen, setRentModalOpen] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const product = {
    title: searchParams.get("title"),
    price: searchParams.get("price"),
    rent_price: searchParams.get("rent_price"),
    rent_period: searchParams.get("rent_period"),
    status: searchParams.get("status"),
    description: searchParams.get("description"),
    categories: searchParams.get("categories"),
  };

  if (!product) return <Text>Loading product details...</Text>;

  const handleBuy = () => {
    setBuyModalOpen(false);
    alert(`You have bought ${product.title} for $${product.price}!`);
  };

  const handleRent = () => {
    if (!fromDate || !toDate) {
      alert("Please select rental dates");
      return;
    }
    setRentModalOpen(false);
    alert(
      `You rented ${
        product.title
      } from ${fromDate.toLocaleDateString()} to ${toDate.toLocaleDateString()}!`
    );
  };

  return (
    <>
      <Navbar />

      <Container size="md" py="xl">
        <Paper withBorder p="md">
          <Title order={2}>{product.title}</Title>
          <Text mt="sm">
            Categories:{" "}
            {Array.isArray(product.categories)
              ? product.categories.join(", ")
              : product.categories}
          </Text>
          <Text mt="sm">{product.description}</Text>
          <Text mt="sm">Price: ${product.price}</Text>
          <Text mt="sm">
            Rent: ${product.rent_price} {product.rent_period}
          </Text>
          <Text mt="sm">
            Status:{" "}
            <Text
              span
              c={
                product.status === "available"
                  ? "green"
                  : product.status === "sold"
                  ? "red"
                  : "yellow"
              }
            >
              {product.status}
            </Text>
          </Text>

          {/* Action Buttons */}
          <Group position="right" mt="xl">
            <Button color="blue" onClick={() => setBuyModalOpen(true)}>
              Buy
            </Button>
            <Button color="orange" onClick={() => setRentModalOpen(true)}>
              Rent
            </Button>
          </Group>
        </Paper>

        {/* Buy Confirmation Modal */}
        <Modal
          opened={buyModalOpen}
          onClose={() => setBuyModalOpen(false)}
          title="Confirm Purchase"
          centered
        >
          <Text>
            Are you sure you want to buy <strong>{product.title}</strong> for $
            {product.price}?
          </Text>
          <Group justify="center" mt="md">
            <Button variant="default" onClick={() => setBuyModalOpen(false)}>
              Cancel
            </Button>
            <Button color="blue" onClick={handleBuy}>
              Confirm
            </Button>
          </Group>
        </Modal>

        {/* Rent Modal */}
        <Modal
          opened={rentModalOpen}
          onClose={() => setRentModalOpen(false)}
          title="Rent Product"
          centered
        >
          <Stack spacing="sm" align="center">
            <Group position="center" mt="md">
              <DatePickerInput
                label="From"
                value={fromDate}
                onChange={setFromDate}
                placeholder="Pick a start date"
                valueFormat="DD/MM/YYYY"
                clearable
              />
              <DatePickerInput
                label="To"
                value={toDate}
                onChange={setToDate}
                placeholder="Pick an end date"
                valueFormat="DD/MM/YYYY"
                clearable
              />
            </Group>
          </Stack>
          <Group justify="center" mt="lg">
            <Button variant="default" onClick={() => setRentModalOpen(false)}>
              Cancel
            </Button>
            <Button color="orange" onClick={handleRent}>
              Confirm Rent
            </Button>
          </Group>
        </Modal>
      </Container>
    </>
  );
}
