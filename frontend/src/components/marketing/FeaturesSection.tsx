"use client";

import { motion } from "framer-motion";
import type { LandingFeature } from "@/data/landing";
import { LANDING_FEATURES } from "@/data/landing";

function FeatureCard({ item, index }: { item: LandingFeature; index: number }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      className="group rounded-xl border border-border/80 bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 font-semibold text-foreground">{item.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
    </motion.div>
  );
}

export function FeaturesSection() {
  return (
    <section className="py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-display-sm font-semibold text-foreground">
            One agent. Every deal.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Discover savings, negotiate terms, and close contracts without the back-and-forth.
          </p>
        </motion.div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LANDING_FEATURES.map((item, i) => (
            <FeatureCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
