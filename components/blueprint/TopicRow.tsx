"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ConfidenceLevel, TopicStatus, TopicWithProgress } from "@/types";

const STATUSES: { value: TopicStatus; label: string; className: string }[] = [
  {
    value: "not_started",
    label: "Not Started",
    className: "bg-muted text-muted-foreground hover:bg-muted/80",
  },
  {
    value: "in_progress",
    label: "In Progress",
    className: "bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 dark:text-amber-400",
  },
  {
    value: "mastered",
    label: "Mastered",
    className: "bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 dark:text-emerald-400",
  },
];

interface TopicRowProps {
  topic: TopicWithProgress;
  onUpdate: (
    topicId: string,
    updates: { status?: TopicStatus; confidence?: ConfidenceLevel }
  ) => void;
}

export function TopicRow({ topic, onUpdate }: TopicRowProps) {
  return (
    <div className="flex flex-col gap-3 border-b py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1">
        {topic.subdomain && (
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {topic.subdomain}
          </p>
        )}
        <p className="text-sm font-medium leading-snug">{topic.title}</p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex flex-wrap gap-1">
          {STATUSES.map(({ value, label, className }) => (
            <button
              key={value}
              type="button"
              onClick={() => onUpdate(topic.id, { status: value })}
              className={cn(
                "rounded-md px-2 py-1 text-xs font-medium transition-colors",
                className,
                topic.status === value && "ring-2 ring-ring ring-offset-1"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-0.5" aria-label="Confidence level">
          {([1, 2, 3, 4, 5] as ConfidenceLevel[]).map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => onUpdate(topic.id, { confidence: level })}
              className="rounded p-0.5 transition-colors hover:text-amber-500"
              aria-label={`Confidence ${level}`}
            >
              <Star
                className={cn(
                  "h-3.5 w-3.5 sm:h-4 sm:w-4",
                  level <= topic.confidence
                    ? "fill-amber-400 text-amber-400"
                    : "text-muted-foreground/40"
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
