"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ROUTES } from "@/config/routes";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardPage, EmptyState } from "@/components/layout";
import { formatCurrency } from "@/lib/utils";
import { MOCK_OPPORTUNITIES } from "@/data/mock";

const evaluating = MOCK_OPPORTUNITIES.filter((o) => o.status === "evaluating");

export default function EvaluateListPage() {
  return (
    <DashboardPage
      title="Deal evaluation"
      description="Review and approve negotiated deals"
    >
      {evaluating.length === 0 ? (
        <EmptyState message="No deals awaiting evaluation. When the agent reaches a deal, it will appear here." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {evaluating.map((opp, i) => (
            <motion.div
              key={opp.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={ROUTES.evaluateDeal(opp.id)}>
                <Card className="h-full transition-shadow hover:shadow-card-hover">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{opp.title}</CardTitle>
                  <CardDescription>{opp.vendor}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-success font-medium">
                    Potential savings {formatCurrency(opp.potentialSavings)}
                  </p>
                  <p className="mt-2 text-sm font-medium text-primary">Review & approve →</p>
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
