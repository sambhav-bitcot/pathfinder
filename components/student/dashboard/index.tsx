"use client";

import { Calendar, MessageSquare, Wallet } from "lucide-react";
import {
  mockSessions,
  mockChatConversations,
  mockWalletTransactions,
} from "@/lib/mock-data";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/ui/page-header";
import StatsCard from "@/components/ui/stats-card";
import QuickActionSection from "./quick-action-section";
import UpcomingSessionSection from "./upcoming-session-section";
import RecentMessageSection from "./recent-message-section";
import StatsGridSection from "./stats-grid-section";
export default function StudentDashboard() {
  const { user } = useAuth();

  const pageHeading = `Welcome back ${
    user && "," + user?.firstName + " " + user?.lastName
  }!`;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <PageHeader
            title={pageHeading}
            desc={"Here’s an overview of your learning journey."}
          />
          {/* Stats Grid */}
          <StatsGridSection />

          {/* Main Content Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Upcoming Sessions */}
            <UpcomingSessionSection />
            {/* Recent Messages */}
            <RecentMessageSection />
          </div>
          {/* Quick Actions */}
          <QuickActionSection />
        </div>
      </div>
    </div>
  );
}
