"use client";

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
import { GET_USER_PRODUCTS } from "../../graphql/mutations";
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
  const { loading, error, data } = useQuery(GET_USER_PRODUCTS, {
    variables: { userId },
    skip: !userId, // Skip the query until userId is available
  });

  if (loading) return <Text>Loading products...</Text>;
  if (error)
    return <Text color="red">Error loading products: {error.message}</Text>;

  const products = data?.user?.owner || [];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}${getOrdinalSuffix(date.getDate())} ${getMonthName(
      date.getMonth()
    )} ${date.getFullYear()}`;
  };

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

  const getMonthName = (month) => {
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
    return months[month];
  };

  return (
    <Container size="md" py="xl">
      <Flex justify="space-between" align="center" mb="lg">
        <Title order={1} style={{ flex: 1, textAlign: "center" }}>
          MY PRODUCTS
        </Title>
        <Button component="a" href="/logout" color="red">
          LOGOUT
        </Button>
      </Flex>

      {products.length === 0 ? (
        <Text>No products found.</Text>
      ) : (
        products.map((product) => (
          <Paper key={product.id} withBorder p="md" mb="md">
            <Group position="apart" mb="xs">
              <Title order={3}>{product.title}</Title>
              <ActionIcon color="gray">
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
  );
}
