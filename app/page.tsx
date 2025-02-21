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

export default function Home() {
  const [fromToken, setFromToken] = useState("BNB");
  const [toToken, setToToken] = useState("USDT");
  const [fromInputValue, setFromInputValue] = useState<number>(0);
  const [toInputValue, setToInputValue] = useState<number>(0);

  return (
    <main className="flex min-h-screen items-center justify-center dark:bg-gray-900">
      <section className="flex flex-col gap-4">
        <Card className="w-full max-w-md bg-gray-800 text-white">
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
}

const SwapAction = () => {
  return (
    <Card className="w-full max-w-md bg-gray-800 text-white">
      <Button size="lg" className="w-full" color="success">
        Swap
      </Button>
      <div className="flex justify-between text-xs">
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
    </Card>
  );
};

const GetItNow = () => {
  return (
    <Card className="w-full max-w-md bg-gray-800 text-white">
      <div className="flex items-center gap-2">
        <AiOutlineExclamationCircle />
        <span className="text-xs">Need Crypto? Buy with the best price!</span>
        <div>
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
  token: string;
  setToken: (token: string) => void;
}) => {
  console.log("TokenInput -> token", value);

  return (
    <div className="">
      {/* Token Selector */}
      <div className="mb-2 flex justify-between px-2 text-sm font-semibold">
        <div>{label}</div>
        <div className="flex items-center gap-2">
          <span className="text-white">
            <AiOutlineWallet />
          </span>
          <span className="">0</span>
        </div>
      </div>
      <div className="flex w-full max-w-lg items-center justify-between rounded-xl border border-gray-500 px-3 py-2">
        <SelectAssetButton />
        {/* Amount */}
        <div className="">
          <CurrencyInput
            id="input-example"
            name="input-name"
            className="mb-1 rounded-lg border-none bg-transparent px-2 py-1 text-end outline-transparent focus:outline-0"
            placeholder="0.00"
            defaultValue={1000}
            decimalsLimit={2}
            onValueChange={(value, name, values) =>
              console.log(value, name, values)
            }
          />
          <div className="text-end text-xs text-gray-400">~647.83 USD</div>
        </div>
      </div>
      {/* USD Value */}
    </div>
  );
};

const SelectAssetButton = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="">
      <Button
        onClick={() => setOpenModal(!openModal)}
        size="sm"
        color={"transparent"}
        className="hover:bg-gray-700"
      >
        <div className="flex items-center gap-2">
          <img
            src="https://cryptologos.cc/logos/binance-coin-bnb-logo.png" // Thay bằng icon token của bạn
            alt="BNB"
            className="size-5"
          />
          <span className="font-semibold text-white">BNB</span>
          <span className="text-white">
            <AiOutlineCaretDown />
          </span>
        </div>
      </Button>
      {openModal && <SelectAssetModal {...{ openModal, setOpenModal }} />}
    </div>
  );
};
