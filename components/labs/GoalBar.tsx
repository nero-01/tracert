import { SurfaceCard } from "@/components/ui/surface-card";

export function GoalBar({
  weeklyHours,
  weeklyTarget,
}: {
  weeklyHours: number;
  weeklyTarget: number;
}) {
  const pct = weeklyTarget > 0 ? Math.min(100, Math.round((weeklyHours / weeklyTarget) * 100)) : 0;
  const remaining = Math.max(0, Math.round((weeklyTarget - weeklyHours) * 10) / 10);

  return (
    <SurfaceCard hoverable>
      <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
        Weekly goal
      </p>
      <p className="mt-1 text-lg font-semibold text-[var(--text-primary)]">
        {weeklyHours} / {weeklyTarget} hrs
      </p>
      <div className="mt-3 h-3 overflow-hidden rounded-pill bg-[var(--bg-subtle)]">
        <div
          className="h-full rounded-pill bg-brand-500 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2 text-sm text-[var(--text-muted)]">
        {remaining > 0
          ? `${remaining} hrs remaining to hit your weekly goal`
          : "Weekly goal reached. Great momentum."}
      </p>
    </SurfaceCard>
  );
}
