import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAppData } from "./hooks/useAppData";
import TransactionListScreen from "./screens/TransactionListScreen";
import TransactionDetailScreen from "./screens/TransactionDetailScreen";

const WalletApp: React.FC = () => {
  const { data, loading, error } = useAppData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-blue-600 bg-gray-50">
        <i className="fas fa-spinner fa-spin mr-2"></i>Loading wallet data...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen p-8 text-center text-red-600 bg-gray-50">
        <i className="fas fa-exclamation-triangle mr-2"></i>Error loading data:{" "}
        {error || "Data not found"}
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Header - Only on TransactionList screen */}
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
                          <i className="fas fa-wallet mr-2"></i>Wallet
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
                <TransactionListScreen data={data} />
              </>
            }
          />

          <Route
            path="/transaction/:id"
            element={
              <TransactionDetailScreen transactions={data.transactions} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default WalletApp;
