export type TransactionType = "Payment" | "Transfer" | "Credit" | "Withdrawal";
export type TransactionStatus = "Pending" | "Success" | "Failed";

export interface Transaction {
  id: string;
  type: TransactionType;
  title: string;
  amount: number;
  currency: string;
  transactionName: string;
  transactionDescription: string;
  date: string;
  status: TransactionStatus;
  cardNumberUsed: string | null;
  authorizedUser: string | null;
  icon: string;
  color: string;
}

export interface CardBalance {
  total: number;
  maximumCardLimit: number;
  currentBalance: number;
  availableLimit: number;
}

export interface NoPaymentDue {
  message: string;
  isPaid: boolean;
}

export interface DailyPoints {
  currentDay: number;
  seasonStartDate: string;
  transactions: Transaction[];
}

export interface AppData {
  cardBalance: CardBalance;
  noPaymentDue: NoPaymentDue;
  dailyPoints: DailyPoints;
  transactions: Transaction[];
}
