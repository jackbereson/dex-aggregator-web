"use client";

import { Button, Label, Modal, TextInput } from "flowbite-react";

export function SelectAssetModal({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}) {
  return (
    <>
      <Modal
        size={"lg"}
        dismissible
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header className="py-3">
          <div className="flex items-center gap-2">
            <img
              src="https://cryptologos.cc/logos/binance-coin-bnb-logo.png" // Thay bằng icon token của bạn
              alt="BNB"
              className="size-5"
            />
            <span className="font-semibold text-white">BNB</span>
          </div>
        </Modal.Header>
        <Modal.Body>
          <TextInput
            placeholder="Search by name or Paste address"
            className="mb-5"
          />
          <div>
            <Label>Select token</Label>
            <div className="mb-5 flex gap-2">
              {/* BNB */}
              <div className="flex cursor-pointer items-center gap-2 rounded-full bg-gray-800 p-1 px-2">
                <img
                  src="https://cryptologos.cc/logos/binance-coin-bnb-logo.png" // Thay bằng icon token của bạn
                  alt="BNB"
                  className="size-5"
                />
                <span className="font-semibold text-white">BNB</span>
              </div>

              {/* USDT */}
              <div className="flex cursor-pointer items-center gap-2 rounded-full bg-gray-800 p-1 px-2">
                <img
                  src="https://cryptologos.cc/logos/tether-usdt-logo.png" // Thay bằng icon token của bạn
                  alt="USDT"
                  className="size-5"
                />
                <span className="font-semibold text-white">USDT</span>
              </div>

              {/* USDC */}
              <div className="flex cursor-pointer items-center gap-2 rounded-full bg-gray-800 p-1 px-2">
                <img
                  src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png" // Thay bằng icon token của bạn
                  alt="USDC"
                  className="size-5"
                />
                <span className="font-semibold text-white">USDC</span>
              </div>

              {/* ETH */}
              <div className="flex cursor-pointer items-center gap-2 rounded-full bg-gray-800 p-1 px-2">
                <img
                  src="https://cryptologos.cc/logos/ethereum-eth-logo.png" // Thay bằng icon token của bạn
                  alt="ETH"
                  className="size-5"
                />
                <span className="font-semibold text-white">ETH</span>
              </div>
            </div>
            <div className="">
              {/* BNB */}
              <div className="flex cursor-pointer items-center justify-between py-2 text-white">
                <div className="flex items-center gap-2">
                  <img
                    src="https://cryptologos.cc/logos/binance-coin-bnb-logo.png" // Thay bằng icon token của bạn
                    alt="BNB"
                    className="size-9"
                  />
                  <div>
                    <div className="font-semibold ">BNB</div>
                    <div className="opacity-50">Binance Coin</div>
                  </div>
                </div>
                <div>0 BNB</div>
              </div>

              {/* USDT */}
              <div className="flex cursor-pointer items-center justify-between py-2 text-white">
                <div className="flex items-center gap-2">
                  <img
                    src="https://cryptologos.cc/logos/tether-usdt-logo.png" // Thay bằng icon token của bạn
                    alt="USDT"
                    className="size-9"
                  />
                  <div>
                    <div className="font-semibold ">USDT</div>
                    <div className="opacity-50">Tether</div>
                  </div>
                </div>
                <div>0 USDT</div>
              </div>

              {/* USDC */}
              <div className="flex cursor-pointer items-center justify-between py-2 text-white">
                <div className="flex items-center gap-2">
                  <img
                    src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png" // Thay bằng icon token của bạn
                    alt="USDC"
                    className="size-9"
                  />
                  <div>
                    <div className="font-semibold ">USDC</div>
                    <div className="opacity-50">USD Coin</div>
                  </div>
                </div>
                <div>0 USDC</div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-center py-2">
          <Button onClick={() => setOpenModal(false)} size={"xs"}>
            Manage tokens
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
