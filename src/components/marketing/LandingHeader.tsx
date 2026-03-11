"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";

export function LandingHeader() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 border-b border-border/60 bg-card/40 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link
          href={ROUTES.home}
          className="font-semibold text-foreground transition-opacity hover:opacity-90"
        >
          <span className="text-primary">Deal</span>Maker
        </Link>
        <nav className="flex items-center gap-1">
          <Link
            href={ROUTES.authSignin}
            className="inline-flex h-10 items-center px-4 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Sign in
          </Link>
          <Button asChild>
            <Link href={ROUTES.onboarding} className="gap-2">
              Get started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </nav>
      </div>
    </motion.header>
  );
}
