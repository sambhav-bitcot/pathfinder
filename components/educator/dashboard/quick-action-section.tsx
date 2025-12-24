import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import QuickActionCard from "@/components/ui/quick-action-card";
import {
  Calendar,
  Clock,
  DollarSign,
  MessageSquare,
} from "lucide-react";
const quickActionItems = [
  {
    href: "/educator/sessions",
    title: "View Schedule",
    Icon: Calendar,
  },
  {
    href: "/educator/chat",
    title: " Message Students",
    Icon: MessageSquare,
  },
  {
    href: "/educator/availability",
    title: "  Set Availability",
    Icon: Clock,
  },
  {
    href: "/educator/earnings",
    title: "  View Earnings",
    Icon: DollarSign,
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
