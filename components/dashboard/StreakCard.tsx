"use client";

import Link from "next/link";
import { Check, Snowflake, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SurfaceCard } from "@/components/ui/surface-card";
import { useStreak } from "@/hooks/useStreak";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";

export function StreakCard() {
  const {
    currentStreak,
    longestStreak,
    freezeTokens,
    studiedToday,
    thisWeekDays,
  } = useStreak();
  const { isPro } = useUser();

  const flameClass = cn(
    "inline-block text-3xl transition-all",
    currentStreak === 0 && "grayscale opacity-60",
    currentStreak >= 7 && "animate-pulse drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]",
    currentStreak >= 30 && "drop-shadow-[0_0_12px_rgba(234,179,8,0.8)]"
  );

  const maxFreeze = 3;
  return (
    <SurfaceCard
      glowOnHover
      className={cn(
        "h-full transition-all duration-500",
        !studiedToday && "border-amber-500/40",
        studiedToday && "border-emerald-500/40"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className={flameClass}
            style={{ animation: currentStreak > 0 ? "pulse 2s ease-in-out infinite" : undefined }}
          >
            🔥
          </span>
          <div>
            <p className="text-3xl font-bold text-[var(--text-primary)]">{currentStreak}</p>
            <p className="text-sm text-[var(--text-muted)]">day streak</p>
          </div>
        </div>
        <p className="text-right text-sm text-[var(--text-muted)]">
          Longest: <span className="font-semibold text-[var(--text-primary)]">{longestStreak}</span>{" "}
          days
        </p>
      </div>

      <div className="mt-4 flex justify-between gap-1">
        {thisWeekDays.map((day) => (
          <div key={day.date} className="flex flex-1 flex-col items-center gap-1">
            <span className="text-[10px] text-[var(--text-muted)]">{day.label}</span>
            <div
              className={cn(
                "flex h-8 w-full max-w-[36px] items-center justify-center rounded-lg text-xs font-medium transition-all",
                day.isFuture && "bg-[var(--bg-subtle)] text-[var(--text-muted)]",
                !day.isFuture && day.hasSession && "bg-brand-500 text-white",
                !day.isFuture &&
                  !day.hasSession &&
                  !day.isToday &&
                  "bg-red-500/20 text-red-400",
                day.isToday &&
                  !day.hasSession &&
                  "animate-pulse bg-amber-500/20 text-amber-500 ring-2 ring-amber-500/30"
              )}
            >
              {day.isFuture ? (
                "—"
              ) : day.hasSession ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <X className="h-3.5 w-3.5" />
              )}
            </div>
          </div>
        ))}
      </div>

      {isPro && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="mt-4 flex cursor-help items-center gap-1 text-sm text-[var(--text-secondary)]">
                {Array.from({ length: maxFreeze }).map((_, i) => (
                  <Snowflake
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < freezeTokens ? "fill-sky-400 text-sky-400" : "text-[var(--text-muted)]/30"
                    )}
                  />
                ))}
                <span className="ml-1">{freezeTokens} freeze tokens remaining</span>
              </p>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              Streak freeze tokens prevent your streak from breaking on rest days. You earn 1 per
              30-day streak.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      <div className="mt-4 border-t border-[var(--border)] pt-3">
        {studiedToday ? (
          <p className="text-sm text-emerald-500">✓ Streak safe for today</p>
        ) : (
          <>
            <p className="text-sm text-amber-500">Log a session today to keep your streak alive!</p>
            <Link
              href="/dashboard/labs"
              className="mt-2 inline-block text-sm font-medium text-brand-500 hover:text-brand-600"
            >
              Log now →
            </Link>
          </>
        )}
      </div>
    </SurfaceCard>
  );
}
