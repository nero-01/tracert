"use client";

import { StreakCard } from "@/components/dashboard/StreakCard";
import { SurfaceCard } from "@/components/ui/surface-card";
import { useStudySessions } from "@/hooks/useStudySessions";
import { cn } from "@/lib/utils";

function intensity(minutes: number) {
  if (minutes >= 120) return "bg-emerald-500";
  if (minutes >= 30) return "bg-brand-500";
  if (minutes > 0) return "bg-amber-500";
  return "bg-[var(--bg-subtle)]";
}

export default function StreakPage() {
  const { sessions } = useStudySessions();
  const now = new Date();

  const days = Array.from({ length: 84 }).map((_, i) => {
    const date = new Date(now);
    date.setDate(now.getDate() - (83 - i));
    const key = date.toISOString().slice(0, 10);
    const minutes = sessions
      .filter((s) => s.createdAt.slice(0, 10) === key)
      .reduce((sum, s) => sum + s.durationMinutes, 0);
    return { key, minutes };
  });

  const monthMinutes = sessions
    .filter((s) => new Date(s.createdAt).getMonth() === now.getMonth())
    .reduce((sum, s) => sum + s.durationMinutes, 0);

  return (
    <div className="min-w-0 space-y-6">
      <h1>Study Streak</h1>
      <StreakCard />

      <SurfaceCard>
        <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
          12-week activity
        </p>
        <div
          className="mt-4 grid gap-1 overflow-x-auto pb-1 scrollbar-none"
          style={{ gridTemplateColumns: "repeat(12, minmax(0, 1fr))" }}
        >
          {days.map((day) => (
            <div
              key={day.key}
              className={cn(
                "aspect-square min-h-[12px] min-w-[12px] rounded-sm transition-transform hover:scale-110",
                intensity(day.minutes)
              )}
              title={`${day.key}: ${day.minutes} minutes`}
            />
          ))}
        </div>
        <p className="mt-3 text-xs text-[var(--text-muted)]">
          Less → more intensity · hover a cell for details
        </p>
      </SurfaceCard>

      <SurfaceCard padding="sm">
        <p className="text-sm text-[var(--text-secondary)]">
          This month:{" "}
          <span className="font-semibold text-[var(--text-primary)]">
            {(monthMinutes / 60).toFixed(1)} hours
          </span>{" "}
          · {sessions.length} sessions logged
        </p>
      </SurfaceCard>
    </div>
  );
}
