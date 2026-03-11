"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

type SelectTriggerProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
  className?: string;
  children?: React.ReactNode;
};

type SelectScrollButtonProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.ScrollUpButton
> & {
  className?: string;
  children?: React.ReactNode;
};

type SelectContentProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
  className?: string;
  children?: React.ReactNode;
};

type SelectViewportProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Viewport> & {
  className?: string;
  children?: React.ReactNode;
};

type SelectLabelProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label> & {
  className?: string;
};

type SelectItemProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
  className?: string;
  children?: React.ReactNode;
};

type SelectSeparatorProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator> & {
  className?: string;
};

type SelectIconProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Icon> & {
  children?: React.ReactNode;
  asChild?: boolean;
};

const SelectTriggerPrimitive = SelectPrimitive.Trigger as React.ForwardRefExoticComponent<
  SelectTriggerProps & React.RefAttributes<HTMLButtonElement>
>;
const SelectIconPrimitive = SelectPrimitive.Icon as React.ForwardRefExoticComponent<
  SelectIconProps & React.RefAttributes<HTMLSpanElement>
>;
const SelectScrollUpPrimitive = SelectPrimitive.ScrollUpButton as React.ForwardRefExoticComponent<
  SelectScrollButtonProps & React.RefAttributes<HTMLDivElement>
>;
const SelectScrollDownPrimitive = SelectPrimitive.ScrollDownButton as React.ForwardRefExoticComponent<
  SelectScrollButtonProps & React.RefAttributes<HTMLDivElement>
>;
const SelectContentPrimitive = SelectPrimitive.Content as React.ForwardRefExoticComponent<
  SelectContentProps & React.RefAttributes<HTMLDivElement>
>;
const SelectViewportPrimitive = SelectPrimitive.Viewport as React.ForwardRefExoticComponent<
  SelectViewportProps & React.RefAttributes<HTMLDivElement>
>;
const SelectLabelPrimitive = SelectPrimitive.Label as React.ForwardRefExoticComponent<
  SelectLabelProps & React.RefAttributes<HTMLDivElement>
>;
const SelectItemPrimitive = SelectPrimitive.Item as React.ForwardRefExoticComponent<
  SelectItemProps & React.RefAttributes<HTMLDivElement>
>;
const SelectSeparatorPrimitive = SelectPrimitive.Separator as React.ForwardRefExoticComponent<
  SelectSeparatorProps & React.RefAttributes<HTMLDivElement>
>;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, children, ...props }, ref) => (
  <SelectTriggerPrimitive
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectIconPrimitive asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectIconPrimitive>
  </SelectTriggerPrimitive>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  SelectScrollButtonProps
>(({ className, ...props }, ref) => (
  <SelectScrollUpPrimitive
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectScrollUpPrimitive>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  SelectScrollButtonProps
>(({ className, ...props }, ref) => (
  <SelectScrollDownPrimitive
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectScrollDownPrimitive>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectContentPrimitive
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectViewportPrimitive
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectViewportPrimitive>
      <SelectScrollDownButton />
    </SelectContentPrimitive>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  SelectLabelProps
>(({ className, ...props }, ref) => (
  <SelectLabelPrimitive
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  SelectItemProps
>(({ className, children, ...props }, ref) => (
  <SelectItemPrimitive
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectItemPrimitive>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  SelectSeparatorProps
>(({ className, ...props }, ref) => (
  <SelectSeparatorPrimitive
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
