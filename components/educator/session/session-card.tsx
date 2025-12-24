import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, User, Video } from "lucide-react";
import { formatDateFullDay } from "@/lib/utils";
import { mockSessions } from "@/lib/mock-data";

type Session = (typeof mockSessions)[number];

type State = "upcoming" | "completed" | "expired" | "cancelled";
interface SessionCardProps {
  session: Session;
  state: State;
}

export default function SessionCard({ session, state }: SessionCardProps) {
  return (
    <Card key={session.id}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold">{session.title}</h3>
                <p className="text-muted-foreground flex items-center gap-2 mt-1">
                  <User className="w-4 h-4" />
                  {session.studentName}
                </p>
              </div>
              {state === "upcoming" && <Badge>{session.type}</Badge>}
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />

                {formatDateFullDay(new Date(session.date))}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {session.time} ({session.duration} min)
              </span>
            </div>
            {session.notes && (
              <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                <strong>Notes:</strong> {session.notes}
              </p>
            )}
          </div>
          {state === "upcoming" && (
            <div className="flex flex-col gap-2 ml-4">
              <Button size="sm">
                <Video className="w-4 h-4 mr-2" />
                Start Session
              </Button>
              <Button size="sm" variant="outline">
                Reschedule
              </Button>
              <Button size="sm" variant="ghost">
                Cancel
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
