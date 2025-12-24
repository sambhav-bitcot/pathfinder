import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { mockSessions } from "@/lib/mock-data";
import UpcomingSessionCard from "./upcoming-session-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UpcomingSessionSection () {
  const { user } = useAuth();

  const upcomingSessions = mockSessions.filter(
    (s) => s.status === "upcoming" && s.studentId === user?.id
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Sessions</CardTitle>
        <CardDescription>Your scheduled counseling sessions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingSessions.map((session,idx) => (
          <UpcomingSessionCard session={session} key={idx} />
        ))}
        <Button className="w-full" asChild>
          <Link href="/student/sessions">View All Sessions</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
