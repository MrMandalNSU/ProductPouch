"use client";

import { MantineProvider } from "@mantine/core";

export default function MantineWrapper({ children }) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      {children}
    </MantineProvider>
  );
}
