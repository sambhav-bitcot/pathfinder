"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { UserRole, AdminUserUpdate } from "@/lib/types";
import { Card, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { Trash2 } from "lucide-react";

interface DeleteResourcesProps {
  resourceTitle: string;
  title?: string;
  className?: string;
}

export default function DeleteResourcesConfirmation({
  resourceTitle,
  title,
  className,
}: DeleteResourcesProps) {
  const { toast } = useToast();

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className={className}>  <Trash2 className="text-red-500 size-4" /></div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex flex-col gap-5 ">
            <div className="flex flex-col gap-2">
              <div className="font-semibold text-lg">Delete resource?</div>

              <p className="text-muted-foreground text-sm">
                {`This action will be permanently delete the resource "${resourceTitle}
                 ".`}
              </p>
            </div>
            <div className="flex justify-end gap-5">
              <Button variant={"outline"} className="border hover:text-white" onClick={(()=>setOpen(false))}>
                Cancel
              </Button>
              <Button variant={"secondary"}>Delete</Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
