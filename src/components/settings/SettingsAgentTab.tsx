"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { SETTINGS_DEAL_TYPES } from "@/data/settings";
import { STAGGER_VARIANTS, ITEM_VARIANT } from "./settingsVariants";
import { cn } from "@/lib/utils";

interface SettingsAgentTabProps {
  dealTypes: string[];
  toggleDealType: (id: string) => void;
  targetSavings: number;
  setTargetSavings: (v: number) => void;
  aggressiveness: number;
  setAggressiveness: (v: number) => void;
  autoApproveBelow: string;
  setAutoApproveBelow: (v: string) => void;
  manualApprovalAbove: string;
  setManualApprovalAbove: (v: string) => void;
  saving: boolean;
  onSave: () => void;
}

export function SettingsAgentTab(props: SettingsAgentTabProps) {
  const {
    dealTypes,
    toggleDealType,
    targetSavings,
    setTargetSavings,
    aggressiveness,
    setAggressiveness,
    autoApproveBelow,
    setAutoApproveBelow,
    manualApprovalAbove,
    setManualApprovalAbove,
    saving,
    onSave,
  } = props;

  return (
    <Card className="shadow-card transition-shadow hover:shadow-card-hover">
      <CardHeader>
        <CardTitle>Agent preferences</CardTitle>
        <CardDescription>
          Deal types, negotiation style, approval rules, and target savings. Aligns with onboarding; editable here anytime.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div className="space-y-6" variants={STAGGER_VARIANTS} initial="initial" animate="animate">
          <motion.div variants={ITEM_VARIANT}>
            <Label className="mb-3 block">Deal types</Label>
            <div className="flex flex-wrap gap-2">
              {SETTINGS_DEAL_TYPES.map((deal) => {
                const Icon = deal.icon;
                const selected = dealTypes.includes(deal.id);
                return (
                  <motion.button
                    key={deal.id}
                    type="button"
                    onClick={() => toggleDealType(deal.id)}
                    className={cn(
                      "flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors",
                      selected ? "border-primary bg-primary/10 text-foreground" : "border-input bg-background hover:bg-muted/50"
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="h-4 w-4" />
                    {deal.label}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
          <motion.div variants={ITEM_VARIANT}>
            <Label className="mb-2 block">Target savings (%)</Label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Slider value={[targetSavings]} onValueChange={([v]) => setTargetSavings(v)} min={5} max={40} step={1} />
              </div>
              <span className="w-10 text-sm font-medium tabular-nums">{targetSavings}%</span>
            </div>
          </motion.div>
          <motion.div variants={ITEM_VARIANT}>
            <Label className="mb-2 block">Negotiation aggressiveness</Label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Slider value={[aggressiveness]} onValueChange={([v]) => setAggressiveness(v)} min={0} max={100} step={5} />
              </div>
              <span className="w-10 text-sm font-medium tabular-nums">{aggressiveness}%</span>
            </div>
          </motion.div>
          <motion.div className="grid gap-4 sm:grid-cols-2" variants={ITEM_VARIANT}>
            <div className="space-y-2">
              <Label htmlFor="auto-approve">Auto-approve deals &lt; ($)</Label>
              <Input id="auto-approve" type="number" min={0} value={autoApproveBelow} onChange={(e) => setAutoApproveBelow(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="manual-approve">Manual approval for deals ≥ ($)</Label>
              <Input id="manual-approve" type="number" min={0} value={manualApprovalAbove} onChange={(e) => setManualApprovalAbove(e.target.value)} />
            </div>
          </motion.div>
          <motion.div variants={ITEM_VARIANT}>
            <Button loading={saving} onClick={onSave}>
              Save agent preferences
            </Button>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
