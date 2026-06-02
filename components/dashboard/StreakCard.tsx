"use client";

import Link from "next/link";
import { Flame } from "lucide-react";
import { SurfaceCard } from "@/components/ui/surface-card";
import { useStreak } from "@/hooks/useStreak";
import { useUser } from "@/hooks/useUser";

export function StreakCard() {
  const { currentStreak, longestStreak, freezeTokens } = useStreak();
  const { isPro } = useUser();

  return (
    <SurfaceCard hoverable glowOnHover className="h-full">
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
          Study streak
        </p>
        <Flame className="h-5 w-5 text-amber-500" />
      </div>
      <p className="mt-2 text-3xl font-bold text-[var(--text-primary)]">
        {currentStreak}
        <span className="ml-1 text-lg font-medium text-[var(--text-secondary)]">days</span>
      </p>
      <p className="mt-1 text-sm text-[var(--text-muted)]">
        Longest: {longestStreak} days
        {isPro && ` · ${freezeTokens} freeze tokens`}
      </p>
      <p className="mt-3 text-sm text-[var(--text-secondary)]">
        {currentStreak === 0
          ? "Start your streak today — log a session."
          : "Log a session today to keep your streak alive."}
      </p>
      <Link
        href="/dashboard/streak"
        className="mt-4 inline-block text-sm font-medium text-brand-500 hover:text-brand-600"
      >
        View streak →
      </Link>
    </SurfaceCard>
  );
}
