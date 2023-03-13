"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@emotion/react";

export const metadata = {
  title: "SSW Tracking",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <CacheProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
