"use client";

import { motion } from "framer-motion";
import { LANDING_STATS } from "@/data/landing";

export function StatsStrip() {
  return (
    <section className="border-y border-border/60 bg-muted/20 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          className="grid grid-cols-1 gap-8 sm:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
            hidden: {},
          }}
        >
          {LANDING_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              className="text-center"
            >
              <span className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {stat.value}
              </span>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
