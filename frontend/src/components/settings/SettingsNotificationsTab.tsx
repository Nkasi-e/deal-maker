"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface NotificationsState {
  email: boolean;
  slack: boolean;
  push: boolean;
}

interface SettingsNotificationsTabProps {
  notifications: NotificationsState;
  setNotifications: React.Dispatch<React.SetStateAction<NotificationsState>>;
  saving: boolean;
  onSave: () => void;
}

export function SettingsNotificationsTab({ notifications, setNotifications, saving, onSave }: SettingsNotificationsTabProps) {
  return (
    <Card className="shadow-card transition-shadow hover:shadow-card-hover">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Choose how you want to be notified about deals and agent activity.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label>Email notifications</Label>
            <p className="text-sm text-muted-foreground">Receive deal and negotiation updates by email.</p>
          </div>
          <Switch checked={notifications.email} onCheckedChange={(v) => setNotifications((n) => ({ ...n, email: v }))} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <Label>Slack notifications</Label>
            <p className="text-sm text-muted-foreground">Post updates to a connected Slack channel.</p>
          </div>
          <Switch checked={notifications.slack} onCheckedChange={(v) => setNotifications((n) => ({ ...n, slack: v }))} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <Label>Push notifications</Label>
            <p className="text-sm text-muted-foreground">Browser or app push when action is needed.</p>
          </div>
          <Switch checked={notifications.push} onCheckedChange={(v) => setNotifications((n) => ({ ...n, push: v }))} />
        </div>
        <Button loading={saving} onClick={onSave}>
          Save notification preferences
        </Button>
      </CardContent>
    </Card>
  );
}
