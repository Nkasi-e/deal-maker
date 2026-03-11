"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ROUTES } from "@/config/routes";
import { ArrowRight, TrendingUp, MessageSquare, Sparkles, Building2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardPage } from "@/components/layout";
import { formatCurrency, getOpportunityBadgeVariant } from "@/lib/utils";
import { MOCK_OPPORTUNITIES, MOCK_SAVINGS } from "@/data/mock";

export default function DashboardPageRoute() {
  return (
    <DashboardPage
      title="Deal discovery"
      description="Your command center for savings and active negotiations"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Monthly savings",
            value: formatCurrency(MOCK_SAVINGS.monthlySavings),
            sub: `${formatCurrency(MOCK_SAVINGS.annualSavings)} annual run rate`,
            icon: TrendingUp,
            valueClassName: "text-success",
          },
          {
            label: "Active negotiations",
            value: String(MOCK_SAVINGS.activeNegotiations),
            sub: "Agent is handling",
            icon: MessageSquare,
            valueClassName: "",
          },
          {
            label: "Deals closed",
            value: String(MOCK_SAVINGS.dealsClosed),
            sub: "This quarter",
            icon: MessageSquare,
            valueClassName: "",
          },
          {
            label: "Success rate",
            value: `${MOCK_SAVINGS.successRate}%`,
            sub: "Negotiations won",
            icon: MessageSquare,
            valueClassName: "",
          },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {item.label}
                </CardTitle>
                {i === 0 && <item.icon className="h-4 w-4 text-success" />}
                {i === 1 && <item.icon className="h-4 w-4 text-primary" />}
              </CardHeader>
              <CardContent>
                <p className={`text-2xl font-bold ${item.valueClassName}`}>{item.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.sub}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Detected opportunities
          </h2>
          <Link href={ROUTES.opportunities} className="text-sm font-medium text-primary hover:underline">
            View all
          </Link>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_OPPORTUNITIES.slice(0, 6).map((opp, i) => (
            <motion.div
              key={opp.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.03 }}
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
                      <span className="text-muted-foreground">Potential savings</span>
                      <span className="font-medium text-success">{formatCurrency(opp.potentialSavings)}</span>
                    </div>
                    <div className="mt-3 flex items-center text-sm font-medium text-primary">
                      View opportunity <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Building2 className="h-5 w-5 text-muted-foreground" />
          Vendor monitoring
        </h2>
        <Card className="mt-4">
          <CardContent className="py-8 text-center text-muted-foreground">
            Contracts and renewals are tracked here. Connect your tools in Settings to enable.
          </CardContent>
        </Card>
      </div>
    </DashboardPage>
  );
}
