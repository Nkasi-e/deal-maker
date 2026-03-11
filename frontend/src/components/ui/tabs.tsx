"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

type TabsProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & { children?: React.ReactNode; className?: string };
const Tabs = TabsPrimitive.Root as React.ForwardRefExoticComponent<TabsProps & React.RefAttributes<HTMLDivElement>>;

type TabsListProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & { children?: React.ReactNode; className?: string };
const TabsList = React.forwardRef<React.ElementRef<typeof TabsPrimitive.List>, TabsListProps>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    {...({
      ...props,
      className: cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        className
      ),
    } as React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>)}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

type TabsTriggerProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & { children?: React.ReactNode; className?: string };
const TabsTrigger = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Trigger>, TabsTriggerProps>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    {...({
      ...props,
      className: cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium text-muted-foreground ring-offset-background transition-all duration-200 hover:bg-muted/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[hsl(var(--tab-active))] data-[state=active]:text-[hsl(var(--tab-active-foreground))] data-[state=active]:shadow-md data-[state=active]:hover:bg-[hsl(var(--tab-active))]/90 data-[state=active]:hover:text-[hsl(var(--tab-active-foreground))]",
        className
      ),
    } as React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>)}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

type TabsContentProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & { className?: string };
const TabsContent = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Content>, TabsContentProps>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    {...({
      ...props,
      className: cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      ),
    } as React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>)}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
