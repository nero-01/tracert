"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { BlueprintComponent, ConfidenceLevel, TopicStatus, TopicWithProgress } from "@/types";

function ComponentBadge({ component }: { component: BlueprintComponent }) {
  if (component === "written") return null;
  if (component === "lab") {
    return (
      <span className="inline-flex rounded border border-amber-500/20 bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-bold text-amber-500">
        LAB
      </span>
    );
  }
  return (
    <span className="inline-flex rounded border border-brand-500/20 bg-brand-500/10 px-1.5 py-0.5 text-[10px] font-bold text-brand-500">
      LAB+W
    </span>
  );
}

const STATUSES: { value: TopicStatus; label: string; active: string }[] = [
  {
    value: "not_started",
    label: "Not Started",
    active:
      "bg-[var(--bg-elevated)] text-[var(--text-muted)] border-[var(--border)]",
  },
  {
    value: "in_progress",
    label: "In Progress",
    active:
      "bg-amber-500/15 text-amber-600 border-amber-500/30 dark:text-amber-400",
  },
  {
    value: "mastered",
    label: "Mastered",
    active:
      "bg-emerald-500/15 text-emerald-600 border-emerald-500/30 dark:text-emerald-400",
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
  const [hoverConfidence, setHoverConfidence] = useState<number | null>(null);
  const [flash, setFlash] = useState(false);

  const displayConfidence = hoverConfidence ?? topic.confidence;

  function flashRow() {
    setFlash(true);
    window.setTimeout(() => setFlash(false), 400);
  }

  function handleStatus(value: TopicStatus) {
    onUpdate(topic.id, { status: value });
    flashRow();
    toast.success("Topic status updated");
  }

  function handleConfidence(level: ConfidenceLevel) {
    onUpdate(topic.id, { confidence: level });
    flashRow();
    toast.success(`Confidence set to ${level}/5`);
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-3 border-b border-[var(--border)] py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between",
        "transition-colors duration-200 hover:bg-[var(--bg-elevated)]",
        flash && "animate-flash"
      )}
    >
      <div className="min-w-0 flex-1">
        {topic.subdomain && (
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
            {topic.subdomain}
          </p>
        )}
        <p className="line-clamp-2 text-sm font-medium leading-snug text-[var(--text-primary)] transition-colors group-hover:text-brand-500">
          {topic.title}
        </p>
        {topic.component && topic.component !== "written" && (
          <div className="mt-1">
            <ComponentBadge component={topic.component} />
          </div>
        )}
      </div>

      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
        <div className="grid w-full grid-cols-3 overflow-hidden rounded-pill border border-[var(--border)] sm:w-auto sm:flex">
          {STATUSES.map(({ value, label, active }) => (
            <button
              key={value}
              type="button"
              onClick={() => handleStatus(value)}
              className={cn(
                "tap-target px-2 py-2 text-xs font-medium transition-all duration-100 active:scale-95 sm:px-3",
                topic.status === value
                  ? active
                  : "bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]"
              )}
            >
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">
                {value === "not_started" ? "New" : value === "in_progress" ? "Go" : "Done"}
              </span>
            </button>
          ))}
        </div>

        <div
          className="flex items-center gap-1"
          aria-label="Confidence level"
          onMouseLeave={() => setHoverConfidence(null)}
        >
          {([1, 2, 3, 4, 5] as ConfidenceLevel[]).map((level) => (
            <button
              key={level}
              type="button"
              onMouseEnter={() => setHoverConfidence(level)}
              onClick={() => handleConfidence(level)}
              className="tap-target flex items-center justify-center rounded p-1 transition-transform active:scale-95"
              aria-label={`Confidence ${level}`}
            >
              <Star
                className={cn(
                  "h-5 w-5 transition-all duration-150 sm:h-4 sm:w-4",
                  level <= displayConfidence
                    ? "fill-amber-400 text-amber-400"
                    : "text-[var(--text-muted)]/40",
                  level === topic.confidence &&
                    level <= displayConfidence &&
                    "scale-125"
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
