import { Card, CardContent  } from "@/components/ui/card"
import { LucideStickyNote } from "lucide-react";

export default function ResourcesNotFound() {
  return (
    <>
      <Card className="p-5">
        <CardContent className="border rounded p-6 py-10 flex flex-col w-full items-center gap-4">
          <LucideStickyNote />
          <div
            data-slot="empty-title"
            className="text-lg font-medium tracking-tight"
          >
            No resources found
          </div>
          <div
            data-slot="empty-description"
            className="text-muted-foreground [&amp;&gt;a:hover]:text-primary text-sm/relaxed [&amp;&gt;a]:underline [&amp;&gt;a]:underline-offset-4"
          >
            Try adjusting your filters.
          </div>
        </CardContent>
      </Card>
    </>
  );
}
