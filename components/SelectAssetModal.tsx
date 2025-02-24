"use client";

import { Button, Label, Modal, TextInput } from "flowbite-react";
import { IAsset } from "../lib/models/asset.model";
import { useTokens } from "../providers/TokenProvider";

export function SelectAssetModal({
  openModal,
  setOpenModal,
  selectedToken,
  selectToken,
}: {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  selectedToken: IAsset;
  selectToken: (token: IAsset) => void;
}) {
  const { tokens, latestUsedTokens } = useTokens();

  return (
    <Modal
      size={"lg"}
      dismissible
      show={openModal}
      onClose={() => setOpenModal(false)}
    >
      <Modal.Header className="py-3">
        {selectedToken ? (
          <div className="flex items-center gap-2">
            <img
              src="https://cryptologos.cc/logos/binance-coin-bnb-logo.png" // Thay bằng icon token của bạn
              alt="BNB"
              className="size-5"
            />
            <span className="font-semibold text-white">BNB</span>
          </div>
        ) : (
          <>Select token</>
        )}
      </Modal.Header>
      <Modal.Body>
        <TextInput
          placeholder="Search by name or Paste address"
          className="mb-5"
        />
        <div>
          <Label>Select token</Label>
          <div className="mb-5 flex gap-2">
            {latestUsedTokens?.map((coin, k) => (
              <div
                key={k}
                className="flex cursor-pointer items-center gap-2 rounded-full bg-gray-800 p-1 px-2"
                onClick={() => {
                  selectToken(coin);
                  setOpenModal(false);
                }}
              >
                <img
                  src={coin.icon} // Thay bằng icon token của bạn
                  alt={coin.symbol}
                  className="size-5"
                />
                <span className="font-semibold text-white">{coin.symbol}</span>
              </div>
            ))}
          </div>
          <div className="">
            {tokens?.map((coin, k) => (
              <div
                key={k}
                className="flex cursor-pointer items-center justify-between py-2 text-white"
                onClick={() => {
                  selectToken(coin);
                  setOpenModal(false);
                }}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={coin.icon} // Thay bằng icon token của bạn
                    alt={coin.symbol}
                    className="size-9"
                  />
                  <div>
                    <div className="font-semibold ">{coin.symbol}</div>
                    <div className="opacity-50">{coin.name}</div>
                  </div>
                </div>
                <div>0 BNB</div>
              </div>
            ))}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-center py-2">
        <Button onClick={() => setOpenModal(false)} size={"xs"}>
          Manage tokens
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
