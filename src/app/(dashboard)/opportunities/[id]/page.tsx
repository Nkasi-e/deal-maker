"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ROUTES } from "@/config/routes";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardPage } from "@/components/layout";
import { useToast } from "@/components/ui/toast";
import { formatCurrency, getOpportunityBadgeVariant } from "@/lib/utils";
import { MOCK_OPPORTUNITIES } from "@/data/mock";

export default function OpportunityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const toast = useToast();
  const [starting, setStarting] = useState(false);
  const id = params.id as string;
  const opp = MOCK_OPPORTUNITIES.find((o) => o.id === id);

  if (!opp) {
    return (
      <div className="min-h-screen border-l border-border flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-muted-foreground">Opportunity not found.</p>
          <Link href={ROUTES.opportunities} className="mt-2 inline-block text-primary hover:underline">
            Back to opportunities
          </Link>
        </div>
      </div>
    );
  }
  const startNegotiation = () => {
    setStarting(true);
    toast.success("Negotiation started");
    setTimeout(() => router.push(ROUTES.negotiation(opp.id)), 700);
  };

  return (
    <DashboardPage
      title={opp.title}
      description={opp.vendor}
      backLink={{ href: ROUTES.opportunities, label: "Opportunities" }}
    >
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Deal summary</CardTitle>
              <Badge variant={getOpportunityBadgeVariant(opp.status)}>{opp.status}</Badge>
            </div>
            <CardDescription>Current vendor and market context</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between border-b border-border pb-3">
              <span className="text-muted-foreground">Current vendor</span>
              <span className="font-medium">{opp.vendor}</span>
            </div>
            <div className="flex justify-between border-b border-border pb-3">
              <span className="text-muted-foreground">Current price</span>
              <span>{formatCurrency(opp.currentPrice)}</span>
            </div>
            <div className="flex justify-between border-b border-border pb-3">
              <span className="text-muted-foreground">Market benchmark</span>
              <span>{formatCurrency(opp.marketBenchmark)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Potential savings</span>
              <span className="font-semibold text-success">{formatCurrency(opp.potentialSavings)}</span>
            </div>
          </CardContent>
        </Card>

        {opp.status === "detected" && (
          <div className="flex gap-3">
            <Button onClick={startNegotiation} loading={starting} size="lg">
              Start negotiation
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href={ROUTES.vendors}>Compare vendors</Link>
            </Button>
          </div>
        )}
        {opp.status === "negotiating" && (
          <Button onClick={startNegotiation} loading={starting} size="lg">
            Open negotiation workspace
          </Button>
        )}
        {opp.status === "evaluating" && (
          <Button size="lg" asChild>
            <Link href={ROUTES.evaluateDeal(opp.id)}>Review deal & approve</Link>
          </Button>
        )}
      </motion.div>
    </DashboardPage>
  );
}
