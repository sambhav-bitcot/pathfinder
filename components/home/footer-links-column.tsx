import Link from "next/link";

type Props = {
  readonly title: string;
  readonly links: { label: string; href: string }[];
};

export function FooterLinksColumn({ title, links }: Props) {
  return (
    <div className="space-y-4">
      <h4 className="font-semibold">{title}</h4>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {links.map((link, index) => (
          <li key={index+1}>
            <Link
              href={link.href}
              className="hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
