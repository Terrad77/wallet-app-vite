import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useWalletStore } from "./store";
import TransactionListScreen from "./screens/TransactionListScreen";
import TransactionDetailScreen from "./screens/TransactionDetailScreen";

export default function WalletApp() {
  const { data, loading, error, fetchWalletData } = useWalletStore();

  useEffect(() => {
    fetchWalletData();
  }, [fetchWalletData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-blue-600 bg-gray-50">
        <i className="fas fa-spinner fa-spin mr-2"></i>
        Loading wallet data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-8 text-center text-red-600 bg-gray-50">
        <i className="fas fa-exclamation-triangle mr-2"></i>
        Error loading data: {error}
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <header className="bg-white border-b sticky top-0 z-10">
                  <div className="max-w-md mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                          <i className="fas fa-wallet mr-2"></i>
                          Wallet
                        </h1>
                        <p className="text-sm text-gray-500">
                          Manage your finances
                        </p>
                      </div>
                      <button className="p-2 hover:bg-gray-100 rounded-full">
                        <i className="fas fa-user text-gray-600 text-xl"></i>
                      </button>
                    </div>
                  </div>
                </header>
                <TransactionListScreen />
              </>
            }
          />

          <Route
            path="/transaction/:id"
            element={<TransactionDetailScreen />}
          />
        </Routes>
      </div>
    </Router>
  );
}
