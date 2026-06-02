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

const data = [
  { day: "Mon", hours: 1.5 },
  { day: "Tue", hours: 2.0 },
  { day: "Wed", hours: 0.5 },
  { day: "Thu", hours: 1.8 },
  { day: "Fri", hours: 1.2 },
  { day: "Sat", hours: 2.4 },
  { day: "Sun", hours: 0.9 },
];

export function WeeklyChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="rounded-lg border bg-card p-4">
      <p className="mb-3 text-sm font-medium">This Week&apos;s Study Hours</p>
      <div className="h-44 w-full min-w-0">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" fill="#0d9488" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full w-full animate-pulse rounded-md bg-muted" />
        )}
      </div>
    </div>
  );
}
