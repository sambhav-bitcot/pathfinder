import { BUILT_FOR_EVERYONE_DATA } from "@/utils/constant";
import { BuiltForEveryoneCard } from "./builtForEveryone-card";

export function BuiltForEveryoneSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">Built for Everyone</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tailored experiences for students, educators, and administrators
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {BUILT_FOR_EVERYONE_DATA.map((item, index) => (
            <BuiltForEveryoneCard key={index+1} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
