import {  CheckCircle, Star } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="py-20 md:py-32 bg-linear-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Star className="w-4 h-4" />
            Trusted by 10,000+ students nationwide
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
            Your Journey to College Success Starts Here
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground text-balance max-w-3xl mx-auto">
            Connect with expert counselors, track applications, prepare for
            tests, and navigate the entire college admissions process with
            confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              variant="outline"
              className="text-lg h-14 px-8 bg-transparent"
              asChild
            >
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
          <div className="flex items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              No credit card required
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
