
"use client";
import { Card } from "@/components/ui/card";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import PageHeader from "@/components/ui/page-header";

export default function AdminAnalytics() {
  const usersRoleData = [
    { role: "Student", count: 120 },
    { role: "Educator", count: 45 },
    { role: "Total", count: 165 },
  ];

  const usersRoleConfig = {
    Student: { label: "Students", color: "oklch(0.696 0.17 162.48)" },
    Educator: { label: "Educators", color: "#16a34a" },
    Admin: { label: "Total", color: "#dc2626" },
  };

  const sessionStatusData = [
    { status: "Upcoming", sessions: 30 },
    { status: "Expired", sessions: 12 },
    { status: "Completed", sessions: 80 },
    { status: "Cancelled", sessions: 6 },
  ];

  const sessionStatusColors = {
    Upcoming: "#2563eb",
    Ongoing: "#f59e0b",
    Completed: "#16a34a",
    Cancelled: "#dc2626",
  };

  const sessionStatusConfig = {
    sessions: { label: "Sessions" },
  };

  const renderPieLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    value,
    name,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 15;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="currentColor"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-xs fill-muted-foreground"
      >
        {name}: {value}
      </text>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 ">
        <PageHeader
          title={"Analytics Dashboard"}
          desc={" Platform metrics and insights"}
        />
       
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-10">
          {/*  USERS ROLE PIE  */}
          <Card className="p-5">
            <h3 className="mb-3 text-lg font-medium">User OverView</h3>

            <ChartContainer config={usersRoleConfig} className="h-[320px]">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />

                <Pie
                  data={usersRoleData}
                  dataKey="count"
                  nameKey="role"
                  outerRadius={90} // solid circle
                  label={renderPieLabel} //  user count around circle
                >
                  {usersRoleData.map((entry) => (
                    <Cell 
                      key={entry.role}
                      fill={`var(--color-${entry.role})`}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </Card>

          {/*  SESSION STATUS BAR  */}
          <Card className="p-5">
            <h3 className="mb-3 text-lg font-medium">Session OverView</h3>

            <ChartContainer config={sessionStatusConfig} className="h-[320px]">
              <BarChart data={sessionStatusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />

                {/* ✅ Custom Y-axis markings */}
                <YAxis ticks={[0, 35, 70, 105, 140]} domain={[0, 140]} />

                <ChartTooltip content={<ChartTooltipContent />} />

                <Bar dataKey="sessions" radius={[6, 6, 0, 0]}>
                  {sessionStatusData.map((entry) => 
                   {
                    let key = entry.status as keyof typeof sessionStatusColors;
                    return <Cell
                      key={entry.status}
                      fill={sessionStatusColors[key]}
                    />}
                  )}
                </Bar>
              </BarChart>
            </ChartContainer>
          </Card>
        </div>
      </div>
    </div>
  );
}
