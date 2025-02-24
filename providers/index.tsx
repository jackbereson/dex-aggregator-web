// context/index.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import React, { type ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { config } from "../lib/helpers/wagmi";
import { TokenProvider } from "./TokenProvider";

const queryClient = new QueryClient();

function ContextProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>
          <TokenProvider>{children}</TokenProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default ContextProvider;
