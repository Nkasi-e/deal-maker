"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

type TooltipContentProps = {
  className?: string;
  sideOffset?: number;
  children?: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
};

function TooltipContent({ className, sideOffset = 6, children, side = "top", ...props }: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        sideOffset={sideOffset}
        side={side}
        className={cn(
          "z-50 overflow-hidden rounded-md border border-border bg-popover px-3 py-2 text-sm text-popover-foreground shadow-md",
          className
        )}
        {...props}
      >
        {children}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
