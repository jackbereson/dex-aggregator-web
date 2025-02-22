"use client";

import { useAccount, useBalance } from "wagmi";

export default function WalletBalance() {
  const { address, isConnected } = useAccount();
  const { data, isLoading } = useBalance({
    address,
  });

  if (!isConnected || !address || !data || isLoading) {
    return <></>;
  }

  return <>{data?.formatted}</>;
}
