"use client";

import { TRACKS } from "@/data/tracks";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CertLevel } from "@/types";

const LEVEL_LABELS: Record<CertLevel, string> = {
  ccna: "CCNA",
  ccnp: "CCNP",
  ccie: "CCIE",
  ccde: "CCDE",
};

const LEVELS: CertLevel[] = ["ccna", "ccnp", "ccie", "ccde"];

interface TrackSelectorProps {
  value: string | undefined;
  userId?: string;
  onTrackChange: (trackId: string) => void;
}

export function TrackSelector({ value, onTrackChange }: TrackSelectorProps) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
      <span className="text-sm text-muted-foreground">Track</span>
      <Select value={value ?? "ccna-core"} onValueChange={onTrackChange}>
        <SelectTrigger className="w-full sm:w-[320px]">
          <SelectValue placeholder="Select a track" />
        </SelectTrigger>
        <SelectContent>
          {LEVELS.map((level) => (
            <SelectGroup key={level}>
              <SelectLabel>{LEVEL_LABELS[level]}</SelectLabel>
              {TRACKS.filter((t) => t.level === level).map((track) => (
                <SelectItem key={track.id} value={track.id}>
                  {track.name} · {track.examCode}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
