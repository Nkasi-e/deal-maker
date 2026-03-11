"use client";

import { Suspense } from "react";
import { AuthFormCard } from "@/components/auth";
import { AuthFallback } from "@/components/auth";

export default function SignUpPage() {
  return (
    <Suspense fallback={<AuthFallback />}>
      <AuthFormCard />
    </Suspense>
  );
}
