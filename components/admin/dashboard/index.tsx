"use client";

import PageHeader from "@/components/ui/page-header";
import QuickActionSection from "./quick-action-section";
import NewUserSection from "./new-user-section";
import StatsGridSection from "./stats-grid-section";
import { useAppSelector } from "@/store/hooks";
export default function AdminDashboard() {
  const { user } = useAppSelector((state) => state.auth);
  const pageHeading =
    user &&
    `Welcome back ${user && "," + user?.first_name + " " + user?.last_name}!`;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <PageHeader
            title={pageHeading}
            desc={"  Platform overview and management"}
          />

          {/* Stats Grid */}
          <StatsGridSection />

          {/* Main Content Grid */}
          <div className="grid gap-6 md:grid-cols-1">
            {/* Recent Users */}
            <NewUserSection />
          </div>

          {/* Quick Actions */}
          <QuickActionSection />
        </div>
      </div>
    </div>
  );
}
