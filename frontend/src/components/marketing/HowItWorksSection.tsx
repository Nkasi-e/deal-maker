"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { LANDING_STEPS } from "@/data/landing";

export function HowItWorksSection() {
  return (
    <section className="border-t border-border/60 bg-muted/30 py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-display-sm font-semibold text-foreground">
            How it works
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Set your preferences once. The agent handles discovery, messaging, and recommendations.
          </p>
        </motion.div>

        <div className="mt-14 hidden lg:flex lg:items-start lg:justify-between">
          {LANDING_STEPS.map((step, i) => (
            <div key={step.label} className="flex flex-1 items-start">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="flex min-w-0 flex-1 flex-col items-center px-1"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-background bg-primary text-sm font-semibold text-primary-foreground shadow-sm">
                  {step.num}
                </span>
                <div className="mt-3 flex flex-col items-center gap-1.5 text-center">
                  <step.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium leading-tight text-foreground">
                    {step.label}
                  </span>
                </div>
              </motion.div>
              {i < LANDING_STEPS.length - 1 && (
                <div className="flex shrink-0 items-center self-start pt-5" aria-hidden>
                  <div className="h-px w-6 bg-border" />
                  <ChevronRight className="-ml-px h-4 w-4 text-muted-foreground/60" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="relative mt-14 lg:hidden">
          <div className="absolute left-5 top-5 bottom-5 w-px bg-border/80" aria-hidden />
          <ul className="space-y-0">
            {LANDING_STEPS.map((step, i) => (
              <motion.li
                key={step.label}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="relative flex items-start gap-4 pb-8 last:pb-0"
              >
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-background bg-primary text-sm font-semibold text-primary-foreground shadow-sm">
                  {step.num}
                </span>
                <div className="flex flex-1 items-center gap-3 rounded-lg border border-border/60 bg-card/60 px-4 py-3 backdrop-blur-sm">
                  <step.icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="font-medium text-foreground">{step.label}</span>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
