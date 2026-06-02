"use client";

import { StreakCard } from "@/components/dashboard/StreakCard";
import { useStudySessions } from "@/hooks/useStudySessions";

function intensity(minutes: number) {
  if (minutes >= 120) return "bg-emerald-500";
  if (minutes >= 30) return "bg-teal-500";
  if (minutes > 0) return "bg-amber-500";
  return "bg-muted";
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
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Study Streak</h1>
      <StreakCard />

      <div className="rounded-lg border bg-card p-4">
        <h3 className="mb-3 text-sm font-medium">12-week activity heatmap</h3>
        <div className="grid grid-cols-12 gap-1 sm:grid-cols-14 md:grid-cols-21">
          {days.map((day) => (
            <div
              key={day.key}
              className={`h-4 w-4 rounded ${intensity(day.minutes)}`}
              title={`${day.key}: ${day.minutes} minutes`}
            />
          ))}
        </div>
      </div>

      <div className="rounded-lg border bg-card p-4 text-sm text-muted-foreground">
        This month: {(monthMinutes / 60).toFixed(1)} hours · {sessions.length} sessions
      </div>
    </div>
  );
}
