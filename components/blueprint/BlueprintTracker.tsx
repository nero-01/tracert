"use client";

import { useMemo, useState } from "react";
import { DomainAccordion } from "@/components/blueprint/DomainAccordion";
import { TrackSelector } from "@/components/blueprint/TrackSelector";
import { ProgressRing } from "@/components/dashboard/ProgressRing";
import { Progress } from "@/components/ui/progress";
import { useBlueprint } from "@/hooks/useBlueprint";
import { useUser } from "@/hooks/useUser";
import { TRACKS } from "@/data/tracks";

export function BlueprintTracker() {
  const { profile } = useUser();
  const [trackId, setTrackId] = useState(profile.active_track_id ?? "ccna-core");

  const { topics, domains, overallProgress, progressByDomain, updateTopic } = useBlueprint(trackId);

  const activeTrack = useMemo(() => TRACKS.find((t) => t.id === trackId), [trackId]);
  const masteredCount = topics.filter((t) => t.status === "mastered").length;
  const hoursRemaining = Math.round((topics.filter((t) => t.status !== "mastered").length * 45) / 60);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Blueprint</h1>
          {activeTrack && (
            <p className="mt-1 text-sm text-muted-foreground">
              {activeTrack.name} · {activeTrack.examCode}
            </p>
          )}
        </div>
        <ProgressRing value={overallProgress} />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <TrackSelector value={trackId} onTrackChange={setTrackId} />
        <p className="text-sm text-muted-foreground">
          {masteredCount} of {topics.length} topics mastered
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Overall progress</span>
          <span className="text-muted-foreground">{overallProgress}%</span>
        </div>
        <Progress value={overallProgress} className="h-3" />
        <p className="text-xs text-muted-foreground">
          ~{hoursRemaining} hours estimated to cover remaining topics (45 min avg)
        </p>
      </div>

      <DomainAccordion
        domains={domains}
        topics={topics}
        progressByDomain={progressByDomain}
        onUpdateTopic={updateTopic}
      />
    </div>
  );
}
