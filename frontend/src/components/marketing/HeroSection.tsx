"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden gradient-mesh-strong py-28 md:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(0_0%_0%_/0.04),transparent)]" />
      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-block rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm"
        >
          AI-powered negotiation for modern teams
        </motion.span>
        <motion.h1
          className="mt-6 text-display-lg font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
        >
          Your AI agent for negotiating better business deals
        </motion.h1>
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.14 }}
        >
          DealMaker finds, negotiates, and closes deals for you. SaaS, suppliers, freelancers, and more, all in one dashboard with full transparency.
        </motion.p>
        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Button size="lg" asChild className="gap-2 shadow-lg shadow-primary/10">
            <Link href={ROUTES.onboarding}>
              Start free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button size="lg" variant="outline" asChild className="gap-2">
              <Link href={ROUTES.dashboard}>View demo dashboard</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
