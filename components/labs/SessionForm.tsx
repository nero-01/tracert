"use client";

import { useMemo, useState } from "react";
import { FlaskConical, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { TRACKS } from "@/data/tracks";
import { getBlueprintByTrack } from "@/lib/blueprint/loadBlueprint";
import { isTrackSeeded, SEEDED_TRACK_IDS } from "@/lib/labs/seededTracks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SurfaceCard } from "@/components/ui/surface-card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn, formatHours } from "@/lib/utils";

const QUICK_DURATIONS = [30, 60, 90, 120, 180];

export function SessionForm({
  onSubmit,
  onLogged,
}: {
  onSubmit: (data: {
    trackId: string;
    topicId?: string;
    durationMinutes: number;
    notes?: string;
    sessionDate?: string;
    createdAt?: string;
  }) => Promise<{ id: string }>;
  onLogged?: () => void;
}) {
  const [trackId, setTrackId] = useState<string>(SEEDED_TRACK_IDS[0]);
  const [topicId, setTopicId] = useState<string>("");
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [useSlider, setUseSlider] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const topics = useMemo(() => getBlueprintByTrack(trackId), [trackId]);
  const domains = useMemo(
    () => Array.from(new Set(topics.map((t) => t.domain))),
    [topics]
  );

  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;

  function setFromHoursMinutes(h: number, m: number) {
    setDurationMinutes(Math.min(480, Math.max(15, h * 60 + m)));
  }

  async function handleSubmit() {
    if (!isTrackSeeded(trackId)) {
      toast.error("Blueprint coming soon for this track");
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit({
        trackId,
        topicId: topicId || undefined,
        durationMinutes,
        notes: notes.trim() || undefined,
        sessionDate: date,
        createdAt: new Date(`${date}T12:00:00`).toISOString(),
      });
      toast.success(`✓ Session logged — ${formatHours(durationMinutes)} added`);
      setNotes("");
      setTopicId("");
      setDurationMinutes(60);
      setDate(new Date().toISOString().split("T")[0]);
      onLogged?.();
    } catch {
      toast.error("Could not log session");
    } finally {
      setSubmitting(false);
    }
  }

  const selectedTopic = topics.find((t) => t.id === topicId);

  return (
    <SurfaceCard glowOnHover>
      <h2 className="text-lg font-semibold text-[var(--text-primary)]">Log session</h2>

      <div className="mt-4">
        <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
          Track
        </label>
        <Select value={trackId} onValueChange={(v) => { setTrackId(v); setTopicId(""); }}>
          <SelectTrigger className="h-11 w-full rounded-card border-[var(--border)] bg-[var(--bg-elevated)]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TRACKS.map((track) => (
              <SelectItem
                key={track.id}
                value={track.id}
                disabled={!isTrackSeeded(track.id)}
                className={!isTrackSeeded(track.id) ? "opacity-50" : undefined}
              >
                {track.name} · {track.examCode}
                {!isTrackSeeded(track.id) ? " — coming soon" : ""}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
              Duration
            </label>
            <button
              type="button"
              onClick={() => setUseSlider((v) => !v)}
              className="text-xs text-brand-500 hover:underline"
            >
              {useSlider ? "Use inputs" : "Use slider"}
            </button>
          </div>
          {useSlider ? (
            <input
              type="range"
              min={0}
              max={480}
              step={15}
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(Number(e.target.value))}
              className="w-full accent-brand-500"
            />
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                min={0}
                max={8}
                value={hours}
                onChange={(e) => setFromHoursMinutes(Number(e.target.value), minutes)}
                className="h-11 border-[var(--border)] bg-[var(--bg-elevated)]"
              />
              <Input
                type="number"
                min={0}
                max={59}
                step={15}
                value={minutes}
                onChange={(e) => setFromHoursMinutes(hours, Number(e.target.value))}
                className="h-11 border-[var(--border)] bg-[var(--bg-elevated)]"
              />
            </div>
          )}
          <p className="mt-2 text-sm font-medium text-brand-500">{formatHours(durationMinutes)}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {QUICK_DURATIONS.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDurationMinutes(d)}
                className={cn(
                  "rounded-pill border px-3 py-1.5 text-xs font-medium transition-all duration-200 active:scale-95",
                  durationMinutes === d
                    ? "border-brand-500 bg-brand-500 text-white"
                    : "border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:border-brand-500/30 hover:bg-brand-500/10 hover:text-brand-500"
                )}
              >
                {d < 60 ? `${d}m` : d === 60 ? "1h" : d === 90 ? "1.5h" : d === 120 ? "2h" : "3h"}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
            Date
          </label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="h-11 w-full rounded-xl border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-primary)] dark:[color-scheme:dark]"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
          Topic (optional)
        </label>
        <div className="flex gap-2">
          <Select value={topicId || "none"} onValueChange={(v) => setTopicId(v === "none" ? "" : v)}>
            <SelectTrigger className="h-11 min-w-0 flex-1 border-[var(--border)] bg-[var(--bg-elevated)]">
              {selectedTopic ? (
                <span className="flex min-w-0 items-center gap-2 truncate">
                  <span className="truncate">{selectedTopic.title}</span>
                  <span className="shrink-0 rounded-pill bg-[var(--bg-subtle)] px-2 text-[10px] text-[var(--text-muted)]">
                    {selectedTopic.domain}
                  </span>
                </span>
              ) : (
                <SelectValue placeholder="Select a topic (optional)" />
              )}
            </SelectTrigger>
            <SelectContent className="max-h-72">
              <SelectItem value="none">No topic</SelectItem>
              {domains.map((domain) => (
                <SelectGroup key={domain}>
                  <SelectLabel className="text-xs font-semibold uppercase text-[var(--text-muted)]">
                    {domain}
                  </SelectLabel>
                  {topics
                    .filter((t) => t.domain === domain)
                    .map((topic) => (
                      <SelectItem key={topic.id} value={topic.id}>
                        {topic.title}
                      </SelectItem>
                    ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
          {topicId && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-11 w-11 shrink-0"
              onClick={() => setTopicId("")}
              aria-label="Clear topic"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
          Notes
        </label>
        <textarea
          className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2 text-sm text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 md:resize-y"
          rows={3}
          maxLength={280}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="What did you cover? Any blockers or breakthroughs?"
        />
        <p className="mt-1 text-right text-xs text-[var(--text-muted)]">{notes.length}/280</p>
      </div>

      <Button
        className="mt-4 h-12 w-full md:h-11 md:w-auto"
        onClick={handleSubmit}
        disabled={submitting}
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Logging…
          </>
        ) : (
          <>
            <FlaskConical className="h-4 w-4" />
            Log Session
          </>
        )}
      </Button>
    </SurfaceCard>
  );
}
