"use client";

import { useMemo, useState } from "react";
import { TRACKS } from "@/data/tracks";
import { MOCK_BLUEPRINT_TOPICS } from "@/lib/mock/mockBlueprint";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  const topics = useMemo(
    () => MOCK_BLUEPRINT_TOPICS.filter((t) => t.trackId === trackId),
    [trackId]
  );

  const durationMinutes = Math.max(15, hours * 60 + minutes);

  async function handleSubmit() {
    await onSubmit({
      trackId,
      topicId: topicId === "none" ? undefined : topicId,
      durationMinutes,
      notes,
      createdAt: new Date(`${date}T12:00:00`).toISOString(),
    });

    setNotes("");
    setMinutes(0);
    setHours(1);
  }

  return (
    <div className="rounded-lg border bg-card p-4">
      <h3 className="text-sm font-medium">Log Session</h3>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs text-muted-foreground">Track</label>
          <Select value={trackId} onValueChange={setTrackId}>
            <SelectTrigger>
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
          <label className="mb-1 block text-xs text-muted-foreground">Topic (optional)</label>
          <Select value={topicId} onValueChange={setTopicId}>
            <SelectTrigger>
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
            <label className="mb-1 block text-xs text-muted-foreground">Hours</label>
            <Input
              type="number"
              min={0}
              max={8}
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Minutes</label>
            <Input
              type="number"
              min={0}
              max={59}
              step={15}
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs text-muted-foreground">Date</label>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
      </div>

      <div className="mt-3">
        <label className="mb-1 block text-xs text-muted-foreground">Notes</label>
        <textarea
          className="min-h-[90px] w-full rounded-md border bg-background px-3 py-2 text-sm"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="What did you work on?"
        />
      </div>

      <Button className="mt-3" onClick={handleSubmit}>
        Log Session
      </Button>
    </div>
  );
}
