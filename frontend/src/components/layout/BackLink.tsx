import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type LinkChildren = React.ComponentPropsWithoutRef<typeof Link>["children"];

interface BackLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function BackLink({ href, children, className }: BackLinkProps) {
  return (
    <Link
      href={href}
      className={
        className ??
        "inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      }
    >
      <ArrowLeft className="mr-1 h-4 w-4" />
      {(children as unknown) as LinkChildren}
    </Link>
  );
}
