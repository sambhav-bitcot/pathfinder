import { HOW_PATHFINDER_WORKS_DATA } from "@/utils/constant";
import { HowPathfinderWorksCard } from "./howPathfinderWorks-card";

export function HowPathfinderWorksSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            How Pathfinder Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get started in minutes and transform your college application
            journey
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {HOW_PATHFINDER_WORKS_DATA.map((item) => (
            <HowPathfinderWorksCard
              key={item.step}
              step={item.step}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
