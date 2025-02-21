export enum CurrencySymbols {
  USDT = "USDT",
}

export const money = (value?: number, currency?: string) =>
  new Intl.NumberFormat("en-US", { currency: "USD" }).format(value || 0) +
  ` ${currency}`;
