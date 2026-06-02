"use client";

import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { SurfaceCard } from "@/components/ui/surface-card";
import { MOCK_INSIGHTS } from "@/lib/mock/mockInsights";
import { cn } from "@/lib/utils";

const priorityDot: Record<string, string> = {
  critical: "bg-rose-500",
  high: "bg-amber-500",
  medium: "bg-slate-400",
};

export function TopWeaknessCard() {
  const top = MOCK_INSIGHTS.slice(0, 3);

  return (
    <SurfaceCard hoverable className="h-full">
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
          Top weaknesses
        </p>
        <AlertCircle className="h-5 w-5 text-[var(--text-muted)]" />
      </div>

      <ul className="mt-4 space-y-3">
        {top.map((item) => (
          <li key={item.topicId} className="flex gap-3">
            <span
              className={cn(
                "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                priorityDot[item.priority] ?? "bg-slate-400"
              )}
            />
            <div className="min-w-0">
              <p className="text-sm font-medium leading-snug text-[var(--text-primary)]">
                {item.title}
              </p>
              <span className="mt-1 inline-block rounded-pill bg-[var(--bg-elevated)] px-2 py-0.5 text-xs text-[var(--text-muted)]">
                {item.domain}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <Link
        href="/dashboard/insights"
        className="mt-4 inline-block text-sm font-medium text-brand-500 hover:text-brand-600"
      >
        Generate full analysis →
      </Link>
    </SurfaceCard>
  );
}
