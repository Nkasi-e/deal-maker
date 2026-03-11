"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ROUTES } from "@/config/routes";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen gradient-mesh-strong">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-20 top-1/2 h-96 w-96 rounded-full bg-muted/40 blur-3xl" />
      </div>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="sticky top-0 z-50 border-b border-border/50 bg-card/30 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href={ROUTES.home} className="font-semibold text-foreground transition-opacity hover:opacity-90">
            <span className="text-primary">Deal</span>Maker
          </Link>
          <Link href={ROUTES.home} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            ← Back
          </Link>
        </div>
      </motion.header>
      <main className="relative mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-md flex-col items-center justify-center px-4 py-12">
        {children}
      </main>
    </div>
  );
}
