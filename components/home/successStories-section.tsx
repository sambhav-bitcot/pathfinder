import { SUCCESS_STORIES_DATA } from "@/utils/constant";
import { SuccessStoryCard } from "./successStory-card";

export function SuccessStoriesSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">Success Stories</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear from students who achieved their college dreams with Pathfinder
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {SUCCESS_STORIES_DATA.map((story, index) => (
            <SuccessStoryCard key={index+1} {...story} />
          ))}
        </div>
      </div>
    </section>
  );
}
