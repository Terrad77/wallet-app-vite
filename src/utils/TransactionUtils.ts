// src/utils/transactionUtils.ts
import type { Transaction, TransactionStatus } from "../types/models";

interface TransactionVisuals {
  icon: string;
  color: string;
}

export const getTransactionVisuals = (
  transaction: Transaction
): TransactionVisuals => {
  const { type, title } = transaction;
  let icon = "fa-question";
  let color = "bg-gray-400 text-white";

  // Логика для иконки
  if (type === "Payment" || type === "Withdrawal") {
    if (title.includes("Apple")) icon = "fa-apple-whole";
    else if (title.includes("Gym")) icon = "fa-dumbbell";
    else if (title.includes("Amazon")) icon = "fa-truck-fast";
    else if (title.includes("Starbucks")) icon = "fa-mug-saucer";
    else icon = "fa-arrow-down";
  } else if (type === "Transfer") {
    icon = "fa-exchange-alt";
  } else if (type === "Top-up") {
    icon = "fa-arrow-up";
  }

  // Логика для цвета
  if (type === "Top-up") {
    color = "bg-green-100 text-green-700";
  } else if (transaction.amount < 0) {
    color = "bg-red-100 text-red-700";
  } else {
    color = "bg-blue-100 text-blue-700";
  }

  // Особый стиль для Pending (согласно ТЗ)
  if (transaction.status === "Pending") {
    color = "bg-yellow-100 text-yellow-700";
  }

  return { icon, color };
};

export const getStatusTextAndIcon = (status: TransactionStatus) => {
  switch (status) {
    case "Success":
      return {
        text: "Completed",
        icon: "fa-check-circle",
        color: "text-green-600",
      };
    case "Pending":
      return { text: "Pending", icon: "fa-clock", color: "text-yellow-600" };
    case "Failed":
      return { text: "Failed", icon: "fa-times-circle", color: "text-red-600" };
    default:
      return {
        text: "Unknown",
        icon: "fa-question-circle",
        color: "text-gray-500",
      };
  }
};
