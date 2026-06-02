"use client";

import { GoalBar } from "@/components/labs/GoalBar";
import { HoursChart } from "@/components/labs/HoursChart";
import { SessionForm } from "@/components/labs/SessionForm";
import { TRACKS } from "@/data/tracks";
import { useStudySessions } from "@/hooks/useStudySessions";

export default function LabsPage() {
  const { sessions, weeklyHours, weeklyTarget, addSession } = useStudySessions();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Lab Hours</h1>
      <GoalBar weeklyHours={weeklyHours} weeklyTarget={weeklyTarget} />
      <HoursChart sessions={sessions} weeklyTarget={weeklyTarget} />
      <SessionForm onSubmit={addSession} />

      <div className="rounded-lg border bg-card p-4">
        <h3 className="text-sm font-medium">Recent sessions</h3>
        <div className="mt-3 space-y-2">
          {sessions.slice(0, 8).map((session) => {
            const track = TRACKS.find((t) => t.id === session.trackId);
            return (
              <div key={session.id} className="text-sm text-muted-foreground">
                {new Date(session.createdAt).toLocaleDateString()} · {track?.name ?? session.trackId} · {(session.durationMinutes / 60).toFixed(1)}h {session.notes ? `· ${session.notes}` : ""}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
