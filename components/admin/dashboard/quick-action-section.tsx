import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import QuickActionCard from "@/components/ui/quick-action-card";
import { Calendar, Clock, DollarSign, MessageSquare, TrendingUp, Users } from "lucide-react";
const quickActionItems = [
  {
    href: "/admin/users",
    title: "     Manage Users",
    Icon: Users,
  },
  {
    href: "/admin/payments",
    title: "  View Payments",
    Icon: DollarSign,
  },
  {
    href: "/admin/analytics",
    title: "  Analytics",
    Icon: TrendingUp,
  },
  {
    href: "/admin/settings",
    title: "  Settings",
    Icon: Calendar,
  },
];

export default function QuickActionSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and resources</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-4">
          {quickActionItems.map((items, idx) => (
            <QuickActionCard
              title={items.title}
              href={items.href}
              Icon={items.Icon}
              key={idx}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
