"use client";

import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import {
  Container,
  Title,
  Paper,
  Text,
  Button,
  Group,
  ActionIcon,
  Flex,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from "@apollo/client";
import { GET_ALL_PRODUCTS } from "../../graphql/mutations";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  // Get userId from localStorage
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Get the token and user info from localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUserId(user.id || null);
  }, []);

  // Execute the GraphQL query
  const { loading, error, data, refetch } = useQuery(GET_ALL_PRODUCTS);

  if (loading) return <Text>Loading products...</Text>;
  if (error)
    return <Text color="red">Error loading products: {error.message}</Text>;

  console.log("data: ", data);

  const products = data?.products || [];

  const formatDate = (dateString) => {
    const timestamp = Number(dateString);
    const date = new Date(timestamp);

    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const getOrdinalSuffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return `${day}${getOrdinalSuffix(day)} ${months[month]} ${year}`;
  };

  // To pass product info to route
  const handleProductClick = (product) => {
    const queryString = new URLSearchParams({
      title: product.title,
      price: product.price,
      rent_price: product.rent_price,
      rent_period: product.rent_period,
      status: product.status,
      description: product.description,
      categories: product.categories,
      owner_id: product.owner_id,
      rental: encodeURIComponent(JSON.stringify(product.rental)),
    }).toString();

    router.push(`/product/${product.id}?${queryString}`);
  };

  return (
    <>
      <Navbar />
      <Container size="md" py="xl">
        <Flex justify="space-between" align="center" mb="lg">
          <Title order={1} style={{ flex: 1, textAlign: "center" }}>
            All Products
          </Title>
        </Flex>

        {products.length === 0 ? (
          <Text>No products found.</Text>
        ) : (
          products.map((product) => (
            <Paper
              key={product.id}
              withBorder
              p="md"
              mb="md"
              style={{ cursor: "pointer" }}
              onClick={() => handleProductClick(product)}
            >
              <Group position="apart" mb="xs">
                <Title order={3}>{product.title}</Title>
              </Group>

              <Text size="sm" mb="xs">
                Categories:{" "}
                {Array.isArray(product.categories)
                  ? product.categories.join(", ")
                  : product.categories}
              </Text>
              <Text size="sm" mb="xs">
                Price: ${product.price} | Rent: ${product.rent_price}{" "}
                {product.rent_period} |{" "}
                <Text
                  span
                  c={
                    product.status === "available"
                      ? "green"
                      : product.status === "sold"
                      ? "red"
                      : product.status === "rented"
                      ? "yellow"
                      : "white"
                  }
                >
                  {product.status}
                </Text>
              </Text>
              <Text mb="md">{product.description}</Text>

              <Flex justify="space-between" align="center">
                <Text size="xs" color="dimmed">
                  Date posted: {formatDate(product.createdAt)}
                </Text>
                <Text size="xs" color="dimmed">
                  {product.views} views
                </Text>
              </Flex>

              {product.description && product.description.length > 100 && (
                <Button variant="subtle" size="xs" mt="xs">
                  More Details
                </Button>
              )}
            </Paper>
          ))
        )}
      </Container>
    </>
  );
}
