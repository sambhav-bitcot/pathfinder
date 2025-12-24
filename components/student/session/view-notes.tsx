"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Divide } from "lucide-react";

interface ViewNotesProps {
  notes?: string;
  title?: string;
  className?: string;
}

export default function ViewNotesConfirmation({
  notes,
  title,
  className,
}: ViewNotesProps) {
  const { toast } = useToast();

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className={className}>
          {title || "View Notes"}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex flex-col gap-5 ">
            <div className="flex flex-col gap-2">
              <DialogTitle className="font-semibold text-lg">
                working
              </DialogTitle>

              <DialogDescription className="text-muted-foreground text-sm">
                Notes from your session
              </DialogDescription>
            </div>
            <div className="flex justify-center items-center">
              {notes ? (
                <div className="bg-muted p-3 rounded-lg text-sm w-full">
                  {notes}
                </div>
              ) : (
                <div className="text-muted-foreground  p-5">
                  No notes available for this session.
                </div>
              )}
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
