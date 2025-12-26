import StatsCard from "@/components/ui/stats-card";
import {  mockSessions } from "@/lib/mock-data";
import { useAppSelector } from "@/store/hooks";

import {
  Calendar,
  DollarSign,
  Users,
} from "lucide-react";
export default function StatsGridSection() {
 const { token } = useAppSelector((state) => state.auth);


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
      data: token,
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
          key={idx+1}
          title={items.title}
          Icon={items.Icon}
          data={items.data}
        />
      ))}
    </div>
  );
}
