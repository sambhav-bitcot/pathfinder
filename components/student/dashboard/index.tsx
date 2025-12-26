"use client";

import { useAppSelector } from "@/store/hooks";

import PageHeader from "@/components/ui/page-header";
import QuickActionSection from "./quick-action-section";
import UpcomingSessionSection from "./upcoming-session-section";
import RecentMessageSection from "./recent-message-section";
import StatsGridSection from "./stats-grid-section";
export default function StudentDashboard() {

  const { user } = useAppSelector((state) => state.auth);
  console.log(user);

  const pageHeading =
    user &&
    `Welcome back ${user && "," + user?.first_name + " " + user?.last_name}!`;

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
