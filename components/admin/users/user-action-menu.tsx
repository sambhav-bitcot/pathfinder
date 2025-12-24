import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import UserForm from "./user-form";
import UserStatusConfirmation from "./user-status-confirmation";
import { mockAdminUsers } from "@/lib/mock-data";
type User = typeof mockAdminUsers[number];

interface ActionMenuProps{
    user:User
}

export default function UserActionMenu({ user }: ActionMenuProps) {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="ghost">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            router.push(`/admin/users/${user.id}`);
          }}
        >
          View
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <UserForm
            className=" bg-inherit hover:bg-accent hover:text-black"
            userData={user}
            state={"update"}
            title="Edit"
          />
          {/* Edit */}
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <UserStatusConfirmation
            state={user.status}
            title={user.status === "active" ? "Inactive" : "Active"}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
