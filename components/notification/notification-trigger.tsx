"use client";

import * as React from "react";
import { Bell } from "lucide-react";
import { NotificationSidebar } from "./notification-sidebar";

export function NotificationTrigger() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div
        className=" hover:bg-accent p-2 rounded-full "
        onClick={() => setOpen(true)}
      >
        <Bell className="size-5" />
      </div>

      <NotificationSidebar open={open} onOpenChange={setOpen} />
    </>
  );
}
