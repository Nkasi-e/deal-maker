"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export function TestimonialSection() {
  return (
    <section className="py-24 md:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-border/80 bg-card/50 p-8 shadow-sm backdrop-blur-sm md:p-12"
        >
          <Quote className="mx-auto h-10 w-10 text-primary/20" />
          <blockquote className="mt-4 text-lg font-medium leading-relaxed text-foreground md:text-xl">
            We cut renewal negotiations from weeks to days. The agent found savings we didn&apos;t know were on the table, and we approved everything from one place.
          </blockquote>
          <p className="mt-6 text-sm text-muted-foreground">
            Operations lead, B2B SaaS
          </p>
        </motion.div>
      </div>
    </section>
  );
}
