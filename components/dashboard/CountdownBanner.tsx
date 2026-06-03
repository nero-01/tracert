"use client";

import Link from "next/link";
import { MOCK_USER } from "@/lib/mock/mockUser";
import { SurfaceCard } from "@/components/ui/surface-card";
import { cn } from "@/lib/utils";

interface CountdownBannerProps {
  readiness?: number;
  daysLeft?: number;
  className?: string;
}

export function CountdownBanner({
  readiness = 62,
  daysLeft: daysLeftProp,
  className,
}: CountdownBannerProps) {
  const examDate = new Date(MOCK_USER.exam_date);
  const daysLeft =
    daysLeftProp ??
    Math.max(0, Math.ceil((examDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));

  return (
    <SurfaceCard
      hoverable
      padding="lg"
      className={cn(
        "group relative overflow-hidden border-brand-500/20 bg-gradient-to-r from-brand-500/10 via-transparent to-transparent",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:animate-shimmer group-hover:opacity-100 dark:via-white/5"
        style={{ backgroundSize: "200% 100%" }}
      />
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
            Exam countdown
          </p>
          <p className="mt-1 text-2xl font-bold text-[var(--text-primary)]">
            {daysLeft} days to CCNA Core exam
          </p>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Target: {examDate.toLocaleDateString(undefined, { dateStyle: "medium" })}
          </p>
        </div>
        <div className="min-w-0 sm:w-64">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-[var(--text-secondary)]">Readiness</span>
            <span className="font-semibold text-brand-500">{readiness}%</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-pill bg-[var(--bg-subtle)]">
            <div
              className="h-full rounded-pill bg-brand-500 transition-all duration-500 group-hover:shadow-glow-teal"
              style={{ width: `${readiness}%` }}
            />
          </div>
          <Link
            href="/dashboard/blueprint"
            className="mt-3 inline-block text-sm font-medium text-brand-500 transition-colors hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
          >
            View blueprint →
          </Link>
        </div>
      </div>
    </SurfaceCard>
  );
}
