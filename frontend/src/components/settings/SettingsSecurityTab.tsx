"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface PasswordFormState {
  current: string;
  new: string;
  confirm: string;
}

interface SettingsSecurityTabProps {
  passwordForm: PasswordFormState;
  setPasswordForm: React.Dispatch<React.SetStateAction<PasswordFormState>>;
  twoFactorEnabled: boolean;
  setTwoFactorEnabled: (v: boolean) => void;
  saving: boolean;
  onSavePassword: () => void;
}

export function SettingsSecurityTab({
  passwordForm,
  setPasswordForm,
  twoFactorEnabled,
  setTwoFactorEnabled,
  saving,
  onSavePassword,
}: SettingsSecurityTabProps) {
  return (
    <Card className="shadow-card transition-shadow hover:shadow-card-hover">
      <CardHeader>
        <CardTitle>Security</CardTitle>
        <CardDescription>
          Change your password and manage two-factor authentication.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Change password</h4>
          <div className="space-y-2">
            <Label htmlFor="current-password">Current password</Label>
            <PasswordInput
              id="current-password"
              placeholder="••••••••"
              value={passwordForm.current}
              onChange={(e) => setPasswordForm((p) => ({ ...p, current: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New password</Label>
            <PasswordInput
              id="new-password"
              placeholder="••••••••"
              value={passwordForm.new}
              onChange={(e) => setPasswordForm((p) => ({ ...p, new: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm new password</Label>
            <PasswordInput
              id="confirm-password"
              placeholder="••••••••"
              value={passwordForm.confirm}
              onChange={(e) => setPasswordForm((p) => ({ ...p, confirm: e.target.value }))}
            />
          </div>
          <Button loading={saving} onClick={onSavePassword}>
            Update password
          </Button>
        </div>
        <div className="flex items-center justify-between border-t pt-6">
          <div>
            <Label>Two-factor authentication</Label>
            <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
          </div>
          <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
        </div>
      </CardContent>
    </Card>
  );
}
