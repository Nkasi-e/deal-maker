export function LandingFooter() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} DealMaker. AI-powered negotiation for modern teams.
      </div>
    </footer>
  );
}
