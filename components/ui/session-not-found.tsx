import { Card, CardContent } from "./card";
import { CalendarOff } from "lucide-react";

export default function SessionNotFound() {
  return (
    <>
      <Card className="p-5">
        <CardContent className="border rounded p-6 py-10 flex flex-col w-full items-center gap-4">
          <CalendarOff />
          <div
            data-slot="empty-title"
            className="text-lg font-medium tracking-tight"
          >
            No upcoming sessions found
          </div>
          <div
            data-slot="empty-description"
            className="text-muted-foreground [&amp;&gt;a:hover]:text-primary text-sm/relaxed [&amp;&gt;a]:underline [&amp;&gt;a]:underline-offset-4"
          >
            You don't have any upcoming sessions at the moment.
          </div>
        </CardContent>
      </Card>
    </>
  );
}
