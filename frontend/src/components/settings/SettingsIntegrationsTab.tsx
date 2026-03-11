"use client";

import * as React from "react";
import { Plug } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  INTEGRATION_SECTIONS,
  INTEGRATIONS,
  type IntegrationState,
} from "@/data/settings-integrations";

export function SettingsIntegrationsTab() {
  const [states, setStates] = React.useState<Record<string, IntegrationState>>(() =>
    INTEGRATIONS.reduce<Record<string, IntegrationState>>((acc, integration) => {
      acc[integration.id] = integration.initialState;
      return acc;
    }, {})
  );

  const handleConnect = (id: string) => {
    setStates((prev) => {
      const current = prev[id];
      if (current !== "connectable") return prev;
      return { ...prev, [id]: "connected" };
    });
  };

  return (
    <Card className="shadow-card transition-shadow hover:shadow-card-hover">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plug className="h-5 w-5" />
          Integrations
        </CardTitle>
        <CardDescription>
          Connect the tools DealMaker needs to prospect, communicate, schedule, and close deals end-to-end.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {INTEGRATION_SECTIONS.map((section) => {
          const items = INTEGRATIONS.filter((i) => i.category === section.id);
          if (!items.length) return null;

          return (
            <section key={section.id} className="space-y-3">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-sm font-semibold">{section.title}</h3>
              </div>
              <p className="text-xs text-muted-foreground">{section.description}</p>

              <div className="flex flex-col gap-2">
                {items.map((integration) => {
                  const state = states[integration.id];
                  const isConnectable = state === "connectable";
                  const isConnected = state === "connected";
                  const isComingSoon = state === "comingSoon";

                  return (
                    <Card
                      key={integration.id}
                      className="w-full border border-border/70 shadow-none transition-shadow hover:shadow-card-hover"
                    >
                      <div className="flex w-full items-center justify-between gap-4 px-4 py-3">
                        <div className="min-w-0 space-y-1">
                          <CardTitle className="truncate text-sm font-medium leading-snug">
                            {integration.name}
                          </CardTitle>
                          <CardDescription className="text-xs text-muted-foreground">
                            {integration.description}
                          </CardDescription>
                        </div>
                        <div className="shrink-0">
                          {isConnectable && (
                            <Button
                              size="sm"
                              className="text-xs"
                              onClick={() => handleConnect(integration.id)}
                            >
                              Connect
                            </Button>
                          )}
                          {isConnected && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs border-success/40 bg-success/10 text-success hover:bg-success/15"
                              disabled
                            >
                              <span className="inline-flex items-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                                Connected
                              </span>
                            </Button>
                          )}
                          {isComingSoon && (
                            <Button size="sm" variant="outline" className="text-xs" disabled>
                              Coming soon
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </section>
          );
        })}
      </CardContent>
    </Card>
  );
}
