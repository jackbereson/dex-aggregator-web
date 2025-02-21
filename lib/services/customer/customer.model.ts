import { BaseModel } from "../../models/baseModel.model";

export enum CustomerWalletType {
  METAMASK = "METAMASK",
}

export enum CustomerStatus {
  ACTIVE = "ACTIVE",
  DEACTIVATED = "DEACTIVATED", // Corrected spelling of DEACTIVED to DEACTIVATED
}

export enum TypeCheckPoint {
  CHECK_OUT = "CHECK_OUT",
  CHECK_IN = "CHECK_IN",
  CHANGE_FAN = "CHANGE_FAN",
  CHANGE_TAB = "CHANGE_TAB",
  USE_ITEM = "USE_ITEM",
  CHANGE_EARTH_STATE = "CHANGE_EARTH_STATE",
  LAST_CLICK = "LAST_CLICK",
}
export interface Customer extends BaseModel {
  status?: CustomerStatus;
  telegramId?: string; //chatId
  username?: string;
  firstName?: string;
  lastName?: string;
  activeAt?: Date;
  avatar?: string;
  role?: string;
  referenceId?: string;
  referralCode?: string;
  referralTotal?: number;
  referralUrl?: string;
  walletAddress?: string;
  walletSolanaAddress?: string;
  unclaimedReferrals?: number;
  isValid?: boolean;
}

export interface CheckPointInput {
  type: TypeCheckPoint;
  click: number;
  point: number;
  currentEnergy: number;
  earthStateId: string;
  earthTemperature: number;
}

const setStorageItem = (key: string, value: string, temp = false) => {
  if (typeof window === "undefined" || !window.localStorage) return;
  if (temp) {
    sessionStorage.setItem(key, value);
  } else {
    localStorage.setItem(key, value);
  }
};

const clearStorageItem = (key: string) => {
  if (typeof window === "undefined" || !window.localStorage) return;
  localStorage.removeItem(key);
  sessionStorage.removeItem(key);
};

const getStorageItem = (key: string) => {
  if (typeof window === "undefined" || !window.localStorage) return "";

  return localStorage.getItem(key) || sessionStorage.getItem(key) || "";
};

export const setCustomerToken = (token: string, temp = false) => {
  setStorageItem("x-token", token, temp);
};

export const setPreventConnectWalletModal = (isOpen: string, temp = false) => {
  setStorageItem("prevent-connect-wallet-modal", isOpen, temp);
};
export const setPreventAnnouncementModal = (isOpen: string, temp = false) => {
  setStorageItem("prevent-announcement-airdrop-modal", isOpen, temp);
};

export const clearCustomerToken = () => {
  clearStorageItem("x-token");
};

export const getCustomerToken = () => {
  return getStorageItem("x-token");
};

export const setUserToken = (token: string, temp = false) => {
  setStorageItem("user-token", token, temp);
};

export const clearUserToken = () => {
  clearStorageItem("user-token");
};

export const getUserToken = () => {
  return getStorageItem("user-token");
};

export const setReferralCode = (token: string, temp = false) => {
  setStorageItem("referral", token, temp);
};

export const clearReferralCode = () => {
  clearStorageItem("referral");
};

export const getReferralCode = () => {
  return getStorageItem("referral");
};

export const getPreventConnectWalletModal = () => {
  return getStorageItem("prevent-connect-wallet-modal");
};

export const getPreventAnnouncementModal = () => {
  return getStorageItem("prevent-announcement-airdrop-modal");
};

export const setSignToken = (token: string, temp = false) => {
  setStorageItem("sigtoken", token, temp);
};

export const clearSignToken = () => {
  clearStorageItem("sigtoken");
};

export const getSignToken = () => {
  return getStorageItem("sigtoken");
};

export const setTelegramId = (telegramId: string, temp = false) => {
  setStorageItem("id", telegramId, temp);
};

export const clearTelegramId = () => {
  clearStorageItem("id");
};

export const getTelegramId = () => {
  return getStorageItem("id");
};
