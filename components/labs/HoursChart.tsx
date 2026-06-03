"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SurfaceCard } from "@/components/ui/surface-card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface HoursChartProps {
  data: { weekLabel: string; actual: number; target: number }[];
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number; dataKey: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const actual = payload.find((p) => p.dataKey === "actual")?.value ?? 0;
  const target = payload.find((p) => p.dataKey === "target")?.value ?? 0;
  const hit = actual >= target;

  return (
    <div className="rounded-card border border-[var(--border)] bg-[var(--bg-surface)] p-3 shadow-[var(--shadow-hover)]">
      <p className="text-sm font-medium text-[var(--text-primary)]">{label}</p>
      <p className="mt-1 text-xs text-[var(--text-secondary)]">
        Actual: {actual}h · Target: {target}h
      </p>
      {hit && <p className="mt-1 text-xs font-medium text-emerald-500">🎯 Goal hit!</p>}
    </div>
  );
}

export function HoursChart({ data }: HoursChartProps) {
  const [mounted, setMounted] = useState(false);
  const [showActual, setShowActual] = useState(true);
  const [showTarget, setShowTarget] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <SurfaceCard className="min-w-0">
      <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
        Last 8 weeks
      </p>
      <div className="mt-4 h-[180px] w-full min-w-0 md:h-[220px]" style={{ minWidth: 0 }}>
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={2}>
              <CartesianGrid vertical={false} stroke="var(--border)" strokeOpacity={0.5} />
              <XAxis
                dataKey="weekLabel"
                tick={{ fill: "var(--text-muted)", fontSize: 11 }}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fill: "var(--text-muted)", fontSize: 11 }}
                width={0}
                className="md:!w-8"
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<ChartTooltip />} />
              {showTarget && (
                <Bar
                  dataKey="target"
                  name="Target"
                  fill="var(--text-muted)"
                  fillOpacity={0.3}
                  radius={[4, 4, 0, 0]}
                  isAnimationActive
                />
              )}
              {showActual && (
                <Bar dataKey="actual" name="Actual" radius={[4, 4, 0, 0]} isAnimationActive>
                  {data.map((entry) => (
                    <Cell
                      key={entry.weekLabel}
                      fill={
                        entry.actual >= entry.target
                          ? "#10b981"
                          : "var(--brand-primary)"
                      }
                    />
                  ))}
                </Bar>
              )}
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <Skeleton className="h-full w-full rounded-card" />
        )}
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs text-[var(--text-muted)]">
        <button
          type="button"
          onClick={() => setShowActual((v) => !v)}
          className={cn("flex items-center gap-1.5", !showActual && "opacity-40")}
        >
          <span className="h-2.5 w-2.5 rounded-sm bg-brand-500" />
          Actual
        </button>
        <button
          type="button"
          onClick={() => setShowTarget((v) => !v)}
          className={cn("flex items-center gap-1.5", !showTarget && "opacity-40")}
        >
          <span className="h-2.5 w-2.5 rounded-sm bg-[var(--text-muted)]/30" />
          Target
        </button>
      </div>
    </SurfaceCard>
  );
}
