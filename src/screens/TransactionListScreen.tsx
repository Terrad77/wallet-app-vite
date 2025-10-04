import { Link } from "react-router-dom";
import type { AppData, Transaction } from "../types";
import {
  calculateDailyPoints,
  getTotalPoints,
  formatPoints,
} from "../utils/dailyPointsCalculator";

interface TransactionListScreenProps {
  data: AppData;
}

const TransactionListScreen: React.FC<TransactionListScreenProps> = ({
  data,
}) => {
  const { cardBalance, noPaymentDue, transactions, dailyPoints } = data;

  // calculate Daily Points
  const dailyPointsData = calculateDailyPoints(dailyPoints.seasonStartDate);
  const totalPoints = getTotalPoints(dailyPointsData);
  const maxPoints = Math.max(...dailyPointsData.map((d) => d.points));

  // format date for transactions
  const formatTransactionDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays <= 7) {
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      return days[date.getDay()];
    }

    return date.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "2-digit",
    });
  };

  // format amount for transaction list
  const formatAmount = (amount: number, type: string): string => {
    if (type === "Credit") {
      return `+$${Math.abs(amount).toFixed(2)}`;
    }
    return `-$${Math.abs(amount).toFixed(2)}`;
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6 pb-24">
      {/* Card Balance Block */}
      <section className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-1">Card Balance</p>
          <h2 className="text-4xl font-bold text-gray-900">
            ${cardBalance.total.toFixed(2)}
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            ${cardBalance.currentBalance.toFixed(2)} / $
            {cardBalance.maximumCardLimit.toFixed(2)} Available
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Card Balance:</span>
            <span className="font-semibold text-gray-900">
              ${cardBalance.currentBalance.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Available Limit:</span>
            <span className="font-semibold text-gray-900">
              ${cardBalance.availableLimit.toFixed(2)}
            </span>
          </div>
        </div>
      </section>

      {/* No Payment Due Block */}
      {noPaymentDue.isPaid && (
        <section className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
            <i className="fas fa-check text-white text-lg"></i>
          </div>
          <div>
            <p className="text-sm font-semibold text-green-900">
              No Payment Due
            </p>
            <p className="text-xs text-green-700">{noPaymentDue.message}</p>
          </div>
        </section>
      )}

      {/* Daily Points Block */}
      <section className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              <i className="fas fa-chart-bar mr-2"></i>Daily Points
            </h3>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {formatPoints(totalPoints)}
            </p>
          </div>
          <i className="fas fa-arrow-trend-up text-green-500"></i>
        </div>

        <div className="flex items-end justify-between h-32 gap-2">
          {dailyPointsData.map((dayData, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full bg-gray-100 rounded-t-lg relative"
                style={{ height: "100%" }}
              >
                <div
                  className="absolute bottom-0 w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all hover:from-blue-600 hover:to-blue-500"
                  style={{ height: `${(dayData.points / maxPoints) * 100}%` }}
                  title={`${dayData.points} points`}
                />
              </div>
              <span className="text-xs text-gray-500 font-medium">
                {dayData.day}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Transactions Block */}
      <section className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            <i className="fas fa-history mr-2"></i>Latest Transactions
          </h3>
        </div>

        <div className="space-y-3">
          {transactions.map((transaction: Transaction) => (
            <Link
              key={transaction.id}
              to={`/transaction/${transaction.id}`}
              className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <div
                className={`w-12 h-12 ${transaction.color} rounded-xl flex items-center justify-center flex-shrink-0`}
              >
                <i className={`fas ${transaction.icon} text-xl`}></i>
              </div>

              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-900">
                  {transaction.title}
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-500">
                    {transaction.status === "Pending" && "Pending - "}
                    {transaction.cardNumberUsed &&
                      `Card Number Used ${transaction.cardNumberUsed} - `}
                    {transaction.authorizedUser &&
                      `${transaction.authorizedUser} - `}
                    {formatTransactionDate(transaction.date)}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p
                  className={`font-bold ${
                    transaction.type === "Credit"
                      ? "text-green-600"
                      : "text-gray-900"
                  }`}
                >
                  {formatAmount(transaction.amount, transaction.type)}
                </p>
                <p className="text-xs text-gray-400">
                  {transaction.status === "Pending" && (
                    <span className="text-yellow-600">
                      <i className="fas fa-clock mr-1"></i>3%
                    </span>
                  )}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TransactionListScreen;
