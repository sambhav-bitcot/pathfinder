import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface QuickActionProps {
  href?: string;
  title?: string;
  Icon?: LucideIcon;
  className?: string;
}

export default function QuickActionCard({
  title,
  Icon,
  className,
  href,
}: QuickActionProps) {
  return (
    <Button
      variant="outline"
      className={`h-24 flex-col gap-2 bg-transparent ${className}`}
      asChild
    >
      <Link href={href || ""}>
        {Icon && <Icon />}
        <div>{title}</div>
      </Link>
    </Button>
  );
}
