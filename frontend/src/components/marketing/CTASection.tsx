"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";

export function CTASection() {
  return (
    <section className="relative border-t border-border/60 bg-primary/5 py-24 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_100%,hsl(0_0%_0%_/0.03),transparent)]" />
      <div className="relative mx-auto max-w-2xl px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-display-sm font-semibold text-foreground"
        >
          Ready to let your AI agent handle the deals?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="mt-3 text-muted-foreground"
        >
          Join teams who save time and money on SaaS, suppliers, and freelancers.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.12 }}
        >
          <Button size="lg" className="mt-6 gap-2" asChild>
            <Link href={ROUTES.onboarding}>
              Get started with DealMaker
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
