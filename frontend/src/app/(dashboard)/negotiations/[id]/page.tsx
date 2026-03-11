"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { motion } from "framer-motion";
import { ArrowLeft, Bot, Building2, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";
import { MOCK_OPPORTUNITIES, MOCK_NEGOTIATION_MESSAGES } from "@/data/mock";
import { format } from "date-fns";

export default function NegotiationWorkspacePage() {
  const params = useParams();
  const id = params.id as string;
  const opp = MOCK_OPPORTUNITIES.find((o) => o.id === id);
  const messages = MOCK_NEGOTIATION_MESSAGES;

  if (!opp) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-8">
        <p className="text-muted-foreground">Negotiation not found.</p>
      </div>
    );
  }

  const progressPercent = 85;

  return (
    <div className="min-h-screen border-l border-border">
      <div className="border-b border-border bg-card/50 px-8 py-4">
        <Link href={ROUTES.negotiations} className="mb-2 inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Negotiations
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-display-sm font-semibold text-foreground">{opp.title}</h1>
            <p className="text-muted-foreground">{opp.vendor}</p>
          </div>
          <Badge variant="default">In progress</Badge>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Negotiation progress</span>
            <span>{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} className="mt-1 h-2" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 p-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Conversation</CardTitle>
              <p className="text-sm text-muted-foreground">Agent messages, vendor responses, and offer history</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex gap-3 ${msg.type === "vendor" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      msg.type === "agent" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {msg.type === "agent" ? <Bot className="h-4 w-4" /> : <Building2 className="h-4 w-4" />}
                  </div>
                  <div className={`flex-1 space-y-1 ${msg.type === "vendor" ? "text-right" : ""}`}>
                    <div
                      className={`inline-block max-w-[85%] rounded-lg px-4 py-2.5 text-sm ${
                        msg.type === "agent" ? "bg-primary/10 text-foreground" : "bg-muted text-foreground"
                      }`}
                    >
                      <p>{msg.content}</p>
                      {msg.offer && (
                        <p className="mt-2 font-medium text-success">
                          Offer: {formatCurrency(msg.offer.amount)}
                          {msg.offer.validUntil && (
                            <span className="ml-1 text-muted-foreground text-xs">valid until {format(new Date(msg.offer.validUntil), "MMM d")}</span>
                          )}
                        </p>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{format(new Date(msg.timestamp), "MMM d, h:mm a")}</p>
                    {msg.reasoning && msg.type === "agent" && (
                      <div className="mt-2 flex items-start gap-2 rounded-md border border-border bg-muted/50 px-3 py-2 text-xs">
                        <Lightbulb className="h-3.5 w-3.5 shrink-0 mt-0.5 text-primary" />
                        <span className="text-muted-foreground">{msg.reasoning}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-primary" />
                Why the agent made this move
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>
                The agent opened with relationship and market data to establish credibility, then countered the vendor&apos;s 15% discount with a 2-year commitment to create a win-win. The latest offer ($1,980) is within your target range and is recommended for approval.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Strategy suggestions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="text-muted-foreground">• Hold for 24h to see if vendor improves</p>
              <p className="text-muted-foreground">• Approve current offer and close</p>
              <p className="text-muted-foreground">• Request human takeover to negotiate manually</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Deal summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Original</span>
                <span>{formatCurrency(opp.currentPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Current offer</span>
                <span className="font-medium text-success">$1,980</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2">
                <span className="text-muted-foreground">Savings</span>
                <span className="font-semibold text-success">$420</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
