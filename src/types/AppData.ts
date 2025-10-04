import type { CardBalance } from "./CardBalance";
import type { NoPaymentDue } from "./NoPaymentDue";
import type { DailyPoints } from "./DailyPoints";
import type { Transaction } from "./Transaction";

export interface AppData {
  cardBalance: CardBalance;
  noPaymentDue: NoPaymentDue;
  dailyPoints: DailyPoints;
  transactions: Transaction[];
}
