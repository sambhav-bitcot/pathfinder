import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatDateFullDay } from "@/lib/utils";
import { BookA, Calendar, Clock, User, Video } from "lucide-react";
import CancelSessionConfirmation from "./cancel-session-confirmation";
import { mockEducators, mockSessions } from "@/lib/mock-data";
import { useRouter } from "next/navigation";
import ViewNotesConfirmation from "./view-notes";

type Session = (typeof mockSessions)[number];

type state = "upcoming" | "completed" | "expired" | "cancelled";
export default function SessionCard({
  session,
  state,
}: {
  session: Session;
  state: state;
}) {
  const router = useRouter();

  const getEducator = (id: string) => {
    let educatorDetail = mockEducators.find((edu: any) => edu.id === id);
    if (educatorDetail) return educatorDetail;
    return {};
  };

  return (
    <Card key={session.id}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold">{session.title}</h3>
                <div className="flex gap-3">
                  <p className="text-muted-foreground flex items-center gap-2 mt-1">
                    <User className="w-4 h-4" />
                    {session.educatorName}
                  </p>
                  <p className="text-muted-foreground flex items-center gap-2 mt-1">
                    <BookA className="w-4 h-4" />
                    {getEducator(session.educatorId).specialization || "N/A"}
                  </p>
                </div>
              </div>
              {/* <Badge>{session.type}</Badge> */}
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
            {session?.educatorId && (
              <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                desc :{" "}
                {getEducator(session.educatorId)?.description ||
                  "No description yet."}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 ml-4">
            {state === "completed" && (
              <ViewNotesConfirmation notes={session?.notes} />
            )}

            {state === "upcoming" && (
              <Button size="sm" disabled>
                <Video className="w-4 h-4 mr-2" />
                Join Session
              </Button>
            )}

            {state === "upcoming" && (
              <CancelSessionConfirmation title="Cancel" />
            )}
            {state !== "upcoming" && (
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  router.push(
                    `/student/sessions/book-session/${session.educatorId}`
                  )
                }
              >
                Book Again
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
