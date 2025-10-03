import { Transaction } from "../types";

interface TransactionDetailProps {
  transaction: Transaction | null;
  onClose: () => void;
}

const TransactionDetail: React.FC<TransactionDetailProps> = ({
  transaction,
  onClose,
}) => {
  if (!transaction) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="transaction-detail-title"
    >
      <div
        className="bg-white rounded-t-3xl w-full max-w-md p-6 animate-slide-up"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />

        <div className="text-center mb-6">
          <div
            className={`w-20 h-20 ${transaction.color} rounded-full flex items-center justify-center mx-auto mb-4`}
          >
            <i className={`fas ${transaction.icon} text-3xl`}></i>
          </div>
          <h3
            id="transaction-detail-title"
            className="text-2xl font-bold text-gray-900 mb-1"
          >
            {transaction.name}
          </h3>
          <p className="text-gray-500">{transaction.type}</p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 mb-6">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-500 mb-1">Amount</p>
            <p
              className={`text-4xl font-bold ${
                transaction.amount > 0 ? "text-green-600" : "text-gray-900"
              }`}
            >
              {transaction.amount > 0 ? "+" : ""}
              {transaction.amount.toFixed(2)} UAH
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between py-2">
              <span className="text-gray-500">
                <i className="fas fa-info-circle mr-2"></i>Status
              </span>
              <span
                className={`font-medium flex items-center gap-2 ${
                  transaction.status === "completed"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {transaction.status === "completed" ? (
                  <>
                    <i className="fas fa-check-circle"></i> Completed
                  </>
                ) : (
                  <>
                    <i className="fas fa-clock"></i> Pending
                  </>
                )}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500">
                <i className="fas fa-calendar mr-2"></i>Date & Time
              </span>
              <span className="font-medium text-gray-900">
                {transaction.date}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500">
                <i className="fas fa-hashtag mr-2"></i>Transaction ID
              </span>
              <span className="font-medium text-gray-900 font-mono text-sm">
                #{transaction.id}234567890
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50">
            <i className="fas fa-download mr-2"></i>Download
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700"
          >
            <i className="fas fa-times mr-2"></i>Close
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default TransactionDetail;
