"use client";

import Link from "next/link";
import { History } from "lucide-react";
import { SurfaceCard } from "@/components/ui/surface-card";
import { MOCK_STUDY_SESSIONS } from "@/lib/mock/mockSessions";
import { TRACKS } from "@/data/tracks";
import { formatHours } from "@/lib/utils";

export function RecentActivityCard() {
  const sessions = [...MOCK_STUDY_SESSIONS]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <SurfaceCard className="h-full lg:col-span-2">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
          Recent activity
        </p>
        <History className="h-5 w-5 text-[var(--text-muted)]" />
      </div>

      {sessions.length === 0 ? (
        <div className="mt-8 text-center">
          <History className="mx-auto h-12 w-12 text-[var(--text-muted)]" />
          <p className="mt-3 font-medium text-[var(--text-primary)]">No sessions yet</p>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Log your first study session to see activity here.
          </p>
          <Link
            href="/dashboard/labs"
            className="mt-4 inline-flex rounded-pill bg-brand-500 px-4 py-2 text-sm font-medium text-white transition-transform active:scale-[0.98] hover:bg-brand-600"
          >
            Log a session
          </Link>
        </div>
      ) : (
        <ul className="mt-4 divide-y divide-[var(--border)]">
          {sessions.map((session) => {
            const track = TRACKS.find((t) => t.id === session.trackId);
            const date = new Date(session.createdAt);
            return (
              <li
                key={session.id}
                className="flex flex-wrap items-center gap-2 py-3 first:pt-0 last:pb-0 sm:flex-nowrap sm:gap-3"
              >
                <span className="shrink-0 rounded-pill bg-[var(--bg-elevated)] px-2 py-1 text-xs text-[var(--text-secondary)]">
                  {date.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                </span>
                {track && (
                  <span className="shrink-0 rounded-pill bg-brand-500/10 px-2 py-0.5 text-xs font-medium text-brand-600 dark:text-brand-400">
                    {track.examCode}
                  </span>
                )}
                <span className="shrink-0 text-xs font-medium text-[var(--text-muted)]">
                  {formatHours(session.durationMinutes)}
                </span>
                <span className="min-w-0 flex-1 truncate text-sm text-[var(--text-primary)]">
                  {session.notes ?? "Study session"}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </SurfaceCard>
  );
}
