
import { Badge } from "@/components/ui/badge";
import { mockAdminUsers } from "@/lib/mock-data";

type User = typeof mockAdminUsers[number];

interface NewUserProps{
    user:User
}

export default function NewUserCard({user}:NewUserProps){


return (
  <div
    key={user.id}
    className="flex items-center justify-between p-4 border rounded-lg"
  >
    <div className="space-y-1">
      <p className="font-medium">{user.firstName + " " + user.lastName}</p>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Badge variant="default" className="capitalize">
          {user?.role.toUpperCase()}
        </Badge>
        <span>•</span>
        <span>{new Date(user.joinDate).toLocaleDateString()}</span>
      </div>
    </div>

  </div>
);

}