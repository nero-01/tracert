"use client";

import { useMemo, useState } from "react";
import { DomainAccordion } from "@/components/blueprint/DomainAccordion";
import { TrackSelector } from "@/components/blueprint/TrackSelector";
import { ProgressRing } from "@/components/dashboard/ProgressRing";
import { SurfaceCard } from "@/components/ui/surface-card";
import { useBlueprint } from "@/hooks/useBlueprint";
import { useUser } from "@/hooks/useUser";
import { calculateReadiness } from "@/lib/utils";
import { TRACKS } from "@/data/tracks";
import type { TopicWithProgress } from "@/types";

function StatChip({
  label,
  count,
  borderClass,
}: {
  label: string;
  count: number;
  borderClass: string;
}) {
  return (
    <SurfaceCard padding="sm" className={`min-w-[140px] shrink-0 border-l-4 ${borderClass}`}>
      <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
        {label}
      </p>
      <p className="mt-1 text-xl font-bold text-[var(--text-primary)]">{count}</p>
    </SurfaceCard>
  );
}

export function BlueprintTracker() {
  const { profile } = useUser();
  const [trackId, setTrackId] = useState(
    (profile as { active_track_id?: string }).active_track_id ?? "ccna-core"
  );

  const { topics, domains, overallProgress, progressByDomain, updateTopic } =
    useBlueprint(trackId);

  const activeTrack = useMemo(() => TRACKS.find((t) => t.id === trackId), [trackId]);

  const masteredCount = topics.filter((t) => t.status === "mastered").length;
  const inProgressCount = topics.filter((t) => t.status === "in_progress").length;
  const notStartedCount = topics.filter((t) => t.status === "not_started").length;
  const hoursRemaining = Math.round(
    (topics.filter((t) => t.status !== "mastered").length * 45) / 60
  );

  const readiness = calculateReadiness(
    topics.map((t: TopicWithProgress) => ({
      status: t.status,
      confidence: t.confidence,
    }))
  );

  return (
    <div className="min-w-0 space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <h1>Blueprint Tracker</h1>
              {activeTrack && (
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  {activeTrack.name} · {activeTrack.examCode}
                </p>
              )}
            </div>
            <div className="hidden shrink-0 lg:block lg:w-72">
              <TrackSelector value={trackId} onTrackChange={setTrackId} />
            </div>
          </div>
          <div className="mt-4 lg:hidden">
            <TrackSelector value={trackId} onTrackChange={setTrackId} />
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-center gap-3 sm:flex-row lg:flex-col">
          <ProgressRing value={readiness} size={120} />
          <p className="max-w-[200px] text-center text-sm text-[var(--text-muted)] lg:text-left">
            {masteredCount} of {topics.length} mastered · ~{hoursRemaining}h left
          </p>
        </div>
      </div>

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-none sm:mx-0 sm:px-0">
        <StatChip label="Mastered" count={masteredCount} borderClass="border-emerald-500" />
        <StatChip
          label="In Progress"
          count={inProgressCount}
          borderClass="border-amber-500"
        />
        <StatChip
          label="Not Started"
          count={notStartedCount}
          borderClass="border-slate-400"
        />
      </div>

      <SurfaceCard padding="sm">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-[var(--text-primary)]">Overall progress</span>
          <span className="text-[var(--text-muted)]">{overallProgress}%</span>
        </div>
        <div className="h-3 overflow-hidden rounded-pill bg-[var(--bg-subtle)]">
          <div
            className="h-full rounded-pill bg-brand-500 transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </SurfaceCard>

      {topics.length === 0 ? (
        <SurfaceCard className="text-center">
          <p className="font-medium text-[var(--text-primary)]">Blueprint coming soon</p>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            No topics are available for this track in mock data yet.
          </p>
        </SurfaceCard>
      ) : (
        <DomainAccordion
          domains={domains}
          topics={topics}
          progressByDomain={progressByDomain}
          onUpdateTopic={updateTopic}
        />
      )}
    </div>
  );
}
