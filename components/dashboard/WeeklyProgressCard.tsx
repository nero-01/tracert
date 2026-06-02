"use client";

import { Target } from "lucide-react";
import { SurfaceCard } from "@/components/ui/surface-card";

const HOURS_THIS_WEEK = 12.5;
const WEEKLY_TARGET = 15;

export function WeeklyProgressCard() {
  const pct = Math.min(100, Math.round((HOURS_THIS_WEEK / WEEKLY_TARGET) * 100));

  return (
    <SurfaceCard hoverable className="h-full">
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
          This week
        </p>
        <Target className="h-5 w-5 text-[var(--text-muted)]" />
      </div>
      <p className="mt-2 text-3xl font-bold text-[var(--text-primary)]">
        {HOURS_THIS_WEEK}
        <span className="ml-1 text-lg font-medium text-[var(--text-secondary)]">hrs</span>
      </p>
      <p className="mt-1 text-sm text-[var(--text-muted)]">
        Target: {WEEKLY_TARGET} hrs · {pct}% of goal
      </p>
      <div className="mt-4 h-2.5 overflow-hidden rounded-pill bg-[var(--bg-subtle)]">
        <div
          className="h-full rounded-pill bg-brand-500 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </SurfaceCard>
  );
}
