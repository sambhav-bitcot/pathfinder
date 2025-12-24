
import { formatDateFullDay } from "@/lib/utils";
import { Calendar, Clock } from "lucide-react";

import { mockSessions } from "@/lib/mock-data";

type Session = (typeof mockSessions)[number];
export default function UpcomingSessionCard({ session }: { session: Session }) {
  return (
    <div
      key={session.id}
      className="flex items-start justify-between p-4 border rounded-lg"
    >
      <div className="space-y-1">
        <p className="font-medium">{session.title}</p>
        <p className="text-sm text-muted-foreground">{session.educatorName}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDateFullDay(new Date(session.date))} at {session.time}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {session.duration} min
          </span>
        </div>
      </div>
    </div>
  );
}
