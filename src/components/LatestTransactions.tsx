import { Transaction } from "../types";

interface LatestTransactionsProps {
  transactions: Transaction[];
  onTransactionClick: (transaction: Transaction) => void;
}

const LatestTransactions: React.FC<LatestTransactionsProps> = ({
  transactions,
  onTransactionClick,
}) => {
  return (
    <section className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          <i className="fas fa-history mr-2"></i>Latest Transactions
        </h3>
        <button className="text-sm text-blue-600 font-medium">
          See All <i className="fas fa-chevron-right ml-1"></i>
        </button>
      </div>

      <div className="space-y-3">
        {transactions.map((transaction: Transaction) => (
          <button
            key={transaction.id}
            onClick={() => onTransactionClick(transaction)}
            className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors"
            aria-label={`View ${transaction.name} transaction details`}
          >
            <div
              className={`w-12 h-12 ${transaction.color} rounded-xl flex items-center justify-center flex-shrink-0`}
            >
              <i className={`fas ${transaction.icon} text-xl`}></i>
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-gray-900">{transaction.name}</p>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">{transaction.type}</p>
                {transaction.status === "pending" && (
                  <span className="flex items-center gap-1 text-xs text-yellow-600">
                    <i className="fas fa-clock"></i>
                    Pending
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              <p
                className={`font-bold ${
                  transaction.amount > 0 ? "text-green-600" : "text-gray-900"
                }`}
              >
                {transaction.amount > 0 ? "+" : ""}
                {transaction.amount.toFixed(2)} UAH
              </p>
              <p className="text-xs text-gray-400">{transaction.date}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default LatestTransactions;
