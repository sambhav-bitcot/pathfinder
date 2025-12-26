"use client";

import PageHeader from "@/components/ui/page-header";
import StatsGridSection from "./stats-grid-section";
import QuickActionSection from "./quick-action-section";
import UpcomingSessionSection from "./upcoming-session-section";
import AvailabilitySection from "./availability-section";
import { useAppSelector } from "@/store/hooks";
export default function EducatorDashboard() {
  const { user } = useAppSelector((state) => state.auth);
  const pageHeading =
    user &&
    `Welcome back ${user && "," + user?.first_name + " " + user?.last_name}!`;
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* header */}
          <PageHeader
            title={pageHeading}
            desc={"Manage your sessions and help students succeed"}
          />
          {/* Stats Grid */}
          <StatsGridSection />

          {/* Main Content Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Upcoming Sessions */}
            <UpcomingSessionSection />

            {/* Availability */}
            <AvailabilitySection />
          </div>
          {/* Quick Actions */}
          <QuickActionSection />
        </div>
      </div>
    </div>
  );
}
