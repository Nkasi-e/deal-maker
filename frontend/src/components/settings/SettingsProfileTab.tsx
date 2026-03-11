"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { User, Upload } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { STAGGER_VARIANTS, ITEM_VARIANT } from "./settingsVariants";

export interface ProfileState {
  name: string;
  email: string;
  company: string;
  avatarUrl: string | null;
}

interface SettingsProfileTabProps {
  profile: ProfileState;
  setProfile: React.Dispatch<React.SetStateAction<ProfileState>>;
  saving: boolean;
  onSave: () => void;
}

export function SettingsProfileTab({ profile, setProfile, saving, onSave }: SettingsProfileTabProps) {
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setProfile((p) => ({ ...p, avatarUrl: URL.createObjectURL(file) }));
  };

  return (
    <Card className="shadow-card transition-shadow hover:shadow-card-hover">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Your name, email, company, and avatar. Used across the app and in communications.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          className="space-y-6"
          variants={STAGGER_VARIANTS}
          initial="initial"
          animate="animate"
        >
          <motion.div className="flex items-center gap-6" variants={ITEM_VARIANT}>
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-input bg-muted/50">
              {profile.avatarUrl ? (
                <Image src={profile.avatarUrl} alt="Avatar" width={80} height={80} className="h-full w-full object-cover" unoptimized />
              ) : (
                <User className="h-10 w-10 text-muted-foreground" />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Avatar</Label>
              <div className="flex items-center gap-2">
                <Label
                  htmlFor="avatar-upload"
                  className="flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <Upload className="h-4 w-4" />
                  Upload
                </Label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleAvatarChange}
                />
                {profile.avatarUrl && (
                  <Button variant="ghost" size="sm" onClick={() => setProfile((p) => ({ ...p, avatarUrl: null }))}>
                    Remove
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
          <motion.div className="space-y-2" variants={ITEM_VARIANT}>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Your name"
              value={profile.name}
              onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
            />
          </motion.div>
          <motion.div className="space-y-2" variants={ITEM_VARIANT}>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={profile.email}
              onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
            />
          </motion.div>
          <motion.div className="space-y-2" variants={ITEM_VARIANT}>
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              placeholder="Company name"
              value={profile.company}
              onChange={(e) => setProfile((p) => ({ ...p, company: e.target.value }))}
            />
          </motion.div>
          <motion.div variants={ITEM_VARIANT}>
            <Button loading={saving} onClick={onSave}>
              Save profile
            </Button>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
