import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import QuickActionCard from "@/components/ui/quick-action-card";
import { BookOpen, Calendar, MessageSquare, Wallet } from "lucide-react";
const quickActionItems = [
  {
    href: "/student/sessions",
    title: "Book Session",
    Icon: Calendar,
  },
  {
    href: "/student/chat",
    title: "Send Message",
    Icon: MessageSquare,
  },
  {
    href: "/student/wallet",
    title: "Add Tokens",
    Icon: Wallet,
  },
  {
    href: "/student/resources",
    title: "Browse Resources",
    Icon: BookOpen,
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
