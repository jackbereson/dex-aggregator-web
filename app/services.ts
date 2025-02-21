// services/apiService.ts
import axios from "axios";

const API_KEY = "6a9a81a5-375c-4158-bf36-acff783e7362"; // Thay bằng API Key của bạn
const BASE_URL = "";

/**
 * Lấy tỷ giá giữa hai token
 * @param {string} buyToken Địa chỉ token muốn mua
 * @param {string} sellToken Địa chỉ token muốn bán
 * @param {number} sellAmount Số lượng token bán (theo đơn vị smallest unit)
 * @returns {Promise<number>} Giá quy đổi
 */
export const getExchangeRate = async (
  buyToken: string,
  sellToken: string,
  sellAmount: number,
  taker: string,
): Promise<number> => {
  try {
    const response = await axios.get("https://api.0x.org/swap/permit2/quote", {
      params: {
        chainId: 56,
        buyToken,
        sellToken,
        sellAmount,
        taker,
      },
      headers: {
        "0x-api-key": API_KEY,
        "0x-version": "v2",
      },
    });
    return response.data.price;
  } catch (error) {
    console.error("Lỗi khi lấy tỷ giá:", error);
    return 0;
  }
};
