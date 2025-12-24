import { GraduationCap } from "lucide-react";
import { FOOTER_LINK } from "@/utils/constant";
import { FooterLinksColumn } from "./footer-links-column";

export function Footer() {
  return (
    <footer className="py-12 bg-card border-t">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold">Pathfinder</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering students to achieve their college dreams through expert
              guidance and comprehensive tools.
            </p>
          </div>

          {/* Link Columns */}
          {FOOTER_LINK.map((column, index) => (
            <FooterLinksColumn
              key={index+1}
              title={column.title}
              links={column.links}
            />
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Pathfinder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
