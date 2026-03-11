"use client";

import { motion } from "framer-motion";
import { Building2, TrendingDown, Clock, Shield, FileCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardPage } from "@/components/layout";
import { MOCK_VENDORS } from "@/data/mock";

export default function VendorIntelligencePage() {
  return (
    <DashboardPage
      title="Vendor intelligence"
      description="Historical negotiation outcomes, average discounts, response speed, and reliability"
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_VENDORS.map((v, i) => (
            <motion.div key={v.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    <CardTitle className="text-base">{v.name}</CardTitle>
                  </div>
                  <CardDescription className="capitalize">{v.category}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <TrendingDown className="h-4 w-4" />
                      Avg. discount
                    </span>
                    <span className="font-medium">{v.avgDiscount}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      Response speed
                    </span>
                    <span className="font-medium">{v.responseSpeedHours}h</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Shield className="h-4 w-4" />
                      Reliability score
                    </span>
                    <span className="font-medium">{v.reliabilityScore}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <FileCheck className="h-4 w-4" />
                      Deals closed
                    </span>
                    <span className="font-medium">{v.dealsClosed}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
      </div>
      <Card className="mt-8">
        <CardContent className="py-8 text-center text-sm text-muted-foreground">
          Historical negotiation outcomes and trend charts can be added here when backend is connected.
        </CardContent>
      </Card>
    </DashboardPage>
  );
}
