"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ROUTES } from "@/config/routes";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, getOpportunityBadgeVariant } from "@/lib/utils";
import type { Opportunity } from "@/data/mock";

interface OpportunitiesGridProps {
  opportunities: Opportunity[];
}

export function OpportunitiesGrid({ opportunities }: OpportunitiesGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {opportunities.map((opp, i) => (
        <motion.div
          key={opp.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <Link href={ROUTES.opportunity(opp.id)}>
            <Card className="h-full transition-shadow hover:shadow-card-hover">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base">{opp.title}</CardTitle>
                  <Badge variant={getOpportunityBadgeVariant(opp.status)}>{opp.status}</Badge>
                </div>
                <CardDescription>{opp.vendor}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Current</span>
                  <span>{formatCurrency(opp.currentPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Market benchmark</span>
                  <span>{formatCurrency(opp.marketBenchmark)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Potential savings</span>
                  <span className="font-medium text-success">{formatCurrency(opp.potentialSavings)}</span>
                </div>
                <div className="mt-3 flex items-center text-sm font-medium text-primary">
                  View details <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
