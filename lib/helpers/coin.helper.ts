import { IAsset } from "../models/asset.model";

const ETH: IAsset = {
  name: "Ethereum",
  symbol: "ETH",
  icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  address: "0x",
  chainId: 1,
  type: "native",
};

const BNB: IAsset = {
  name: "Binance Coin",
  symbol: "BNB",
  icon: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png",
  address: "0x",
  chainId: 56,
  type: "native",
};

const BNB_TESTNET: IAsset = {
  name: "Binance Coin (Testnet)",
  symbol: "TBNB",
  icon: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png",
  address: "0x",
  chainId: 97,
  type: "native",
};

const USDT: IAsset = {
  name: "Tether",
  symbol: "USDT",
  icon: "https://cryptologos.cc/logos/tether-usdt-logo.png",
  address: "0xdAC17F958D2ee523a2206206994597C13D831ec7", //address USDT
  chainId: 1,
  type: "ERC20",
};

const USDC: IAsset = {
  name: "USD Coin",
  symbol: "USDC",
  icon: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
  address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d", //address USDC
  chainId: 1,
  type: "ERC20",
};

export const coinsHelper: IAsset[] = [ETH, BNB, BNB_TESTNET, USDT, USDC];

export const getCoinsByChainId = (chainId: number) => {
  return coinsHelper.filter((coin) => coin.chainId === chainId);
};
