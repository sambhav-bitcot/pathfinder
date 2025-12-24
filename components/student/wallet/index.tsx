"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
} from "lucide-react";

import { mockWalletTransactions } from "@/lib/mock-data";
import PageHeader from "@/components/ui/page-header";
import StatsCard from "@/components/ui/stats-card";
import TransactionCard from "@/components/student/wallet/transaction-card";
import BalanceCard from "@/components/student/wallet/balance-card";

export default function StudentWallet() {
  const tokenBalance = mockWalletTransactions.reduce(
    (sum, txn) => sum + txn.tokens,
    0
  );
  const totalSpent = mockWalletTransactions
    .filter((t) => t.type === "spent")
    .reduce((sum, txn) => sum + Math.abs(txn.amount), 0);
  const totalPurchased = mockWalletTransactions
    .filter((t) => t.type === "purchase")
    .reduce((sum, txn) => sum + txn.amount, 0);

  let totalRefund = mockWalletTransactions
    .filter((t) => t.type === "refund")
    .reduce((sum, txn) => sum + txn.amount, 0);
  const statsItems = [
    {
      title: "Total Purchased",
      Icon: ArrowDownRight,
      iconClassName: "text-green-500",
      data: `${totalPurchased} tokens`,
    },
    {
      title: "Total Spent",
      Icon: ArrowUpRight,
      iconClassName: "text-red-500",

      data: `${totalSpent} tokens`,
    },
    {
      title: "Refunds",
      iconClassName: "text-blue-500",

      Icon: RefreshCw,
      data: `${totalRefund} tokens`,
    },
  ];
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <PageHeader
            title="My Wallet"
            desc=" Manage your tokens and transactions"
          />

          {/* Balance Card */}
          <BalanceCard balance={tokenBalance} />

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-3">
            {statsItems.map((items, idx) => (
              <StatsCard
                title={items.title}
                data={items.data}
                Icon={items.Icon}
                iconClassName={items.iconClassName}
                key={idx}
              />
            ))}
          </div>

          {/* Transaction History */}
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>Your recent token activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockWalletTransactions.map((transaction,idx) => (
                  <TransactionCard transaction={transaction} key={idx} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
