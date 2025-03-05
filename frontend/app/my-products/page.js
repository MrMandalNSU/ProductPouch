"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Title,
  Text,
  Button,
  Group,
  ActionIcon,
  Flex,
  Paper,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER_PRODUCTS, DELETE_PRODUCT } from "../../graphql/mutations";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function ProductsPage() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);

  // Move useEffect before the query hook
  useEffect(() => {
    // Get the token and user info from localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUserId(user.id || null);
  }, []);

  // Delete mutation
  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    update(cache, { data: { deleteProduct } }) {
      const existingProducts = cache.readQuery({
        query: GET_USER_PRODUCTS,
        variables: { userId },
      });

      cache.writeQuery({
        query: GET_USER_PRODUCTS,
        variables: { userId },
        data: {
          user: {
            ...existingProducts.user,
            owner: existingProducts.user.owner.filter(
              (product) => product.id !== deleteProduct.id
            ),
          },
        },
      });
    },
  });

  // Execute the GraphQL query
  const { loading, error, data, refetch } = useQuery(GET_USER_PRODUCTS, {
    variables: { userId },
    skip: !userId, // Skip the query until userId is available
  });

  // Handle product click
  const handleProductClick = (product) => {
    const queryString = new URLSearchParams({
      title: product.title,
      price: product.price,
      rent_price: product.rent_price,
      rent_period: product.rent_period,
      status: product.status,
      description: product.description,
      categories: product.categories,
    }).toString();

    router.push(`/edit-product/${product.id}?${queryString}`);
  };

  // Handle delete action
  const handleActionClick = (product) => {
    deleteProduct({
      variables: {
        deleteProductId: product.id,
      },
    });
  };

  // Formatting function
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

  // Render loading state
  if (loading) return <Text>Loading products...</Text>;

  // Render error state
  if (error)
    return <Text color="red">Error loading products: {error.message}</Text>;

  // Get products
  const products = data?.user?.owner || [];

  return (
    <>
      <Navbar />
      <Container size="md" py="xl">
        <Flex justify="space-between" align="center" mb="lg">
          <Title order={1} style={{ flex: 1, textAlign: "center" }}>
            MY PRODUCTS
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
              <Group justify="space-between" mb="xs">
                <Title order={3}>{product.title}</Title>
                <ActionIcon
                  color="gray"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleActionClick(product);
                  }}
                >
                  <IconTrash size={18} />
                </ActionIcon>
              </Group>

              <Text size="sm" mb="xs">
                Categories:{" "}
                {Array.isArray(product.categories)
                  ? product.categories.join(", ")
                  : product.categories}
              </Text>
              <Text size="sm" mb="xs">
                Price: ${product.price} | Rent: ${product.rent_price}{" "}
                {product.rent_period}
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

        <Group position="right" mt="xl">
          <Button
            onClick={() => {
              router.push("/add-product");
            }}
          >
            Add Product
          </Button>
        </Group>
      </Container>
    </>
  );
}
