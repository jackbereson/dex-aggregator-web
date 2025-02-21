import moment from "moment-timezone";
import "moment/locale/vi";

import appConfig from "./appConfig";

export function formatNumber(
  number: number | bigint | string | undefined,
  maximumFractionDigits: number = 2,
): string {
  if (!number) return "0";

  return new Intl.NumberFormat(appConfig.locale, {
    maximumFractionDigits,

    // @ts-ignore
    roundingMode: "floor",
  }).format(parseFloat(number as string));
}

export const toAbsoluteUrl = (pathname: string | undefined) =>
  pathname ? process.env.PUBLIC_URL + pathname : "";

// function roundDownSignificantDigits(number: number, decimals: number) {
//     let significantDigits =
//         parseInt(number.toExponential().split('e-')[1]) || 0;
//     let decimalsUpdated = (decimals || 0) + significantDigits - 1;
//     decimals = Math.min(decimalsUpdated, number.toString().length);

//     return Math.floor(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
// }

export function formatCurrency(
  value: number | bigint | string,
  currency = "",
  hideCurrency = false,
  maximumFractionDigits = 2,
): string {
  const _currency = !hideCurrency ? ` ${currency}` : "";
  const isVIC = currency.includes("VIC");

  return formatNumber(value, isVIC ? 0 : maximumFractionDigits) + _currency;
}

export function currencyFormat(num: any, ext: number = 0) {
  return num !== null
    ? Number(num)
        .toFixed(ext)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    : 0;
}

type Type = "Date" | "Time";

export const showDateTime = (date: any, type?: Type, timezone?: string) => {
  let dateString;

  if (timezone) {
    moment.tz(timezone); // innital local time zine
  }

  switch (type) {
    case "Date":
      dateString = moment(date).format(appConfig.dateFormat);
      break;
    case "Time":
      dateString = moment(date).format(appConfig.timeFormat);
      break;
    default:
      dateString = moment(date).format(appConfig.fullDatetime);
      break;
  }

  return dateString;
};

export function showTime(timestamp: any) {
  var days = moment.utc(timestamp).fromNow();

  return days;
}

export const calculateLeftTime = (timestamp: any) => {
  moment.locale("vi");
  var days = moment.utc(timestamp).add(5, "days").fromNow();

  return days;
};

export function ellipseAddress(
  address: string = "",
  width: number = 10,
): string {
  return `${address.slice(0, width)}...${address.slice(-width)}`;
}

export function capitalizeTxt(txt: any) {
  return txt.charAt(0).toUpperCase() + txt.slice(1); //or if you want lowercase the rest txt.slice(1).toLowerCase();
}

export function toFixed(x: any) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split("e-")[1]);

    if (e) {
      x *= Math.pow(10, e - 1);
      x = "0." + new Array(e).join("0") + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split("+")[1]);

    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join("0");
    }
  }

  return x;
}

// export function safeFormatUnits(
//     amount: string | undefined | BigNumberish,
//     decimalCount = 18,
// ) {
//     return formatUnits(amount || 0, decimalCount);
// }

// export const parseEther = (value: string) =>
//     value === '0' ? value : Web3.utils.fromWei(value, 'ether');

export const convertBufferToString = (data: Buffer) => {
  const bufferData = Buffer.from(data);
  const value = bufferData.toString("hex");

  return value;
};

export const convertBufferToInt = (data: Buffer) => {
  const bufferData = Buffer.from(data);
  const value = bufferData.readIntLE(0, bufferData.length);

  return value;
};
