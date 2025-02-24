import React, { createContext, useContext, useEffect, useState } from "react";
import { IAsset } from "../lib/models/asset.model";
import { useChainId } from "wagmi";
import { getCoinsByChainId } from "../lib/helpers/coin.helper";

interface TokenContextProps {
  tokens: IAsset[];
  setTokens: (tokens: IAsset[]) => void;
  latestUsedTokens: IAsset[];
  setLastestUsedTokens: (tokens: IAsset[]) => void;
}
// TokenContext
const TokenContext = createContext<TokenContextProps | null>(null);

// TokenProvider
export const TokenProvider = ({ children }: { children: React.ReactNode }) => {
  const [tokens, setTokens] = useState<IAsset[]>([]);
  const [latestUsedTokens, setLastestUsedTokens] = useState<IAsset[]>([]);
  const chainId = useChainId();

  useEffect(() => {
    if (chainId) {
      const tokens = getCoinsByChainId(chainId);
      setTokens(tokens);
    }
  }, []);

  return (
    <TokenContext.Provider
      value={{
        tokens,
        latestUsedTokens,
        setTokens,
        setLastestUsedTokens,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useTokens = () => useContext(TokenContext);
