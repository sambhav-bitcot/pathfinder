"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { AdminUserUpdate } from "@/lib/types";
import { useState } from "react";

interface UserFormProps {
  state: "active" | "inactive";
  userData?: AdminUserUpdate;
  title?: string;
  className?: string;
}

export default function UserStatusConfirmation({
  title,
  className,
  state,
}: UserFormProps) {
  const { toast } = useToast();

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className={className}> {title}</div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex flex-col gap-5 ">
            <div className="flex flex-col gap-2">
              <DialogTitle className="font-semibold text-lg">
                Deactivate User
              </DialogTitle>

              <DialogDescription className="text-muted-foreground text-sm">
                {`Are you sure you want to ${
                  state === "active" ? "deactivate" : "activate"
                } this user?`}
              </DialogDescription>
            </div>
            <div className="flex justify-end gap-5">
              <Button
                variant={"outline"}
                className="border hover:text-white"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button variant={"secondary"}>
                {state === "active" ? "Deactivate" : "Activate"}
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
