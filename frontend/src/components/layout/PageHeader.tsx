import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  backLink?: { href: string; label: string };
}

export function PageHeader({ title, description, backLink }: PageHeaderProps) {
  return (
    <header className="border-b border-border bg-card/50 px-8 py-6">
      {backLink && (
        <Link
          href={backLink.href}
          className="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          {backLink.label}
        </Link>
      )}
      <h1 className="text-display-sm font-semibold text-foreground">{title}</h1>
      {description && <p className="mt-1 text-muted-foreground">{description}</p>}
    </header>
  );
}
