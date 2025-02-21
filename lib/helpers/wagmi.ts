// config/index.tsx
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  bscTestnet,
  bsc,
} from "wagmi/chains";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
// Get projectId from https://cloud.reown.com
export const projectId = "53061d9ef52b4b8d8349738690583249";

export const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId,
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    {
      ...bscTestnet,
      chainName: "BSC Testnet",
      name: "BSC Testnet",
    },
    bsc,
  ],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
