import ObjectID from "bson-objectid";

export const parseDayNumToDayStr = (param: string) => {
  const days = [
    { name: "Mon", value: "2" },
    { name: "Tue", value: "3" },
    { name: "Wed", value: "4" },
    { name: "Thu", value: "5" },
    { name: "Fri", value: "6" },
    { name: "Sat", value: "7" },
    { name: "Sun", value: "8" },
  ];

  return days.find((day) => day.value === param)?.name;
};

export const convertObjectNullToEmpty = (params: any) =>
  JSON.parse(JSON.stringify(params).replace(/\:null/gi, ':""'));

export const TIMEZONE_CODE: string = "America/Toronto";
export const DELAY_TIME = 1500;
export const LENGTH_ITEM_PER_PAGE = 10;
export const USD_ALLOWANCE_ETHER = 1000000000 * 10 ** 18;
export const USD_ALLOWANCE = 1000000000;

export const parseJSON = (json: any) => {
  try {
    const obj = JSON.parse(json);

    return obj;
  } catch {
    return {};
  }
};

export const parseArray = (array: any) => {
  if (Array.isArray(array) && array.every((item) => typeof item === "string")) {
    return array;
  }

  return [];
};

const colors = [
  "pink",
  "red",
  "orange",
  "amber",
  "blue",
  "green",
  "teal",
  "purple",
  "rose",
];

export const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const getColor = () => colors[random(0, colors.length - 1)];

export const formatDate = "MM-DD-YYYY";
export const formatTime = "HH:MM";

export const formatFullTime = "MM-DD-YYYY - HH:MM";

export const formatFullDayTime = "ddd - DD/MM/YYYY - HH:MM";

export const truncateAddress = (address: string) => {
  if (!address) return "No Account";
  const match = address.match(
    /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/,
  );

  if (!match) return address;

  return `${match[1]}…${match[2]}`;
};

export const toHex = (num: Number) => {
  return "0x" + num.toString(16);
};

export const ALLOWANCE_NUMBER = 999999999;
export const ALLOWANCE_ETHER = 9.99999999e26;

export const calculateHoursSinceCreation = (hexId: string) => {
  const objectId = new ObjectID(hexId);

  const timestamp = objectId.getTimestamp().getTime() / 1000;
  const currentTime = Date.now() / 1000;
  const timeDifferenceInSeconds = currentTime - timestamp;

  if (timeDifferenceInSeconds < 60) {
    return `${Math.floor(timeDifferenceInSeconds)} secs`;
  } else if (timeDifferenceInSeconds < 3600) {
    return `${Math.floor(timeDifferenceInSeconds / 60)} mins`;
  } else {
    const hoursPassed = Math.floor(timeDifferenceInSeconds / 3600);

    return `${hoursPassed} hours`;
  }
};
