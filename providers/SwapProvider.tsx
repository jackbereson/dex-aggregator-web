import { createContext, useContext, useState } from "react";
import { IAsset } from "../lib/models/asset.model";

interface SwapContextProps {
  fromToken: IAsset | undefined;
  toToken: IAsset | undefined;
  setFromToken: (token: IAsset) => void;
  setToToken: (token: IAsset) => void;
  fromInputValue: number;
  toInputValue: number;
  setFromInputValue: (value: number) => void;
  setToInputValue: (value: number) => void;
}

const SwapContext = createContext<SwapContextProps | null>(null);

export const SwapProvider = ({ children }: { children: React.ReactNode }) => {
  const [fromToken, setFromToken] = useState<IAsset>();
  const [toToken, setToToken] = useState<IAsset>();

  const [fromInputValue, setFromInputValue] = useState<number>(0);
  const [toInputValue, setToInputValue] = useState<number>(0);

  return (
    <SwapContext.Provider
      value={{
        fromToken,
        toToken,
        setFromToken,
        setToToken,
        fromInputValue,
        toInputValue,
        setFromInputValue,
        setToInputValue,
      }}
    >
      {children}
    </SwapContext.Provider>
  );
};

export const useSwap = () => useContext(SwapContext);
