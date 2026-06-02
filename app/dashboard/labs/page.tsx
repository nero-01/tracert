"use client";

import { ClipboardList } from "lucide-react";
import { GoalBar } from "@/components/labs/GoalBar";
import { HoursChart } from "@/components/labs/HoursChart";
import { SessionForm } from "@/components/labs/SessionForm";
import { SurfaceCard } from "@/components/ui/surface-card";
import { TRACKS } from "@/data/tracks";
import { useStudySessions } from "@/hooks/useStudySessions";
import { formatHours } from "@/lib/utils";

export default function LabsPage() {
  const { sessions, weeklyHours, weeklyTarget, addSession } = useStudySessions();
  const recent = sessions.slice(0, 8);

  return (
    <div className="min-w-0 space-y-6">
      <h1>Lab Hours</h1>
      <GoalBar weeklyHours={weeklyHours} weeklyTarget={weeklyTarget} />
      <HoursChart sessions={sessions} weeklyTarget={weeklyTarget} />
      <SessionForm onSubmit={addSession} />

      <SurfaceCard>
        <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
          Recent sessions
        </p>
        {recent.length === 0 ? (
          <div className="mt-6 text-center">
            <ClipboardList className="mx-auto h-12 w-12 text-[var(--text-muted)]" />
            <p className="mt-3 font-medium text-[var(--text-primary)]">No sessions yet</p>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Log your first study session above.
            </p>
          </div>
        ) : (
          <ul className="mt-4 divide-y divide-[var(--border)]">
            {recent.map((session) => {
              const track = TRACKS.find((t) => t.id === session.trackId);
              return (
                <li
                  key={session.id}
                  className="flex flex-wrap items-center gap-2 py-3 text-sm first:pt-0 last:pb-0"
                >
                  <span className="text-[var(--text-muted)]">
                    {new Date(session.createdAt).toLocaleDateString()}
                  </span>
                  <span className="rounded-pill bg-brand-500/10 px-2 py-0.5 text-xs font-medium text-brand-600 dark:text-brand-400">
                    {track?.examCode ?? session.trackId}
                  </span>
                  <span className="font-medium text-[var(--text-secondary)]">
                    {formatHours(session.durationMinutes)}
                  </span>
                  {session.notes && (
                    <span className="min-w-0 flex-1 truncate text-[var(--text-primary)]">
                      {session.notes}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </SurfaceCard>
    </div>
  );
}
