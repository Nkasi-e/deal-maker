import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SpinnerProps {
  className?: string;
  /** Accessible label for screen readers */
  "aria-label"?: string;
}

/** Inline loading indicator with spin animation. Use in cards, tables, or next to text. */
function Spinner({ className, "aria-label": ariaLabel = "Loading", ...props }: SpinnerProps) {
  return (
    <Loader2
      className={cn("animate-spin text-muted-foreground", className)}
      aria-hidden={false}
      aria-label={ariaLabel}
      {...props}
    />
  );
}

Spinner.displayName = "Spinner";

export { Spinner };
