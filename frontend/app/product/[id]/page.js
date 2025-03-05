"use client";

import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
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
  Tooltip,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useMutation } from "@apollo/client";
import {
  BUY_PRODUCT,
  UPDATE_PRODUCT,
  CREATE_RENTAL,
} from "../../../graphql/mutations";

export default function SingleProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [rentModalOpen, setRentModalOpen] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Get the token and user info from localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUserId(user.id || null);
  }, []);

  const product = {
    id: Number(params.id),
    title: searchParams.get("title"),
    price: searchParams.get("price"),
    rent_price: searchParams.get("rent_price"),
    rent_period: searchParams.get("rent_period"),
    status: searchParams.get("status"),
    description: searchParams.get("description"),
    categories: searchParams.get("categories"),
    owner_id: Number(searchParams.get("owner_id")),
  };

  if (!product) return <Text>Loading product details...</Text>;

  // Apollo mutation hooks
  const [buyProduct, { loading }] = useMutation(BUY_PRODUCT, {
    onCompleted: (data) => {
      console.log("Product bought: ", data);
      window.location.href = "/all-products";
    },
    onError: (error) => {
      console.error("Error creating user:", error);
      setError(error.message || "An error occurred during buy");
    },
  });

  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const [createRental] = useMutation(CREATE_RENTAL);

  const handleBuy = () => {
    setBuyModalOpen(false);
    alert(`You have bought ${product.title} for $${product.price}!`);

    // Trigger mutation
    buyProduct({
      variables: {
        updateProductId: product.id,
        input: {
          buyer_id: userId,
          status: "sold",
        },
      },
    });
  };

  const handleRent = async () => {
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

    try {
      await updateProduct({
        variables: {
          updateProductId: product.id,
          input: { status: "rented" },
        },
      });

      await createRental({
        variables: {
          input: {
            rent_from: fromDate,
            rent_to: toDate,
            product_id: product.id,
            renter_id: userId,
          },
        },
      });

      // Redirect after successful rental
      window.location.href = "/all-products";
    } catch (error) {
      console.error("Error renting product:", error);
      setError(error.message || "An error occurred during rent");
    }
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
            <Tooltip
              label="You cannot buy your own product"
              disabled={userId !== product.owner_id}
            >
              <Button
                color="blue"
                onClick={() => setBuyModalOpen(true)}
                disabled={userId === product.owner_id}
              >
                Buy
              </Button>
            </Tooltip>

            <Tooltip
              label="You cannot rent your own product"
              disabled={userId !== product.owner_id}
            >
              <Button
                color="orange"
                onClick={() => setRentModalOpen(true)}
                disabled={userId === product.owner_id}
              >
                Rent
              </Button>
            </Tooltip>
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
