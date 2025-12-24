import StatsCard from "@/components/ui/stats-card";
import { mockAdminUsers, mockAnalytics } from "@/lib/mock-data";

import {
  Calendar,
  DollarSign,
  TrendingUp,
  Users,
} from "lucide-react";
export default function StatsGridSection() {
 
  const statsItems = [
    {
      title: "Total Users",
      Icon: Users,
      data: mockAnalytics.totalUsers,
    },
    {
      title: "Revenue",
      Icon: DollarSign,
      data: `$${mockAnalytics.totalRevenue.toLocaleString()}`,
    },
    {
      title: "Active Sessions",
      Icon: Calendar,
      data: `${mockAnalytics.activeSessions}`,
    },
    {
      title: " Growth Rate",
      Icon: TrendingUp,
      data: `+${mockAnalytics.growthRate}%`,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-4">
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
