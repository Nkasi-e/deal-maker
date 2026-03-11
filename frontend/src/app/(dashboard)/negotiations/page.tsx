"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ROUTES } from "@/config/routes";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardPage, EmptyState } from "@/components/layout";
import { formatCurrency } from "@/lib/utils";
import { MOCK_OPPORTUNITIES } from "@/data/mock";

const active = MOCK_OPPORTUNITIES.filter(
  (o) => o.status === "negotiating" || o.status === "evaluating"
);

export default function NegotiationsListPage() {
  return (
    <DashboardPage
      title="Negotiations"
      description="Active negotiation workspaces"
    >
      {active.length === 0 ? (
        <EmptyState message="No active negotiations. Start from an opportunity on the Dashboard or Opportunities page." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {active.map((opp, i) => (
            <motion.div
              key={opp.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={ROUTES.negotiation(opp.id)}>
                <Card className="h-full transition-shadow hover:shadow-card-hover">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{opp.title}</CardTitle>
                  <CardDescription>{opp.vendor}</CardDescription>
                  <Badge variant="default" className="mt-2 w-fit">
                    {opp.status}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Potential savings {formatCurrency(opp.potentialSavings)}
                  </p>
                  <p className="mt-2 text-sm font-medium text-primary">Open workspace →</p>
                </CardContent>
              </Card>
            </Link>
            </motion.div>
          ))}
        </div>
      )}
    </DashboardPage>
  );
}
