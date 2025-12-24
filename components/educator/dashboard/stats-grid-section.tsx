import StatsCard from "@/components/ui/stats-card";
import { mockEducatorEarnings, mockSessions } from "@/lib/mock-data";

import {
  Calendar,
  DollarSign,
  Users,
} from "lucide-react";
export default function StatsGridSection() {
  const totalEarnings = mockEducatorEarnings
    .filter((e) => e.status === "paid")
    .reduce((sum, e) => sum + e.amount, 0);

  const activeStudents = new Set(
    mockSessions.filter((s) => s.educatorId === "edu-1").map((s) => s.studentId)
  ).size;
  const sessionsThisWeek = mockSessions.filter(
    (s) => s.educatorId === "edu-1" && s.status === "upcoming"
  ).length;
  const statsItems = [
    {
      title: "Total Earnings",
      Icon: DollarSign,
      data: totalEarnings,
    },
    {
      title: " Active Students",
      Icon: Users,
      data: activeStudents,
    },
    {
      title: " Sessions This Week",
      Icon: Calendar,
      data: sessionsThisWeek,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {statsItems.map((items, idx) => (
        <StatsCard
          key={idx}
          title={items.title}
          Icon={items.Icon}
          data={items.data}
        />
      ))}
    </div>
  );
}
