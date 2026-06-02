"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
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
    <div className="rounded-lg border bg-card p-4">
      <p className="mb-3 text-sm font-medium">Last 8 weeks</p>
      <div className="h-64 w-full">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="actual" fill="#0d9488" radius={[4, 4, 0, 0]} />
              <Bar dataKey="target" fill="#94a3b8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full w-full animate-pulse rounded-md bg-muted" />
        )}
      </div>
    </div>
  );
}
