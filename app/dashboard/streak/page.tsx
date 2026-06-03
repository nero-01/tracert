"use client";

import { StreakCard } from "@/components/dashboard/StreakCard";
import { StreakHeatmap } from "@/components/streak/StreakHeatmap";
import { SurfaceCard } from "@/components/ui/surface-card";
import { useStreak } from "@/hooks/useStreak";
import { useStudySessions } from "@/hooks/useStudySessions";
import { getSessionDate } from "@/lib/sessions/dateUtils";
import { format, parseISO } from "date-fns";

export default function StreakPage() {
  const { currentStreak, longestStreak, calendarData } = useStreak();
  const { sessions, monthlyHours } = useStudySessions();

  const monthSessionCount = sessions.filter(
    (s) => new Date(getSessionDate(s)).getMonth() === new Date().getMonth()
  ).length;

  const dayTotals = new Map<number, { total: number; count: number }>();
  sessions.forEach((s) => {
    const d = parseISO(getSessionDate(s)).getDay();
    const entry = dayTotals.get(d) ?? { total: 0, count: 0 };
    entry.total += s.durationMinutes / 60;
    entry.count += 1;
    dayTotals.set(d, entry);
  });

  let bestDay = "—";
  let bestAvg = 0;
  dayTotals.forEach((v, day) => {
    const avg = v.total / v.count;
    if (avg > bestAvg) {
      bestAvg = avg;
      bestDay = format(new Date(2024, 0, day), "EEEE");
    }
  });

  return (
    <div className="min-w-0 space-y-6">
      <h1>Study Streak</h1>

      <div className="grid gap-4 sm:grid-cols-2">
        <SurfaceCard hoverable className="flex items-center gap-3">
          <span className="text-2xl">🔥</span>
          <div>
            <p className="text-xs text-[var(--text-muted)]">Current</p>
            <p className="text-2xl font-bold text-[var(--text-primary)]">{currentStreak} days</p>
          </div>
        </SurfaceCard>
        <SurfaceCard hoverable className="flex items-center gap-3">
          <span className="text-2xl">🏆</span>
          <div>
            <p className="text-xs text-[var(--text-muted)]">Longest</p>
            <p className="text-2xl font-bold text-[var(--text-primary)]">{longestStreak} days</p>
          </div>
        </SurfaceCard>
      </div>

      <StreakCard />

      <SurfaceCard>
        <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
          12-week activity
        </p>
        <div className="mt-4">
          <StreakHeatmap calendarData={calendarData} />
        </div>
      </SurfaceCard>

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-none sm:mx-0 sm:px-0">
        <SurfaceCard padding="sm" className="min-w-[180px] shrink-0">
          <p className="text-xs text-[var(--text-muted)]">Sessions this month</p>
          <p className="text-lg font-bold text-[var(--text-primary)]">{monthSessionCount}</p>
        </SurfaceCard>
        <SurfaceCard padding="sm" className="min-w-[180px] shrink-0">
          <p className="text-xs text-[var(--text-muted)]">Hours this month</p>
          <p className="text-lg font-bold text-[var(--text-primary)]">{monthlyHours} hrs</p>
        </SurfaceCard>
        <SurfaceCard padding="sm" className="min-w-[200px] shrink-0">
          <p className="text-xs text-[var(--text-muted)]">Most productive day</p>
          <p className="text-sm font-bold text-[var(--text-primary)]">
            {bestDay}
            {bestAvg > 0 && (
              <span className="font-normal text-[var(--text-muted)]">
                {" "}
                (avg {bestAvg.toFixed(1)} hrs)
              </span>
            )}
          </p>
        </SurfaceCard>
      </div>
    </div>
  );
}
