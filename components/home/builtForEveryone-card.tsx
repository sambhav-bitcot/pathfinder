import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, LucideIcon } from "lucide-react";

type Props = {
  readonly title: string;
  readonly icon: LucideIcon;
  readonly iconWrapperClass: string;
  readonly checkClass: string;
  readonly features: string[];
  readonly buttonLabel: string;
  readonly href: string;
  readonly cardClass: string;
};

export function BuiltForEveryoneCard({
  title,
  icon: Icon,
  iconWrapperClass,
  checkClass,
  features,
  buttonLabel,
  href,
  cardClass,
}: Props) {
  return (
    <Card className={cardClass}>
      <div className={iconWrapperClass}>
        <Icon className="text-primary" />
      </div>

      <h3 className="text-2xl font-semibold">{title}</h3>

      <ul className="space-y-3">
        {features.map((item, index) => (
          <li key={index+1} className="flex items-start gap-3">
            <CheckCircle className={checkClass} />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <Button variant="default" asChild>
        <Link href={href}>{buttonLabel}</Link>
      </Button>
    </Card>
  );
}
