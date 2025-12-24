"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { PRIVATE_PATH } from "@/utils/constant";
import { HowPathfinderWorksSection } from "./howPathfinderWorks-section";
import { BuiltForEveryoneSection } from "./builtForEveryone-section";
import { SuccessStoriesSection } from "./successStories-section";
import { CtaSection } from "./cta-section";
import { Footer } from "./footer";
import { Navbar } from "./navbar";
import HeroSection from "./hero-section";
import { FeaturesSection } from "./feature-section";

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      // Redirect based on role
      switch (user.role) {
        case "student":
          router.push(PRIVATE_PATH.STUDENT_DASHBOARD);
          break;
        case "educator":
          router.push(PRIVATE_PATH.EDUCATOR_DASHBOARD);
          break;
        case "admin":
          router.push(PRIVATE_PATH.ADMIN_DASHBOARD);
          break;
      }
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* nav section */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Overview */}
      <FeaturesSection />

      {/* How It Works */}
      <HowPathfinderWorksSection />

      {/* Role-Based Features */}

      <BuiltForEveryoneSection />

      {/* Testimonials */}
      <SuccessStoriesSection />

      {/* Pricing */}
      {/* <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 space-y-6">
              <div>
                <h3 className="text-2xl font-semibold mb-2">Starter</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">$29</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>2 counseling sessions/month</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>College search & matching</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Application tracker</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Basic resources</span>
                </li>
              </ul>
              <Button
                className="w-full bg-transparent"
                variant="outline"
                asChild
              >
                <Link href="/signup">Get Started</Link>
              </Button>
            </Card>

            <Card className="p-8 space-y-6 border-primary shadow-lg scale-105">
              <div className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                Most Popular
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">Professional</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">$79</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>6 counseling sessions/month</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Everything in Starter</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Essay review & editing</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Test prep materials</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Priority support</span>
                </li>
              </ul>
              <Button className="w-full" asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </Card>

            <Card className="p-8 space-y-6">
              <div>
                <h3 className="text-2xl font-semibold mb-2">Premium</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">$149</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Unlimited sessions</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Everything in Professional</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Dedicated counselor</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Parent portal access</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>24/7 support</span>
                </li>
              </ul>
              <Button
                className="w-full bg-transparent"
                variant="outline"
                asChild
              >
                <Link href="/signup">Get Started</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <CtaSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
