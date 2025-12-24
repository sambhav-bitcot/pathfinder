"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Card } from "../ui/card";
import { mockNotifications } from "@/lib/mock-data";
type NotificationSidebarProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function NotificationSidebar({
  open,
  onOpenChange,
}: NotificationSidebarProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[380px] p-0">
        <SheetHeader className="p-4 ">
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription/>
        </SheetHeader>

        <div className="flex flex-col gap-3 p-3">
          {mockNotifications.length > 0 ? (
            mockNotifications.map((note, idx) => (
              <Card className="bg-accent-foreground p-4 flex gap-0" key={idx}>
                <p className="text-md font-medium">{note.title}</p>
                <p className="text-sm text-muted-foreground ">{note.message}</p>
              </Card>
            ))
          ) : (
            <div>""</div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
