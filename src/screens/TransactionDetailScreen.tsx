import { useParams, useNavigate } from "react-router-dom";
import { type Transaction } from "../types";

interface TransactionDetailScreenProps {
  transactions: Transaction[];
}

const TransactionDetailScreen: React.FC<TransactionDetailScreenProps> = ({
  transactions,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const transaction = transactions.find((t) => t.id === id);

  if (!transaction) {
    return (
      <div className="max-w-md mx-auto p-8 text-center text-red-600">
        <h2 className="text-xl font-bold">Transaction not found</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-blue-600 hover:underline"
        >
          <i className="fas fa-arrow-left mr-2"></i>Back to Home
        </button>
      </div>
    );
  }

  // Форматирование даты
  const formattedDate = new Date(transaction.date).toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Форматирование суммы
  const displayAmount =
    transaction.type === "Credit"
      ? `+$${Math.abs(transaction.amount).toFixed(2)}`
      : `-$${Math.abs(transaction.amount).toFixed(2)}`;

  const amountColor =
    transaction.type === "Credit" ? "text-green-600" : "text-gray-900";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-lg">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mb-6 p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Go back"
        >
          <i className="fas fa-arrow-left text-xl"></i>
        </button>

        {/* Transaction Icon and Title */}
        <div className="text-center mb-6">
          <div
            className={`w-20 h-20 ${transaction.color} rounded-full flex items-center justify-center mx-auto mb-4`}
          >
            <i className={`fas ${transaction.icon} text-3xl`}></i>
          </div>
          <h3 className="text-3xl font-bold ${amountColor} mb-2">
            {displayAmount}
          </h3>
          <p className="text-gray-500 text-sm">{transaction.title}</p>
          <p className="text-gray-400 text-xs mt-1">{formattedDate}</p>
        </div>

        {/* Transaction Details */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-6">
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-500">
                <i className="fas fa-info-circle mr-2"></i>Status
              </span>
              <span
                className={`font-medium ${
                  transaction.status === "Success"
                    ? "text-green-600"
                    : transaction.status === "Pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {transaction.status === "Success" && "Approved"}
                {transaction.status === "Pending" && (
                  <>
                    <i className="fas fa-clock mr-1"></i>Pending
                  </>
                )}
                {transaction.status === "Failed" && (
                  <>
                    <i className="fas fa-times-circle mr-1"></i>Failed
                  </>
                )}
              </span>
            </div>

            {transaction.cardNumberUsed && (
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-500">
                  <i className="fas fa-credit-card mr-2"></i>Card Used
                </span>
                <span className="font-medium text-gray-900">
                  {transaction.cardNumberUsed}
                </span>
              </div>
            )}

            {transaction.authorizedUser && (
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-500">
                  <i className="fas fa-user mr-2"></i>Authorized User
                </span>
                <span className="font-medium text-gray-900">
                  {transaction.authorizedUser}
                </span>
              </div>
            )}

            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-500">
                <i className="fas fa-file-alt mr-2"></i>Description
              </span>
              <span className="font-medium text-gray-900 text-right">
                {transaction.transactionDescription}
              </span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-gray-500">
                <i className="fas fa-receipt mr-2"></i>Total
              </span>
              <span className={`font-bold ${amountColor}`}>
                {displayAmount}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => navigate("/")}
          className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
        >
          <i className="fas fa-times mr-2"></i>Close
        </button>
      </div>
    </div>
  );
};

export default TransactionDetailScreen;
