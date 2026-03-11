import type { Metadata } from "next";
import React from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DealMaker - Your AI agent for negotiating better business deals",
  description: "AI agent platform that finds, negotiates, and closes business deals automatically.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={sans.variable}>
      <body className="min-h-screen font-sans antialiased">
        <ToastProvider>{children as React.ReactNode}</ToastProvider>
      </body>
    </html>
  );
}
