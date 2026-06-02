"use client";

import { useState } from "react";
import { toast } from "sonner";
import { MOCK_USER } from "@/lib/mock/mockUser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SurfaceCard } from "@/components/ui/surface-card";

export default function SettingsPage() {
  const [displayName, setDisplayName] = useState("Dev User");
  const [weeklyGoal, setWeeklyGoal] = useState(String(MOCK_USER.weekly_hour_goal));
  const [nudgeHour, setNudgeHour] = useState(String(MOCK_USER.streak_nudge_hour));

  function handleSave() {
    toast.success("Settings saved (mock dev mode)");
  }

  return (
    <div className="min-w-0 space-y-6">
      <h1>Settings</h1>

      <SurfaceCard>
        <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
          Profile
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs text-[var(--text-muted)]">Display name</label>
            <Input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="border-[var(--border)] bg-[var(--bg-elevated)]"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-[var(--text-muted)]">Email</label>
            <Input value={MOCK_USER.email} readOnly className="border-[var(--border)] bg-[var(--bg-subtle)]" />
          </div>
        </div>
      </SurfaceCard>

      <SurfaceCard>
        <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
          Study goals
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs text-[var(--text-muted)]">Weekly hour goal</label>
            <Input
              value={weeklyGoal}
              onChange={(e) => setWeeklyGoal(e.target.value)}
              className="border-[var(--border)] bg-[var(--bg-elevated)]"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-[var(--text-muted)]">Streak nudge hour</label>
            <Input
              value={nudgeHour}
              onChange={(e) => setNudgeHour(e.target.value)}
              className="border-[var(--border)] bg-[var(--bg-elevated)]"
            />
          </div>
        </div>
      </SurfaceCard>

      <SurfaceCard>
        <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
          Plan
        </p>
        <p className="mt-2 text-sm font-medium text-[var(--text-primary)]">Tracert Pro</p>
        <p className="mt-1 text-sm text-[var(--text-muted)]">Mock dev mode — billing disabled</p>
        <span className="mt-3 inline-flex rounded-pill bg-brand-500/15 px-2.5 py-0.5 text-xs font-semibold text-brand-600 shadow-glow-teal dark:text-brand-400">
          PRO
        </span>
      </SurfaceCard>

      <Button className="h-11" onClick={handleSave}>
        Save changes
      </Button>
    </div>
  );
}
