"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";
import { ROUTES } from "@/config/routes";
import { GoogleIcon } from "./GoogleIcon";

const FORM_STAGGER = { initial: {}, animate: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } } };
const ITEM_VAR = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } };

const inputClass = "border-border/70 bg-background/50 backdrop-blur-sm transition-colors focus:bg-background";

export function AuthFormCard() {
  const pathname = usePathname();
  const toast = useToast();
  const isSignIn = pathname === ROUTES.authSignin;
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    toast.success(isSignIn ? "Signed in successfully" : "Account created");
    setTimeout(() => {
      setLoading(false);
      window.location.href = ROUTES.dashboard;
    }, 1000);
  };

  const handleGoogle = () => {
    window.location.href = ROUTES.dashboard;
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isSignIn ? "signin" : "signup"}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25 }}
        className="w-full"
      >
        <Card className="glass-card border-border/60 shadow-xl">
          <CardHeader className="space-y-1 pb-4">
            <motion.div variants={ITEM_VAR} initial="initial" animate="animate">
              <CardTitle className="text-xl">{isSignIn ? "Sign in" : "Create an account"}</CardTitle>
            </motion.div>
            <motion.div variants={ITEM_VAR} initial="initial" animate="animate" transition={{ delay: 0.05 }}>
              <CardDescription>
                {isSignIn
                  ? "Enter your email and password to sign in."
                  : "Enter your company, email, and password to create an account."}
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className="space-y-4">
            <motion.form onSubmit={handleSubmit} className="space-y-4" variants={FORM_STAGGER} initial="initial" animate="animate">
              <AnimatePresence>
                {!isSignIn && (
                  <motion.div key="company" className="space-y-2" variants={ITEM_VAR} exit={{ opacity: 0, height: 0, marginBottom: 0, overflow: "hidden" }}>
                    <Label htmlFor="company">Company name</Label>
                    <Input id="company" type="text" placeholder="Acme Inc." value={companyName} onChange={(e) => setCompanyName(e.target.value)} autoComplete="organization" className={inputClass} />
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div className="space-y-2" variants={ITEM_VAR}>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required className={inputClass} />
              </motion.div>
              <motion.div className="space-y-2" variants={ITEM_VAR}>
                <Label htmlFor="password">Password</Label>
                <PasswordInput id="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={isSignIn ? "current-password" : "new-password"} required className={inputClass} />
              </motion.div>
              <motion.div variants={ITEM_VAR}>
                <Button type="submit" className="w-full" loading={loading}>
                  {isSignIn ? "Sign in" : "Create account"}
                </Button>
              </motion.div>
            </motion.form>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/60" />
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-wider">
                <span className="bg-[hsl(0_0%_100%_/0.65)] px-2 text-muted-foreground backdrop-blur-sm">or</span>
              </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Button type="button" variant="outline" className="w-full gap-2 border-border/70 bg-background/30 backdrop-blur-sm hover:bg-background/50" onClick={handleGoogle}>
                <GoogleIcon className="h-4 w-4" />
                Continue with Google
              </Button>
            </motion.div>
          </CardContent>
        </Card>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="mt-6 text-center text-sm text-muted-foreground">
          {isSignIn ? (
            <>
              Don&apos;t have an account?{" "}
              <Link href={ROUTES.authSignup} className="font-medium text-primary hover:underline">
                Sign up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link href={ROUTES.authSignin} className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </>
          )}
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
