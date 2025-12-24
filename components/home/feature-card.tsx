import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

type FeatureCardProps = {
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
};

export function FeatureCard({
  title,
  description,
  icon: Icon,
}: FeatureCardProps) {
  return (
    <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="w-6 h-6 text-primary" />
      </div>

      <h3 className="text-xl font-semibold">{title}</h3>

      <p className="text-muted-foreground">{description}</p>
    </Card>
  );
}
