import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { mockSessions } from "@/lib/mock-data";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";
import SessionCard from "./session-card";
export default function UpcomingSessionSection() {
  const { user } = useAuth();
  const upcomingSessions = mockSessions
    .filter((s) => s.status === "upcoming" && s.educatorId === user?.id)
    .slice(0, 2);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Sessions</CardTitle>
        <CardDescription>Your scheduled counseling sessions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex flex-col justify-between h-full">
        <div>
          {upcomingSessions.map((session,idx) => (
            <SessionCard session={session} key={idx} />
          ))}
        </div>
        <Button className="w-full" asChild>
          <Link href="/educator/sessions">View All Sessions</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
