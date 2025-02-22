export interface IAsset {
  name: string;
  symbol: string;
  icon: string;
  address: string;
  chainId: number;
  type: "native" | "ERC20";
}
