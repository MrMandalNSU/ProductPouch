"use client";

import { useState } from "react";
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

export default function ProductHistoryPage() {
  // Placeholder data - replace with actual GraphQL query
  const [activeTab, setActiveTab] = useState("bought");

  const mockHistoryData = {
    bought: [
      {
        id: "1",
        title: "iPhone 13 pro max",
        categories: ["Electronics"],
        price: 1500,
        date: "15 Mar 2025",
        status: "bought",
        additionalInfo: "Latest iPhone 13 max. Bought from the Apple store.",
      },
    ],
    sold: [],
    borrowed: [],
    lent: [],
  };

  const renderProductHistoryItem = (item) => (
    <Paper key={item.id} withBorder p="md" mb="md">
      <Flex justify="space-between" align="center" mb="xs">
        <Title order={3}>{item.title}</Title>
        <Badge
          color={
            item.status === "bought"
              ? "green"
              : item.status === "sold"
              ? "blue"
              : item.status === "borrowed"
              ? "orange"
              : "purple"
          }
        >
          {item.status.toUpperCase()}
        </Badge>
      </Flex>

      <Text size="sm" mb="xs">
        Categories:{" "}
        {Array.isArray(item.categories)
          ? item.categories.join(", ")
          : item.categories}
      </Text>

      <Text size="sm" mb="xs">
        Price: ${item.price}
      </Text>

      {item.additionalInfo && <Text mb="md">{item.additionalInfo}</Text>}

      <Flex justify="space-between" align="center">
        <Text size="xs" color="dimmed">
          Date: {item.date}
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
            {mockHistoryData.bought.length === 0 ? (
              <Text style={{ textAlign: "center", color: "dimmed" }} py="md">
                No bought items
              </Text>
            ) : (
              mockHistoryData.bought.map(renderProductHistoryItem)
            )}
          </Tabs.Panel>

          <Tabs.Panel value="sold" pt="xs">
            {mockHistoryData.sold.length === 0 ? (
              <Text style={{ textAlign: "center", color: "dimmed" }} py="md">
                No sold items
              </Text>
            ) : (
              mockHistoryData.sold.map(renderProductHistoryItem)
            )}
          </Tabs.Panel>

          <Tabs.Panel value="borrowed" pt="xs">
            {mockHistoryData.borrowed.length === 0 ? (
              <Text style={{ textAlign: "center", color: "dimmed" }} py="md">
                No borrowed items
              </Text>
            ) : (
              mockHistoryData.borrowed.map(renderProductHistoryItem)
            )}
          </Tabs.Panel>

          <Tabs.Panel value="lent" pt="xs">
            {mockHistoryData.lent.length === 0 ? (
              <Text style={{ textAlign: "center", color: "dimmed" }} py="md">
                No lent items
              </Text>
            ) : (
              mockHistoryData.lent.map(renderProductHistoryItem)
            )}
          </Tabs.Panel>
        </Tabs>
      </Container>
    </>
  );
}
