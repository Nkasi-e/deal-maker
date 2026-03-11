"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

type SliderRootProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
  className?: string;
  children?: React.ReactNode;
};

type SliderTrackProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Track> & {
  className?: string;
  children?: React.ReactNode;
};

type SliderRangeProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Range> & {
  className?: string;
};

type SliderThumbProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Thumb> & {
  className?: string;
};

const SliderRoot = SliderPrimitive.Root as React.ForwardRefExoticComponent<
  SliderRootProps & React.RefAttributes<HTMLSpanElement>
>;
const SliderTrack = SliderPrimitive.Track as React.ForwardRefExoticComponent<
  SliderTrackProps & React.RefAttributes<HTMLSpanElement>
>;
const SliderRange = SliderPrimitive.Range as React.ForwardRefExoticComponent<
  SliderRangeProps & React.RefAttributes<HTMLSpanElement>
>;
const SliderThumb = SliderPrimitive.Thumb as React.ForwardRefExoticComponent<
  SliderThumbProps & React.RefAttributes<HTMLSpanElement>
>;

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderRootProps
>(({ className, ...props }, ref) => (
  <SliderRoot
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderTrack className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderRange className="absolute h-full bg-primary" />
    </SliderTrack>
    <SliderThumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-transform duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:scale-110 data-[dragging]:scale-110 disabled:pointer-events-none disabled:opacity-50" />
  </SliderRoot>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
