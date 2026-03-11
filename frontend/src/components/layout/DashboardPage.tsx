import { PageHeader } from "./PageHeader";

interface DashboardPageProps {
  title: string;
  description?: string;
  backLink?: { href: string; label: string };
  children: React.ReactNode;
}

/**
 * Standard dashboard page layout: wrapper + header + content area.
 * Use for every dashboard route to keep structure consistent.
 */
export function DashboardPage({
  title,
  description,
  backLink,
  children,
}: DashboardPageProps) {
  return (
    <div className="min-h-screen border-l border-border">
      <PageHeader
        title={title}
        description={description}
        backLink={backLink}
      />
      <div className="p-8">{children}</div>
    </div>
  );
}
