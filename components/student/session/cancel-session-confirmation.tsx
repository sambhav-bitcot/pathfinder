"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface CancelSessionProps {
  title?: string;
  className?: string;
}

export default function CancelSessionConfirmation({
  title,
  className,
}: CancelSessionProps) {
  const { toast } = useToast();

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
          <Button variant={"outline"} className={className}>
            {title || "Cancel"}
          </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex flex-col gap-5 ">
            <div className="flex flex-col gap-2">
              <div className="font-semibold text-lg">Cancel this session?</div>

              <p className="text-muted-foreground text-sm">
                This action will cancel your upcoming session.
              </p>
            </div>
            <div className="flex justify-end gap-5">
              <Button
                variant={"outline"}
                className="border hover:text-white"
                onClick={() => setOpen(false)}
              >
                No
              </Button>
              <Button variant={"secondary"}>Yes</Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
