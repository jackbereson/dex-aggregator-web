/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Card } from "flowbite-react";
import { Button } from "flowbite-react";
import { HiOutlineSwitchVertical } from "react-icons/hi";
import {
  AiOutlineCaretDown,
  AiOutlineExclamationCircle,
  AiOutlineReload,
  AiOutlineSwap,
  AiOutlineWallet,
} from "react-icons/ai";
import CurrencyInput from "react-currency-input-field";
import { SelectAssetModal } from "../components/SelectAssetModal";
import WalletBalance from "../components/WalletBalance";
import { IAsset } from "../lib/models/asset.model";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { SwapProvider, useSwap } from "../providers/SwapProvider";

export default function Home() {
  return (
    <SwapProvider>
      <Swap />
    </SwapProvider>
  );
}

const Swap = () => {
  const {
    fromToken,
    setFromToken,
    toToken,
    setToToken,
    fromInputValue,
    setFromInputValue,
    toInputValue,
    setToInputValue,
  } = useSwap();

  return (
    <main className="flex min-h-screen items-center justify-center dark:bg-gray-900">
      <section className="flex w-[500px] flex-col gap-4">
        <Card className="w-full bg-gray-800 text-white">
          {/* From Section */}
          <TokenInput
            label="From"
            value={fromInputValue}
            setValue={setFromInputValue}
            token={fromToken}
            setToken={setFromToken}
          />

          {/* Swap Icon */}
          <div className="flex justify-center">
            <Button size="xs" color="gray" className="rounded-full p-2">
              <HiOutlineSwitchVertical size={20} />
            </Button>
          </div>

          {/* To Section */}
          <TokenInput
            label="To"
            value={toInputValue}
            setValue={setToInputValue}
            token={toToken}
            setToken={setToToken}
          />
        </Card>
        <GetItNow />
        <SwapAction />
      </section>
    </main>
  );
};

const SwapAction = () => {
  // check wallet connect by wagmi
  const { isConnected } = useAccount();

  const { fromToken, fromInputValue } = useSwap();

  if (!isConnected) {
    return (
      <SwapWrapper>
        <div className="flex justify-center">
          <ConnectButton />
        </div>
      </SwapWrapper>
    );
  }

  if (!fromToken || fromInputValue === 0) {
    return (
      <SwapWrapper>
        <Button size="lg" className="w-full" color="gray">
          Enter an amount
        </Button>
      </SwapWrapper>
    );
  }

  return (
    <SwapWrapper>
      <Button size="lg" className="w-full" color="success">
        Swap
      </Button>
    </SwapWrapper>
  );
};

const SwapWrapper = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <Card className="w-full bg-gray-800 text-white">
      {children}

      <div
        className="flex justify-between text-xs"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2">
          <AiOutlineReload className="cursor-pointer text-blue-500" />
          <span>1 CAKE</span>
          <AiOutlineSwap className="cursor-pointer text-blue-500" />
          <span> 0.00374904 BNB</span>
        </div>
        <div className="flex items-center gap-2">
          Fee 0.0005 BNB
          <AiOutlineCaretDown className="cursor-pointer" />
        </div>
      </div>
      {open && <FeeList />}
    </Card>
  );
};

const FeeList = () => {
  return (
    <div className="flex flex-col gap-2 text-xs">
      <div className="flex justify-between">
        <span className="text-gray-400">Minimum received</span>
        <span>266.1 CAKE</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-400">Fee saved</span>
        <span>0.66 CAKE (~$1.6)</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-400">Price Impact</span>
        <span>{"<0.01%"}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-400">Slippage Tolerance</span>
        <span>0.50%</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-400">Trading Fee</span>
        <span>0.0005 BNB</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-400">Trading Fee</span>
        <span>0.0005 BNB</span>
      </div>
    </div>
  );
};

const GetItNow = () => {
  return (
    <Card className="w-full bg-gray-800 text-white">
      <div className="flex items-center justify-between gap-2">
        <span className="flex gap-2">
          <AiOutlineExclamationCircle />
          <span className="text-xs">Need Crypto? Buy with the best price!</span>
        </span>
        <div className="flex justify-end">
          <Button size="xs" color={"green"} className="">
            Get it now
          </Button>
        </div>
      </div>
    </Card>
  );
};

const TokenInput = ({
  label = "From",
  value,
  setValue,
  token,
  setToken,
}: {
  label: string;
  value: number;
  setValue: (value: number) => void;
  token: IAsset;
  setToken: (token: IAsset) => void;
}) => {
  return (
    <div className="">
      {/* Token Selector */}
      <div className="mb-2 flex justify-between px-2 text-sm font-semibold">
        <div>{label}</div>
        {token && (
          <div className="flex items-center gap-2">
            <span className="text-white">
              <AiOutlineWallet />
            </span>
            <span className="">
              <WalletBalance />
            </span>
          </div>
        )}
      </div>
      <div className="flex w-full max-w-lg items-center justify-between rounded-xl border border-gray-500 px-3 py-2">
        <SelectAssetButton selectedToken={token} selectToken={setToken} />
        {/* Amount */}
        <div className="">
          <CurrencyInput
            id="input-example"
            name="input-name"
            className="mb-1 rounded-lg border-none bg-transparent px-2 py-1 text-end outline-transparent focus:outline-0 disabled:opacity-50"
            placeholder="0.00"
            defaultValue={value}
            decimalsLimit={2}
            onValueChange={(value, name, values) => {
              console.log(value, name, values);
              setValue(parseFloat(value));
            }}
            disabled={!token}
          />
          <div className="text-end text-xs text-gray-400">~647.83 USD</div>
        </div>
      </div>
    </div>
  );
};

const SelectAssetButton = ({
  selectedToken,
  selectToken,
}: {
  selectedToken: IAsset;
  selectToken: any;
}) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="">
      {selectedToken ? (
        <Button
          onClick={() => setOpenModal(!openModal)}
          size="sm"
          color={"transparent"}
          className="hover:bg-gray-700"
        >
          <div className="flex items-center gap-2">
            <img
              src={selectedToken.icon} // Thay bằng icon token của bạn
              alt={selectedToken.symbol}
              className="size-5"
            />
            <span className="font-semibold text-white">
              {selectedToken.symbol}
            </span>
            <span className="text-white">
              <AiOutlineCaretDown />
            </span>
          </div>
        </Button>
      ) : (
        <Button size={"sm"} color={"gray"} onClick={() => setOpenModal(true)}>
          Select a token
        </Button>
      )}
      {openModal && (
        <SelectAssetModal
          {...{ openModal, setOpenModal, selectToken, selectedToken }}
        />
      )}
    </div>
  );
};
