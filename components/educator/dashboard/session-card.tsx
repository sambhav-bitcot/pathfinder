import { Button } from "@/components/ui/button";
import { mockSessions } from "@/lib/mock-data";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";

type Session = (typeof mockSessions)[number];

interface SessionCardProps {
  session: Session;
}
export default function SessionCard({ session }: SessionCardProps) {
  return (
    <div
      key={session.id}
      className="flex items-start justify-between p-4 border rounded-lg"
    >
      <div className="space-y-1">
        <p className="font-medium">{session.title}</p>
        <p className="text-sm text-muted-foreground">{session.studentName}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(session.date).toLocaleDateString()} at {session.time}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {session.duration} min
          </span>
        </div>
      </div>
      <Button size="sm" variant="outline">
        <Link href="/educator/sessions">View</Link>
      </Button>
    </div>
  );
}
