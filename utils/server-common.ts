import moment from "moment";

export function mapAvailabilitiesToWeekdaysServer(days: string[]): string[] {
  const map: Record<string, string> = {
    MONDAY: 'Monday',
    TUESDAY: 'Tuesday',
    WEDNESDAY: 'Wednesday',
    THURSDAY: 'Thursday',
    FRIDAY: 'Friday',
    SATURDAY: 'Saturday',
    SUNDAY: 'Sunday',
  };
  return (days || []).map((d) => map[d] ?? d);
}

/**
 * Maps wallet transaction API data to Transaction format for display
 * @param transactions - Array of WalletTransaction from API
 * @returns Array of Transaction objects formatted for UI
 */
export interface FormattedTransaction {
  id: string;
  type: "purchase" | "spent" | "refund";
  description: string;
  date: string;
  time: string;
  tokens: number;
  amount: number;
  status: string;
}

export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export function mapWalletTransactions(
  transactions: any[]
): FormattedTransaction[] {
  return transactions.map((txn) => {
    const createdAt =  moment.parseZone(txn.created_at);
    
    const dateStr = createdAt?.format("DD/MM/YYYY");
    const timeStr = createdAt?.format("h:mm A");


    // Manage three types of transaction_type: "REFUND", "PURCHASE" (credited), "SESSION" (debited)
    let type: "purchase" | "spent" | "refund" = "spent";
    let description = "Transaction";

    // Normalize and check transaction_type from txn
    const txType = txn.transaction_type?.toUpperCase?.();
    if (txType === "REFUND") {
      type = "refund";
      description = "Token Refunded";
    }else if (txType === "SESSION") {
      type = "spent";
      description = "Token Spent for Session";
    } else  {
      type = "purchase";
      description = "Token Purchased";
    }

    // Calculate tokens. For purchase/refund, should be positive. For spent/session, should be negative.
    let tokens = Math.abs(txn.amount);
    if (type === "spent") {
      tokens = -tokens;
    }

    return {
      id: txn.id,
      type,
      description,
      date: dateStr,
      time: timeStr,
      tokens,
      amount: Math.abs(txn.amount),
      status: txn.active_status ? "completed" : "pending"
    };
  });
}


