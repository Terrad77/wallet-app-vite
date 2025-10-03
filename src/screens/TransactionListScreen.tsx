import React, { useState } from "react";
import type { AppData, Transaction } from "../types/models";
import {
  getTransactionVisuals,
  getStatusTextAndIcon,
} from "../utils/transactionUtils";
import { Link } from "react-router-dom"; // Используем Link для роутинга

// Переносим логику UI в отдельный компонент
interface TransactionListScreenProps {
  data: AppData;
}

const TransactionListScreen: React.FC<TransactionListScreenProps> = ({
  data,
}) => {
  const { cardBalance, dailyPoints, transactions, noPaymentDue } = data;

  // Упрощенные моки для графика (Вы можете реализовать более сложный расчет Daily Points позже)
  const dailyProfile = [
    { day: "Mon", amount: 45 },
    { day: "Tue", amount: 120 },
    { day: "Wed", amount: 85 },
    { day: "Thu", amount: 160 },
    { day: "Fri", amount: 95 },
    { day: "Sat", amount: 180 },
    { day: "Sun", amount: 70 },
  ];
  const maxDaily = Math.max(...dailyProfile.map((d) => d.amount));

  // Используем реальные данные
  const cardLast4 = cardBalance.cardNumber.split(" ")[1];
  const cardColor = "bg-indigo-600"; // Используем один цвет для простоты

  // Сортировка транзакций по дате (best practice)
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <div className="max-w-md mx-auto px-4 py-6 pb-24">
        {/* Card Balance Block */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-start mb-6">
            {/* ... (Кнопка Add Money) */}
            <div>
              <p className="text-sm text-gray-500 mb-1">
                <i className="fas fa-chart-line mr-1"></i>Total Balance
              </p>
              <h2 className="text-4xl font-bold text-gray-900">
                ${cardBalance.balance.toFixed(2)}
              </h2>
            </div>
          </div>

          {/* Card Info */}
          <div className={`${cardColor} rounded-xl p-4 text-white`}>
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-xs opacity-80 mb-1">
                  {cardBalance.cardName}
                </p>
                <p className="text-sm font-mono">•••• {cardLast4}</p>
              </div>
              <i className="fas fa-credit-card text-xl opacity-80"></i>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs opacity-80">Balance</p>
                <p className="text-xl font-bold">
                  ${cardBalance.balance.toFixed(2)}
                </p>
              </div>
              <p className="text-xs opacity-60">Exp: 12/26</p>
            </div>
          </div>
        </div>

        {/* No Payment Due Block (если нужно) */}
        {noPaymentDue && (
          <div className="bg-green-50 text-green-700 p-4 rounded-xl mb-6 flex items-center gap-3">
            <i className="fas fa-check-circle text-xl"></i>
            <p className="text-sm font-medium">
              Нет просроченных платежей. Вы в зоне комфорта.
            </p>
          </div>
        )}

        {/* Daily Points Block */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            <i className="fas fa-star mr-2 text-yellow-500"></i>Daily Points
          </h3>
          <p className="text-3xl font-bold text-gray-900 mb-4">
            {dailyPoints.currentPoints} Pts
          </p>

          {/* График и его логика остаются из Вашего кода */}
          <div className="flex items-end justify-between h-32 gap-2">
            {/* ... Код графика (можно оставить Ваши моки для визуала) ... */}
            {dailyProfile.map((day, idx) => (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div
                  className="w-full bg-gray-100 rounded-t-lg relative"
                  style={{ height: "100%" }}
                >
                  <div
                    className="absolute bottom-0 w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all"
                    style={{ height: `${(day.amount / maxDaily) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 font-medium">
                  {day.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Transactions Block */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              <i className="fas fa-history mr-2"></i>Latest Transactions
            </h3>
            <Link
              to="/transactions"
              className="text-sm text-blue-600 font-medium"
            >
              See All <i className="fas fa-chevron-right ml-1"></i>
            </Link>
          </div>

          <div className="space-y-3">
            {sortedTransactions.slice(0, 5).map((transaction) => {
              const { icon, color } = getTransactionVisuals(transaction);
              const status = getStatusTextAndIcon(transaction.status);

              return (
                <Link
                  key={transaction.id}
                  to={`/transaction/${transaction.id}`} // Используем роутинг вместо модального окна
                  className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <div
                    className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center flex-shrink-0 text-white`}
                  >
                    <i className={`fas ${icon} text-xl`}></i>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-900">
                      {transaction.title}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-500">
                        {transaction.transactionName}
                      </p>
                      {transaction.status !== "Success" && (
                        <span
                          className={`flex items-center gap-1 text-xs ${status.color}`}
                        >
                          <i className={`fas ${status.icon}`}></i>
                          {status.text}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-bold ${
                        transaction.amount > 0
                          ? "text-green-600"
                          : "text-gray-900"
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : ""}
                      {transaction.amount.toFixed(2)} {transaction.currency}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionListScreen;
