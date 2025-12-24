interface PageHeaderProps {
  className?:string
  title?: string;
  desc?: string;
}

export default function PageHeader({ title, desc,className }: PageHeaderProps) {
  return (
    <div className={`w-full ${className}`}>
      <h1 className="text-3xl font-bold ">{title}</h1>
      <p className="text-md text-muted-foreground">{desc}</p>
    </div>
  );
}
