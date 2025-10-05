/**
 * format date of transaction based on recency
 * - Today: "Today"
 * - Yesterday: "Yesterday"
 * - Last 7 Days: Day of the week (Monday, Tuesday, etc)
 * - Older: MM/DD/YY
 */
export function formatTransactionDate(dateString: string): string {
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
}

/**
 * Format amount with sign based on transaction type
 * Credit: +$XXX.XX
 * Payment: -$XXX.XX
 */
export function formatAmount(amount: number, type: string): string {
  if (type === "Credit") {
    return `+${Math.abs(amount).toFixed(2)}`;
  }
  return `${Math.abs(amount).toFixed(2)}`;
}

/**
 * Format currency
 */
export function formatCurrency(
  amount: number,
  currency: string = "USD"
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}
