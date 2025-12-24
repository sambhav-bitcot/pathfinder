type Props = {
  readonly step: number;
  readonly title: string;
  readonly description: string;
};

export function HowPathfinderWorksCard({ step, title, description }: Props) {
  return (
    <div className="text-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto">
        {step}
      </div>

      <h3 className="text-xl font-semibold">{title}</h3>

      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
