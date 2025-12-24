"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { SearchInput } from "../../ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader } from "@/components/ui/card";
import { useMemo, useState } from "react";
import { LucideMessageSquarePlus, Trash2 } from "lucide-react";
import { mockEducators } from "@/lib/mock-data";
type Educator = (typeof mockEducators)[number];
interface NewChatProps {
  setSelectedConversation: (id: string) => void;
  title?: string;
  className?: string;
}

export default function NewChat({
  setSelectedConversation,
  title,
  className,
}: NewChatProps) {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const filterData =
    useMemo(() => {
      if (filter === "") return mockEducators;

      return mockEducators.filter((edu: Educator) => {
        let name = `${edu.firstName} ${edu.lastName}`;
        return name.toLowerCase().includes(filter.toLowerCase());
      });
    }, [filter]) || [];

  const handleNewChat = (id: string) => {
    // setSelectedConversation(id);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className={className}>
          {title || <LucideMessageSquarePlus className="size-4" />}
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl p-0">
        <DialogHeader>
          <div className="flex flex-col pb-5">
            <div className="px-4 p-4">
              <div className="font-semibold text-lg">Select a User to Chat</div>
            </div>
            <div className="flex justify-end gap-5 border-b-background px-4 pt-8 pb-3 ">
              <SearchInput
                placeholder="Search users..."
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>

            <p className="border-b mb-5"></p>
            <div
              className={` max-h-[400px] ${
                filterData.length > 0
                  ? "overflow-y-scroll"
                  : "overflow-y-hidden"
              } px-4 pb-10`}
            >
              <div className="flex flex-col gap-4 justify-center pt-3">
                {filterData.length > 0 ? (
                  filterData.map((edu: Educator,idx:number) => (
                    <Card
                      className="flex flex-row p-5 items-center"
                      onClick={() => handleNewChat(edu.id)}
                      key={idx}
                    >
                      <Avatar className="size-12">
                        <AvatarImage src={edu.avatar} />
                      </Avatar>
                      <div>
                        <div>{edu.firstName + " " + edu.lastName}</div>
                        <div className="text-muted-foreground text-sm">
                          {edu?.email || "sample@gmail.com"}
                        </div>
                        <div className="text-muted-foreground text-sm">
                          {edu.role.toUpperCase()}
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="self-center text-muted-foreground overflow-hidden">
                    Not Found
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
