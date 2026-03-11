"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, RefreshCw } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardPage } from "@/components/layout";
import { useToast } from "@/components/ui/toast";
import { formatCurrency } from "@/lib/utils";
import { MOCK_OPPORTUNITIES } from "@/data/mock";

const MOCK_DEAL = {
  originalPrice: 2400,
  negotiatedPrice: 1980,
  savings: 420,
  reason:
    "The agent secured a 17.5% discount with a 2-year commitment. This is within market benchmarks and your target savings. The vendor has a high reliability score and fast response time.",
};

export default function DealEvaluationPage() {
  const params = useParams();
  const router = useRouter();
  const toast = useToast();
  const id = params.id as string;
  const opp = MOCK_OPPORTUNITIES.find((o) => o.id === id);
  const [approving, setApproving] = useState(false);

  if (!opp) {
    return (
      <div className="min-h-screen border-l border-border flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-muted-foreground">Deal not found.</p>
          <Link href={ROUTES.evaluate} className="mt-2 inline-block text-primary hover:underline">
            Back to evaluate
          </Link>
        </div>
      </div>
    );
  }

  const approve = () => {
    setApproving(true);
    toast.success("Deal approved");
    setTimeout(() => router.push(ROUTES.dashboard), 800);
  };

  return (
    <DashboardPage
      title="Deal evaluation"
      description={`${opp.vendor}. Review and approve or request renegotiation`}
      backLink={{ href: ROUTES.negotiations, label: "Negotiations" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-2xl space-y-6"
      >
        <Card>
          <CardHeader>
            <CardTitle>{opp.title}</CardTitle>
            <CardDescription>{opp.vendor}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg border border-border bg-muted/30 p-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Original price</span>
                <span className="line-through">{formatCurrency(MOCK_DEAL.originalPrice)}</span>
              </div>
              <div className="mt-3 flex justify-between text-sm">
                <span className="text-muted-foreground">New negotiated price</span>
                <span className="font-semibold text-success">{formatCurrency(MOCK_DEAL.negotiatedPrice)}</span>
              </div>
              <div className="mt-3 flex justify-between border-t border-border pt-3">
                <span className="text-muted-foreground">Savings</span>
                <span className="text-lg font-bold text-success">{formatCurrency(MOCK_DEAL.savings)}</span>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-foreground">Why this deal was selected</h3>
              <p className="mt-2 text-sm text-muted-foreground">{MOCK_DEAL.reason}</p>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-3">
          <Button size="lg" onClick={approve} loading={approving} className="gap-2">
            <Check className="h-4 w-4" />
            Approve deal
          </Button>
          <Button size="lg" variant="outline" className="gap-2" asChild>
            <Link href={ROUTES.negotiation(id)}>
              <RefreshCw className="h-4 w-4" />
              Request renegotiation
            </Link>
          </Button>
        </div>
      </motion.div>
    </DashboardPage>
  );
}
