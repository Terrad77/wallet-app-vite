// Типы транзакций (Type, TransactionName)
export type TransactionType = "Payment" | "Transfer" | "Top-up" | "Withdrawal";
export type TransactionName = "Apple" | "Gas" | "Target" | string; // и т.д.

// Статусы транзакций
export type TransactionStatus = "Pending" | "Success" | "Failed";

export interface Transaction {
  id: string;
  type: TransactionType; // Тип операции (Payment, Transfer и т.д.)
  title: string; // Название контрагента (Apple, Starbucks и т.д.)
  amount: number; // Сумма (может быть отрицательной для расходов)
  currency: string;
  transactionName: TransactionName; // Для группировки
  transactionDescription: string;
  date: string; // Дата в формате ISO (например, '2025-05-18T10:00:00Z')
  status: TransactionStatus; // Статус (Pending, Success, Failed)
}

export interface CardBalance {
  balance: number;
  cardNumber: string;
  cardName: string;
}

export interface DailyPoints {
  currentPoints: number;
  dailyIncrease: number;
}

// Модель данных для всего приложения (имитация JSON-файла)
export interface AppData {
  cardBalance: CardBalance;
  dailyPoints: DailyPoints;
  transactions: Transaction[];
  noPaymentDue: boolean; // Для блока "No Payment Due"
}
