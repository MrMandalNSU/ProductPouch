"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Tabs,
  Paper,
  Text,
  Flex,
  Badge,
  Title,
} from "@mantine/core";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_ALL_PRODUCTS, BOUGHT_PRODUCTS } from "../../graphql/mutations";

export default function ProductHistoryPage() {
  const [activeTab, setActiveTab] = useState("bought");
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Get the token and user info from localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUserId(user.id || null);
  }, []);

  // Execute the GraphQL query
  const { loading, error, data, refetch } = useQuery(GET_ALL_PRODUCTS);

  const products = data?.products || [];

  const historyDataFunction = (products) => {
    const result = {
      bought: [],
      sold: [],
      borrowed: [],
      lent: [],
    };

    products.forEach((element) => {
      // Bought Items
      if (userId === Number(element?.buyer_id)) {
        result.bought.push(element);
      }

      // Sold Items
      if (userId === Number(element?.owner_id) && element?.status === "sold") {
        result.sold.push(element);
      }

      // Borrowed Items
      if (
        element?.rental &&
        element.rental.some((rental) => userId === Number(rental?.renter_id))
      ) {
        result.borrowed.push(element);
      }

      // Lent Items
      if (
        userId === Number(element?.owner_id) &&
        element?.status === "rented"
      ) {
        result.lent.push(element);
      }
    });

    return result;
  };

  // Generating history data form tabs
  const historyData = historyDataFunction(products);

  // Date Formatting function
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

  const renderProductHistoryItem = (item) => (
    <Paper key={item.id} withBorder p="md" mb="md">
      <Flex justify="space-between" align="center" mb="xs">
        <Title order={3}>{item.title}</Title>
      </Flex>

      <Text size="sm" mb="xs">
        Categories:{" "}
        {Array.isArray(item.categories)
          ? item.categories.join(", ")
          : item.categories}
      </Text>

      <Text size="sm" mb="xs">
        Price: ${item.price} | Rent Price: ${item.rent_price} | Rent Period: $
        {item.rent_period}
      </Text>

      {item.description && <Text mb="md">{item.description}</Text>}

      <Flex justify="space-between" align="center">
        <Text size="xs" color="dimmed">
          Date: {formatDate(item.createdAt)}
        </Text>
      </Flex>
    </Paper>
  );

  return (
    <>
      <Navbar />
      <Container size="md" py="xl">
        <Title order={1} style={{ textAlign: "center" }} mb="lg">
          PRODUCT HISTORY
        </Title>

        <Tabs value={activeTab} onChange={setActiveTab} variant="outline">
          <Tabs.List grow>
            <Tabs.Tab value="bought">Bought</Tabs.Tab>
            <Tabs.Tab value="sold">Sold</Tabs.Tab>
            <Tabs.Tab value="borrowed">Borrowed</Tabs.Tab>
            <Tabs.Tab value="lent">Lent</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="bought" pt="xs">
            {historyData?.bought?.length === 0 ? (
              <Text style={{ textAlign: "center", color: "dimmed" }} py="md">
                No bought items
              </Text>
            ) : (
              historyData?.bought?.map(renderProductHistoryItem)
            )}
          </Tabs.Panel>

          <Tabs.Panel value="sold" pt="xs">
            {historyData?.sold?.length === 0 ? (
              <Text style={{ textAlign: "center", color: "dimmed" }} py="md">
                No sold items
              </Text>
            ) : (
              historyData?.sold?.map(renderProductHistoryItem)
            )}
          </Tabs.Panel>

          <Tabs.Panel value="borrowed" pt="xs">
            {historyData?.borrowed?.length === 0 ? (
              <Text style={{ textAlign: "center", color: "dimmed" }} py="md">
                No borrowed items
              </Text>
            ) : (
              historyData?.borrowed?.map(renderProductHistoryItem)
            )}
          </Tabs.Panel>

          <Tabs.Panel value="lent" pt="xs">
            {historyData?.lent?.length === 0 ? (
              <Text style={{ textAlign: "center", color: "dimmed" }} py="md">
                No lent items
              </Text>
            ) : (
              historyData?.lent?.map(renderProductHistoryItem)
            )}
          </Tabs.Panel>
        </Tabs>
      </Container>
    </>
  );
}
