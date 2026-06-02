"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SurfaceCard } from "@/components/ui/surface-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { StudySession } from "@/types";

function getWeekLabel(date: Date) {
  const firstDay = new Date(date.getFullYear(), 0, 1);
  const day = Math.floor((date.getTime() - firstDay.getTime()) / 86400000);
  const week = Math.ceil((day + firstDay.getDay() + 1) / 7);
  return `W${week}`;
}

export function HoursChart({
  sessions,
  weeklyTarget,
}: {
  sessions: StudySession[];
  weeklyTarget: number;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const weeks = new Map<string, number>();
  const now = new Date();

  for (let i = 7; i >= 0; i -= 1) {
    const d = new Date(now);
    d.setDate(now.getDate() - i * 7);
    weeks.set(getWeekLabel(d), 0);
  }

  sessions.forEach((session) => {
    const label = getWeekLabel(new Date(session.createdAt));
    if (weeks.has(label)) {
      weeks.set(label, (weeks.get(label) ?? 0) + session.durationMinutes / 60);
    }
  });

  const data = Array.from(weeks.entries()).map(([week, actual]) => ({
    week,
    actual: Math.round(actual * 10) / 10,
    target: weeklyTarget,
  }));

  return (
    <SurfaceCard className="min-w-0">
      <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
        Last 8 weeks
      </p>
      <div className="mt-4 w-full min-w-0" style={{ minWidth: 0 }}>
        {mounted ? (
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={data}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis dataKey="week" stroke="var(--text-muted)" fontSize={12} />
              <YAxis stroke="var(--text-muted)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "14px",
                }}
              />
              <Legend />
              <Bar dataKey="actual" name="Actual" fill="var(--brand-primary)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="target" name="Target" fill="var(--text-muted)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <Skeleton className="h-[240px] w-full rounded-card" />
        )}
      </div>
    </SurfaceCard>
  );
}
