"use client";

import { useAuth } from "@/contexts/auth-context";
import PageHeader from "@/components/ui/page-header";
import StatsGridSection from "./stats-grid-section";
import QuickActionSection from "./quick-action-section";
import UpcomingSessionSection from "./upcoming-session-section";
import AvailabilitySection from "./availability-section";
export default function EducatorDashboard() {
  const { user } = useAuth();
  const pageHeading = `Welcome back ${
    user && "," + user?.firstName + " " + user?.lastName
  }!`;
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
