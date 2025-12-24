"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockSessions } from "@/lib/mock-data";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import SessionNotFound from "@/components/ui/session-not-found";

import PageHeader from "@/components/ui/page-header";
import SessionCard from "@/components/student/session/session-card";
export default function StudentSessions() {
  const { user } = useAuth();
  console.log(user);

  const router = useRouter();
  const upcomingSessions = mockSessions.filter(
    (s) => s.status === "upcoming" && s.studentId === user?.id
  );
  const completedSessions = mockSessions.filter(
    (s) => s.status === "completed" && s.studentId === user?.id
  );
  const cancelledSessions = mockSessions.filter(
    (s) => s.status === "cancelled" && s.studentId === user?.id
  );
  const expiredSessions = mockSessions.filter(
    (s) => s.status === "expired" && s.studentId === user?.id
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <PageHeader
              title="My Sessions"
              desc=" View and manage your counseling sessions"
            />

            <Button
              onClick={() => {
                router.push("/student/sessions/book-session");
              }}
            >
              Book New Session
            </Button>
          </div>

          <Tabs defaultValue="upcoming" className="space-y-6">
            <TabsList>
              <TabsTrigger value="upcoming">
                Upcoming ({upcomingSessions.length})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed ({completedSessions.length})
              </TabsTrigger>
              <TabsTrigger value="cancelled">
                Cancelled ({cancelledSessions.length})
              </TabsTrigger>
              <TabsTrigger value="expired">
                Expired ({expiredSessions.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              {upcomingSessions.length > 0 ? (
                upcomingSessions.map((session,idx) => (
                  <SessionCard session={session} state="upcoming" key={idx}/>
                ))
              ) : (
                <SessionNotFound />
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {completedSessions.length > 0 ? (
                completedSessions.map((session,idx) => (
                  <SessionCard session={session} state="completed" key={idx}/>
                ))
              ) : (
                <SessionNotFound />
              )}
            </TabsContent>
            <TabsContent value="cancelled" className="space-y-4">
              {cancelledSessions.length > 0 ? (
                cancelledSessions.map((session,idx) => (
                  <SessionCard session={session} state="cancelled"key={idx} />
                ))
              ) : (
                <SessionNotFound />
              )}
            </TabsContent>
            <TabsContent value="expired" className="space-y-4">
              {expiredSessions.length > 0 ? (
                expiredSessions.map((session,idx) => (
                  <SessionCard session={session} state="expired" key={idx}/>
                ))
              ) : (
                <SessionNotFound />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
