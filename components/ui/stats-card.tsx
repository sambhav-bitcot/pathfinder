import { Card, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  Icon: LucideIcon;
  data: string | number;
  className?: string;
  iconClassName?: string;
}

export default function StatsCard({
  title,
  Icon,
  data,
  className,
  iconClassName,
}: StatsCardProps) {
  return (
    <Card className={`p-6 flex flex-col justify-between gap-10 ${className}`}>
      <div className="flex justify-between items-center">
        <CardTitle className="text-sm">{title}</CardTitle>
        <Icon className={`size-4 ${iconClassName}`} />
      </div>
      <div className="text-2xl font-bold">{data}</div>
    </Card>
  );
}
