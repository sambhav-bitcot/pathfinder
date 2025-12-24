"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockSessions } from "@/lib/mock-data";
import { useAuth } from "@/contexts/auth-context";
import NoSession from "@/components/ui/session-not-found";
import SessionCard from "./session-card";

export default function SessionsSection() {
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
    <Tabs defaultValue="upcoming" className="space-y-6">
      <TabsList>
        <TabsTrigger value="upcoming">
          Upcoming ({upcomingSessions.length})
        </TabsTrigger>
        <TabsTrigger value="completed">
          Completed ({completedSessions.length})
        </TabsTrigger>
        <TabsTrigger value="cancelled">
          cancelled ({cancelledSessions.length})
        </TabsTrigger>
        <TabsTrigger value="expired">
          Expired ({expiredSessions.length})
        </TabsTrigger>
      </TabsList>

      {/* upcoming sessions */}
      <TabsContent value="upcoming" className="space-y-4">
        {upcomingSessions.length > 0 ? (
          upcomingSessions.map((session,idx) => (
            <SessionCard session={session} state="upcoming" key={idx}/>
          ))
        ) : (
          <NoSession />
        )}
      </TabsContent>

      {/* completed sessions */}

      <TabsContent value="completed" className="space-y-4">
        {completedSessions.length > 0 ? (
          completedSessions.map((session,idx) => (
            <SessionCard session={session} state="completed" key={idx}/>
          ))
        ) : (
          <NoSession />
        )}
      </TabsContent>

      {/* cancelled sessions */}

      <TabsContent value="cancelled" className="space-y-4">
        {cancelledSessions.length > 0 ? (
          cancelledSessions.map((session,idx) => (
            <SessionCard session={session} state="cancelled" key={idx}/>
          ))
        ) : (
          <NoSession />
        )}
      </TabsContent>

      {/* expired sessions */}

      <TabsContent value="expired" className="space-y-4">
        {expiredSessions.length > 0 ? (
          expiredSessions.map((session,idx) => (
            <SessionCard session={session} state="expired" key={idx}/>
          ))
        ) : (
          <NoSession />
        )}
      </TabsContent>
    </Tabs>
  );
}
