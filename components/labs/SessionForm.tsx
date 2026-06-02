"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { TRACKS } from "@/data/tracks";
import { MOCK_BLUEPRINT_TOPICS } from "@/lib/mock/mockBlueprint";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SurfaceCard } from "@/components/ui/surface-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatHours } from "@/lib/utils";

export function SessionForm({
  onSubmit,
}: {
  onSubmit: (data: {
    trackId: string;
    topicId?: string;
    durationMinutes: number;
    notes?: string;
    createdAt?: string;
  }) => Promise<void>;
}) {
  const [trackId, setTrackId] = useState("ccna-core");
  const [topicId, setTopicId] = useState<string>("none");
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(0);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const topics = useMemo(
    () => MOCK_BLUEPRINT_TOPICS.filter((t) => t.trackId === trackId),
    [trackId]
  );

  const durationMinutes = Math.max(15, hours * 60 + minutes);

  async function handleSubmit() {
    setSubmitting(true);
    try {
      await onSubmit({
        trackId,
        topicId: topicId === "none" ? undefined : topicId,
        durationMinutes,
        notes,
        createdAt: new Date(`${date}T12:00:00`).toISOString(),
      });
      toast.success(`Session logged — ${formatHours(durationMinutes)}`);
      setNotes("");
      setMinutes(0);
      setHours(1);
    } catch {
      toast.error("Could not log session. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SurfaceCard glowOnHover>
      <h2 className="text-lg font-semibold text-[var(--text-primary)]">Log session</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
            Track
          </label>
          <Select value={trackId} onValueChange={setTrackId}>
            <SelectTrigger className="h-11 border-[var(--border)] bg-[var(--bg-elevated)]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TRACKS.map((track) => (
                <SelectItem key={track.id} value={track.id}>
                  {track.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
            Topic (optional)
          </label>
          <Select value={topicId} onValueChange={setTopicId}>
            <SelectTrigger className="h-11 border-[var(--border)] bg-[var(--bg-elevated)]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No topic selected</SelectItem>
              {topics.map((topic) => (
                <SelectItem key={topic.id} value={topic.id}>
                  {topic.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
              Hours
            </label>
            <Input
              type="number"
              min={0}
              max={8}
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="h-11 border-[var(--border)] bg-[var(--bg-elevated)]"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
              Minutes
            </label>
            <Input
              type="number"
              min={0}
              max={59}
              step={15}
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
              className="h-11 border-[var(--border)] bg-[var(--bg-elevated)]"
            />
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
            className="h-11 border-[var(--border)] bg-[var(--bg-elevated)]"
          />
        </div>
      </div>

      <div className="mt-3">
        <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
          Notes
        </label>
        <textarea
          className="min-h-[90px] w-full rounded-card border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2 text-sm text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="What did you work on?"
        />
      </div>

      <Button className="mt-4 h-11 w-full sm:w-auto" onClick={handleSubmit} disabled={submitting}>
        {submitting ? "Logging…" : "Log session"}
      </Button>
    </SurfaceCard>
  );
}
