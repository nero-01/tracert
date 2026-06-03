"use client";

import { FlaskConical, MessageSquare, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { TRACKS } from "@/data/tracks";
import { getBlueprintByTrack } from "@/lib/blueprint/loadBlueprint";
import { SurfaceCard } from "@/components/ui/surface-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatSessionDateLabel, getSessionDate } from "@/lib/sessions/dateUtils";
import { formatHours } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { StudySession } from "@/types";

const TRACK_BADGE: Record<string, string> = {
  ccna: "bg-brand-500/15 text-brand-600 dark:text-brand-400",
  ccnp: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  ccie: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
  ccde: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
};

function trackBadgeClass(trackId: string) {
  const track = TRACKS.find((t) => t.id === trackId);
  return TRACK_BADGE[track?.level ?? "ccna"];
}

export function RecentSessionsList({
  sessions,
  highlightId,
  onDelete,
  onRestore,
}: {
  sessions: StudySession[];
  highlightId?: string | null;
  onDelete: (id: string) => StudySession | undefined;
  onRestore: (session: StudySession) => void;
}) {
  const recent = sessions.slice(0, 10);

  function handleDelete(session: StudySession) {
    const removed = onDelete(session.id);
    if (!removed) return;

    toast("Session removed", {
      duration: 3000,
      action: {
        label: "Undo",
        onClick: () => onRestore(removed),
      },
    });
  }

  if (recent.length === 0) {
    return (
      <SurfaceCard className="text-center">
        <FlaskConical className="mx-auto h-12 w-12 text-[var(--text-muted)]" />
        <p className="mt-3 font-medium text-[var(--text-primary)]">No sessions logged yet</p>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Log your first study session to start tracking your hours.
        </p>
      </SurfaceCard>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
        Recent sessions
      </p>
      {recent.map((session) => (
        <SessionRow
          key={session.id}
          session={session}
          highlighted={session.id === highlightId}
          onDelete={() => handleDelete(session)}
        />
      ))}
    </div>
  );
}

function SessionRow({
  session,
  highlighted,
  onDelete,
}: {
  session: StudySession;
  highlighted?: boolean;
  onDelete: () => void;
}) {
  const track = TRACKS.find((t) => t.id === session.trackId);
  const topics = getBlueprintByTrack(session.trackId);
  const topic = session.topicId
    ? topics.find((t) => t.id === session.topicId)
    : undefined;
  const dateLabel = formatSessionDateLabel(getSessionDate(session));

  return (
    <SurfaceCard
      hoverable
      padding="sm"
      className={cn(
        "transition-colors duration-500",
        highlighted && "animate-flash border-brand-500/30"
      )}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span
            className={cn(
              "rounded-pill px-2 py-0.5 text-[10px] font-semibold uppercase",
              trackBadgeClass(session.trackId)
            )}
          >
            {track?.examCode ?? session.trackId}
          </span>
          <span className="text-xs text-[var(--text-muted)]">{dateLabel}</span>
        </div>
        <div className="flex min-w-0 flex-1 items-center justify-between gap-2 sm:justify-end">
          <div className="min-w-0">
            <p className="text-lg font-bold text-[var(--text-primary)]">
              {formatHours(session.durationMinutes)}
            </p>
            <p className="truncate text-xs text-[var(--text-muted)]">
              {topic?.title ?? "General study"}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            {session.notes && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      className="tap-target flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-brand-500"
                      aria-label="View notes"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">{session.notes}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <button
              type="button"
              onClick={onDelete}
              className="tap-target flex items-center justify-center rounded-lg text-[var(--text-muted)] transition-colors hover:text-red-400 active:scale-95"
              aria-label="Delete session"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </SurfaceCard>
  );
}
