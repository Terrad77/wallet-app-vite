import { apiClient } from "../clients";
import type { AppData } from "../../types";

export const walletService = {
  /**
   * Get all wallet data
   */
  async getWalletData(): Promise<AppData> {
    return apiClient.get<AppData>("/mock.json");
  },

  /**
   * Get card balance (if separate endpoint exists)
   */
  async getCardBalance() {
    const data = await this.getWalletData();
    return data.cardBalance;
  },

  /**
   * Get transactions (if separate endpoint exists)
   */
  async getTransactions() {
    const data = await this.getWalletData();
    return data.transactions;
  },
};
