"use client";

import { cn } from "@/lib/utils";

export function GoalBar({
  weeklyHours,
  weeklyTarget,
}: {
  weeklyHours: number;
  weeklyTarget: number;
}) {
  const pct = weeklyTarget > 0 ? Math.min(100, Math.round((weeklyHours / weeklyTarget) * 100)) : 0;
  const remaining = Math.max(0, Math.round((weeklyTarget - weeklyHours) * 10) / 10);
  const exceeded = weeklyHours > weeklyTarget;
  const bonus = exceeded ? Math.round((weeklyHours - weeklyTarget) * 10) / 10 : 0;

  const fillClass =
    pct >= 100
      ? "bg-emerald-500"
      : pct >= 80
        ? "bg-brand-500"
        : pct >= 50
          ? "bg-amber-400"
          : "bg-red-400";

  return (
    <div className="group">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-[var(--text-primary)]">This week</span>
        <span className="font-semibold text-[var(--text-primary)]">
          {weeklyHours} / {weeklyTarget} hrs
        </span>
      </div>
      <div
        className={cn(
          "mt-3 h-2.5 overflow-hidden rounded-pill bg-[var(--bg-subtle)] transition-[filter] duration-200 group-hover:brightness-110",
          exceeded && "shadow-[0_0_12px_rgba(52,211,153,0.4)]"
        )}
      >
        <div
          className={cn("h-full rounded-pill transition-all ease-out [transition-duration:600ms]", fillClass)}
          style={{ width: `${Math.min(100, pct)}%` }}
        />
      </div>
      <p className="mt-2 text-sm text-[var(--text-muted)]">
        {exceeded ? (
          <span className="text-emerald-500">
            🎯 Weekly goal smashed! +{bonus} bonus hours
          </span>
        ) : remaining > 0 ? (
          `${remaining} hrs remaining to hit your weekly goal`
        ) : (
          "Weekly goal reached. Great momentum."
        )}
      </p>
      <p className="mt-1 text-xs text-[var(--text-muted)]">{pct}% of weekly target</p>
    </div>
  );
}
