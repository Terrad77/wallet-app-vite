import type { Transaction } from "./Transaction";

export interface DailyPoints {
  currentDay: number;
  seasonStartDate: string;
  transactions: Transaction[];
}
