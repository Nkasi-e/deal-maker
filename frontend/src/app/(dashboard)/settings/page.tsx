"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { User, Sliders, Bell, Shield, Plug } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardPage } from "@/components/layout";
import { useToast } from "@/components/ui/toast";
import { runWithLoading } from "@/lib/runWithLoading";
import { TAB_CONTENT_VARIANTS } from "@/components/settings/settingsVariants";
import {
  SettingsProfileTab,
  SettingsAgentTab,
  SettingsNotificationsTab,
  SettingsSecurityTab,
  SettingsIntegrationsTab,
} from "@/components/settings";
import type { ProfileState } from "@/components/settings";
import { ROUTES } from "@/config/routes";

type SettingsTab = "profile" | "agent" | "notifications" | "security" | "integrations";

const VALID_TABS: SettingsTab[] = ["profile", "agent", "notifications", "security", "integrations"];

function SettingsPageContent() {
  const toast = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  const getTabFromSearch = (): SettingsTab => {
    const param = searchParams.get("tab");
    if (param && (VALID_TABS as string[]).includes(param)) {
      return param as SettingsTab;
    }
    return "profile";
  };

  const [activeTab, setActiveTab] = useState<SettingsTab>(getTabFromSearch);
  const [profile, setProfile] = useState<ProfileState>({ name: "", email: "", company: "", avatarUrl: null });
  const [dealTypes, setDealTypes] = useState<string[]>([]);
  const [targetSavings, setTargetSavings] = useState(15);
  const [aggressiveness, setAggressiveness] = useState(50);
  const [autoApproveBelow, setAutoApproveBelow] = useState("500");
  const [manualApprovalAbove, setManualApprovalAbove] = useState("500");
  const [notifications, setNotifications] = useState({ email: true, slack: false, push: true });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: "", new: "", confirm: "" });
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingAgent, setSavingAgent] = useState(false);
  const [savingNotifications, setSavingNotifications] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    // Keep tab in sync when navigating with back/forward or external links.
    setActiveTab(getTabFromSearch());
  }, [searchParams]);

  const handleTabChange = (value: string) => {
    const next = (VALID_TABS as string[]).includes(value) ? (value as SettingsTab) : "profile";
    setActiveTab(next);

    const params = new URLSearchParams(searchParams.toString());
    if (next === "profile") {
      params.delete("tab");
    } else {
      params.set("tab", next);
    }
    const query = params.toString();
    router.replace(query ? `${ROUTES.settings}?${query}` : ROUTES.settings, { scroll: false });
  };

  const toggleDealType = (id: string) => {
    setDealTypes((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <DashboardPage title="Settings" description="Update your profile, agent preferences, notifications, and security.">
      <div className="max-w-2xl">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="agent" className="flex items-center gap-2">
              <Sliders className="h-4 w-4" />
              Agent
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-2">
              <Plug className="h-4 w-4" />
              Integrations
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={TAB_CONTENT_VARIANTS}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2 }}
                className="outline-none"
              >
                {activeTab === "profile" && (
                  <SettingsProfileTab
                    profile={profile}
                    setProfile={setProfile}
                    saving={savingProfile}
                    onSave={() => runWithLoading(setSavingProfile, () => { toast.success("Profile saved"); })}
                  />
                )}
                {activeTab === "agent" && (
                  <SettingsAgentTab
                    dealTypes={dealTypes}
                    toggleDealType={toggleDealType}
                    targetSavings={targetSavings}
                    setTargetSavings={setTargetSavings}
                    aggressiveness={aggressiveness}
                    setAggressiveness={setAggressiveness}
                    autoApproveBelow={autoApproveBelow}
                    setAutoApproveBelow={setAutoApproveBelow}
                    manualApprovalAbove={manualApprovalAbove}
                    setManualApprovalAbove={setManualApprovalAbove}
                    saving={savingAgent}
                    onSave={() => runWithLoading(setSavingAgent, () => { toast.success("Agent preferences saved"); })}
                  />
                )}
                {activeTab === "notifications" && (
                  <SettingsNotificationsTab
                    notifications={notifications}
                    setNotifications={setNotifications}
                    saving={savingNotifications}
                    onSave={() => runWithLoading(setSavingNotifications, () => { toast.success("Notification preferences saved"); })}
                  />
                )}
                {activeTab === "security" && (
                  <SettingsSecurityTab
                    passwordForm={passwordForm}
                    setPasswordForm={setPasswordForm}
                    twoFactorEnabled={twoFactorEnabled}
                    setTwoFactorEnabled={setTwoFactorEnabled}
                    saving={savingPassword}
                    onSavePassword={() => runWithLoading(setSavingPassword, () => { toast.success("Password updated"); })}
                  />
                )}
                {activeTab === "integrations" && <SettingsIntegrationsTab />}
              </motion.div>
            </AnimatePresence>
          </div>
        </Tabs>
      </div>
    </DashboardPage>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<DashboardPage title="Settings" description="Loading…"><div className="max-w-2xl animate-pulse rounded-lg bg-muted h-64" /></DashboardPage>}>
      <SettingsPageContent />
    </Suspense>
  );
}
