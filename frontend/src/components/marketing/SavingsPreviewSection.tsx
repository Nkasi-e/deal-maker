"use client";

import { motion } from "framer-motion";

export function SavingsPreviewSection() {
  return (
    <section className="border-t border-border/60 bg-muted/20 py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-display-sm font-semibold text-foreground">
            Real savings, clear reasoning
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Every recommendation shows original price, negotiated price, and why the agent chose it.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mx-auto mt-12 max-w-md rounded-xl border border-border/80 bg-card p-6 shadow-card"
        >
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Original price</span>
            <span className="font-medium line-through">$2,400/yr</span>
          </div>
          <div className="mt-3 flex justify-between text-sm">
            <span className="text-muted-foreground">Negotiated price</span>
            <span className="font-semibold text-success">$1,980/yr</span>
          </div>
          <div className="mt-3 flex justify-between border-t border-border pt-3 text-sm">
            <span className="text-muted-foreground">You save</span>
            <span className="font-semibold text-success">$420/yr</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
