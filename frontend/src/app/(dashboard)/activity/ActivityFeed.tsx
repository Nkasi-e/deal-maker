"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Send,
  MessageSquare,
  RefreshCw,
  CheckCircle2,
  ThumbsUp,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import type { ActivityItem } from "@/data/mock";

const typeConfig: Record<
  string,
  { icon: typeof Sparkles; label: string; variant: "default" | "secondary" | "success" }
> = {
  opportunity_detected: { icon: Sparkles, label: "Detected", variant: "secondary" },
  message_sent: { icon: Send, label: "Sent", variant: "default" },
  vendor_replied: { icon: MessageSquare, label: "Reply", variant: "secondary" },
  offer_countered: { icon: RefreshCw, label: "Countered", variant: "default" },
  deal_reached: { icon: CheckCircle2, label: "Deal", variant: "success" },
  deal_approved: { icon: ThumbsUp, label: "Approved", variant: "success" },
};

interface ActivityFeedProps {
  items: ActivityItem[];
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle className="text-base">Activity feed</CardTitle>
        <CardDescription>Chronological list of agent and deal events</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-0">
          {items.map((item, i) => {
            const config = typeConfig[item.type] ?? { icon: Sparkles, label: item.type, variant: "secondary" as const };
            const Icon = config.icon;
            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex gap-4 border-b border-border py-4 last:border-0"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium text-foreground">{item.title}</span>
                    <Badge variant={config.variant} className="text-xs">{config.label}</Badge>
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">{item.description}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{format(new Date(item.timestamp), "MMM d, h:mm a")}</p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
