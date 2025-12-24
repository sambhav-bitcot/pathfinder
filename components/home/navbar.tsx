import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PUBLIC_ROUTE } from "@/utils/constant";

export function Navbar() {
  return (
    <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold">Pathfinder</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href={PUBLIC_ROUTE.LOGIN}>Sign In</Link>
            </Button>
            <Button asChild>
              <Link href={PUBLIC_ROUTE.SIGNUP}>Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
