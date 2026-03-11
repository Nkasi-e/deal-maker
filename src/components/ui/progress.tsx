"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

type ProgressRootProps = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
  className?: string;
  children?: React.ReactNode;
};

type ProgressIndicatorProps = React.ComponentPropsWithoutRef<
  typeof ProgressPrimitive.Indicator
> & {
  className?: string;
  style?: React.CSSProperties;
};

const ProgressRoot = ProgressPrimitive.Root as React.ForwardRefExoticComponent<
  ProgressRootProps & React.RefAttributes<HTMLDivElement>
>;
const ProgressIndicator = ProgressPrimitive.Indicator as React.ForwardRefExoticComponent<
  ProgressIndicatorProps & React.RefAttributes<HTMLDivElement>
>;

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressRootProps
>(({ className, value, ...props }, ref) => (
  <ProgressRoot
    ref={ref}
    value={value}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressIndicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressRoot>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
