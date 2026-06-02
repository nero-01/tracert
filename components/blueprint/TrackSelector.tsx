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
import { cn } from "@/lib/utils";
import type { CertLevel } from "@/types";

const LEVEL_LABELS: Record<CertLevel, string> = {
  ccna: "CCNA",
  ccnp: "CCNP",
  ccie: "CCIE",
  ccde: "CCDE",
};

const LEVEL_BADGE: Record<CertLevel, string> = {
  ccna: "bg-brand-500/15 text-brand-600 dark:text-brand-400",
  ccnp: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  ccie: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
  ccde: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
};

const LEVELS: CertLevel[] = ["ccna", "ccnp", "ccie", "ccde"];

interface TrackSelectorProps {
  value: string | undefined;
  onTrackChange: (trackId: string) => void;
  className?: string;
}

export function TrackSelector({ value, onTrackChange, className }: TrackSelectorProps) {
  const selected = TRACKS.find((t) => t.id === (value ?? "ccna-core"));

  return (
    <div className={cn("w-full min-w-0", className)}>
      <Select value={value ?? "ccna-core"} onValueChange={onTrackChange}>
        <SelectTrigger className="h-11 w-full rounded-card border-[var(--border)] bg-[var(--bg-surface)] shadow-card transition-all duration-200 hover:border-brand-500/40 hover:shadow-glow-teal sm:min-w-[280px]">
          <div className="flex min-w-0 items-center gap-2">
            {selected && (
              <span
                className={cn(
                  "shrink-0 rounded-pill px-2 py-0.5 text-[10px] font-semibold uppercase",
                  LEVEL_BADGE[selected.level]
                )}
              >
                {LEVEL_LABELS[selected.level]}
              </span>
            )}
            <SelectValue placeholder="Select a track" />
          </div>
        </SelectTrigger>
        <SelectContent className="max-h-80 rounded-card border-[var(--border)] bg-[var(--bg-surface)] shadow-[var(--shadow-hover)]">
          {LEVELS.map((level) => (
            <SelectGroup key={level}>
              <SelectLabel className="sticky top-0 z-10 bg-[var(--bg-surface)] text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                {LEVEL_LABELS[level]}
              </SelectLabel>
              {TRACKS.filter((t) => t.level === level).map((track) => (
                <SelectItem
                  key={track.id}
                  value={track.id}
                  className="focus:bg-[var(--bg-elevated)] data-[state=checked]:bg-brand-500/10 data-[state=checked]:text-brand-500"
                >
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
