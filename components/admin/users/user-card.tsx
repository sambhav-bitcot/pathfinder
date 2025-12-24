import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

import { mockAdminUsers } from "@/lib/mock-data";
import UserActionMenu from "./user-action-menu";
import { useEffect, useState } from "react";

type User = (typeof mockAdminUsers)[number];

interface UserCardProps {
  user: User;
}
export default function UserCard({ user }: UserCardProps) {
  const router = useRouter();

  //for prevent to hydration error
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      key={user.id}
      className="flex items-center justify-between p-4 border rounded-lg"
    >
      <div className="flex items-center gap-4">
        <img
          src={user.avatar || "/placeholder.svg"}
          alt={user.name}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="font-medium">{user.firstName + " " + user.lastName}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge
              variant={user.role === "educator" ? "secondary" : "default"}
              className="capitalize"
            >
              {user.role}
            </Badge>
            <span>•</span>
            {mounted && (
              <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant={user.status === "active" ? "default" : "secondary"}>
          {user.status}
        </Badge>
        <UserActionMenu user={user} />
      </div>
    </div>
  );
}
