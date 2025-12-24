"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Video, User } from "lucide-react";
import { mockSessions } from "@/lib/mock-data";
import { useAuth } from "@/contexts/auth-context";
import NoSession from "@/components/ui/session-not-found";
import PageHeader from "@/components/ui/page-header";
import SessionsSection from "./session-section";
export default function EducatorSessions() {
  const { user } = useAuth();

  const upcomingSessions = mockSessions.filter(
    (s) => s.status === "upcoming" && s.educatorId === user?.id
  );
  const completedSessions = mockSessions.filter(
    (s) => s.status === "completed" && s.educatorId === user?.id
  );
  const cancelledSessions = mockSessions.filter(
    (s) => s.status === "cancelled" && s.educatorId === user?.id
  );
  const expiredSessions = mockSessions.filter(
    (s) => s.status === "expired" && s.educatorId === user?.id
  );

  return (
    <div className="min-h-screen bg-background">
      <></>
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <PageHeader
            title="Session Management"
            desc=" Manage your counseling sessions and schedule"
          />
          {/* sessions section */}
          <SessionsSection />
        </div>
      </div>
    </div>
  );
}
