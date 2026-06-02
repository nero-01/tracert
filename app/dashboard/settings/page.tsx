"use client";

import { useState } from "react";
import { MOCK_USER } from "@/lib/mock/mockUser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  const [displayName, setDisplayName] = useState("Dev User");
  const [weeklyGoal, setWeeklyGoal] = useState(String(MOCK_USER.weekly_hour_goal));
  const [nudgeHour, setNudgeHour] = useState(String(MOCK_USER.streak_nudge_hour));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="rounded-lg border bg-card p-4">
        <p className="mb-3 text-sm font-medium">Profile</p>
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Display Name</label>
            <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Email</label>
            <Input value={MOCK_USER.email} readOnly />
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-4">
        <p className="mb-3 text-sm font-medium">Study Goals</p>
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Weekly Hour Goal</label>
            <Input value={weeklyGoal} onChange={(e) => setWeeklyGoal(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Streak Nudge Hour</label>
            <Input value={nudgeHour} onChange={(e) => setNudgeHour(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-4">
        <p className="text-sm font-medium">Plan</p>
        <p className="mt-1 text-sm text-muted-foreground">Tracert Pro (mock dev mode)</p>
      </div>

      <Button>Save Changes (Mock)</Button>
    </div>
  );
}
