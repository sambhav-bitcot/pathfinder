import { Button } from "@/components/ui/button";

interface AvailabilityCardProps {
  availability: { day: string; time: string };
}

export default function AvailabilityCard({
  availability,
}: AvailabilityCardProps) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div>
        <p className="font-medium">{availability.day}</p>
        <p className="text-sm text-muted-foreground">{availability.time}</p>
      </div>
      <Button size="sm" variant="ghost">
        Edit
      </Button>
    </div>
  );
}
