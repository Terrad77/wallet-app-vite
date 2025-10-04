import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { type AppData, type Transaction, CardBalance } from "../types";
import { walletService } from "../api/services/walletService";

interface WalletState {
  // State
  data: AppData | null;
  loading: boolean;
  error: string | null;

  // Actions
  fetchWalletData: () => Promise<void>;
  getTransactionById: (id: string) => Transaction | undefined;
  clearError: () => void;
}

export const useWalletStore = create<WalletState>()(
  devtools(
    (set, get) => ({
      // Initial state
      data: null,
      loading: false,
      error: null,

      // Fetch wallet data
      fetchWalletData: async () => {
        set({ loading: true, error: null });

        try {
          const data = await walletService.getWalletData();
          set({ data, loading: false });
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error occurred";

          set({ error: errorMessage, loading: false });
        }
      },

      // Get transaction by ID
      getTransactionById: (id: string) => {
        const { data } = get();
        return data?.transactions.find((t) => t.id === id);
      },

      // Clear error
      clearError: () => set({ error: null }),
    }),
    { name: "WalletStore" }
  )
);
