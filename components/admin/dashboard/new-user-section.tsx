import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NewUserCard from "./new-user-card";
import { mockAdminUsers } from "@/lib/mock-data";
import Link from "next/link";
export default function NewUserSection() {
  const recentUsers = mockAdminUsers.slice(0, 3);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Users</CardTitle>
        <CardDescription>Newly registered users</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentUsers.map((user,idx) => (
          <NewUserCard user={user} key={idx}/>
        ))}
        <Button className="w-full" asChild>
          <Link href="/admin/users">View All Users</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
