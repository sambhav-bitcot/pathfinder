"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, DollarSign, Calendar, TrendingUp } from "lucide-react";
import Link from "next/link";
import { mockAdminUsers, mockAnalytics } from "@/lib/mock-data";
import { useAuth } from "@/contexts/auth-context";
import PageHeader from "@/components/ui/page-header";
import QuickActionSection from "./quick-action-section";
import NewUserSection from "./new-user-section";
import StatsGridSection from "./stats-grid-section";
export default function AdminDashboard() {
  const { user } = useAuth();
  const pageHeading = `Welcome back ${
    user && "," + user?.firstName + " " + user?.lastName
  }!`;

  const recentUsers = mockAdminUsers.slice(0, 3);

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
