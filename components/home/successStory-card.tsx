import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

type Props = {
 readonly rating: number;
 readonly quote: string;
 readonly initials: string;
 readonly name: string;
 readonly subtitle: string;
};

export function SuccessStoryCard({
  rating,
  quote,
  initials,
  name,
  subtitle,
}: Props) {
  return (
    <Card className="p-6 space-y-4">
      <div className="flex gap-1">
        {new Array(rating).map((_, i) => (
          <Star key={i+1} className="w-5 h-5 fill-primary text-primary" />
        ))}
      </div>

      <p className="text-muted-foreground">"{quote}"</p>

      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-semibold">
          {initials}
        </div>
        <div>
          <div className="font-semibold">{name}</div>
          <div className="text-sm text-muted-foreground">{subtitle}</div>
        </div>
      </div>
    </Card>
  );
}
