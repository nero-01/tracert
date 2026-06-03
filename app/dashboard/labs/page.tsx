"use client";

import { useState } from "react";
import { Calendar, Clock, TrendingUp } from "lucide-react";
import { GoalBar } from "@/components/labs/GoalBar";
import { HoursChart } from "@/components/labs/HoursChart";
import { RecentSessionsList } from "@/components/labs/RecentSessionsList";
import { SessionForm } from "@/components/labs/SessionForm";
import { SurfaceCard } from "@/components/ui/surface-card";
import { useStudySessions } from "@/hooks/useStudySessions";

function StatChip({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <SurfaceCard hoverable padding="sm" className="min-w-[160px] shrink-0">
      <div className="flex items-center gap-3">
        <div className={`rounded-lg p-2 ${accent}`}>
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <p className="text-xs text-[var(--text-muted)]">{label}</p>
          <p className="font-semibold text-[var(--text-primary)]">{value}</p>
        </div>
      </div>
    </SurfaceCard>
  );
}

export default function LabsPage() {
  const {
    sessions,
    weeklyHours,
    weeklyTarget,
    monthlyHours,
    totalHours,
    last8Weeks,
    addSession,
    deleteSession,
    restoreSession,
  } = useStudySessions();

  const [highlightId, setHighlightId] = useState<string | null>(null);

  return (
    <div className="min-w-0 space-y-6">
      <h1>Lab Hours</h1>

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-none sm:mx-0 sm:px-0">
        <StatChip
          icon={Clock}
          label="This week"
          value={`${weeklyHours} hrs`}
          accent="bg-brand-500/10 text-brand-500"
        />
        <StatChip
          icon={Calendar}
          label="This month"
          value={`${monthlyHours} hrs`}
          accent="bg-blue-500/10 text-blue-500"
        />
        <StatChip
          icon={TrendingUp}
          label="Total"
          value={`${totalHours} hrs`}
          accent="bg-violet-500/10 text-violet-500"
        />
      </div>

      <SurfaceCard>
        <GoalBar weeklyHours={weeklyHours} weeklyTarget={weeklyTarget} />
      </SurfaceCard>

      <HoursChart data={last8Weeks} />

      <div className="grid min-w-0 gap-6 lg:grid-cols-5">
        <div className="min-w-0 lg:col-span-3">
          <SessionForm
            onSubmit={async (data) => {
              const session = await addSession(data);
              setHighlightId(session.id);
              window.setTimeout(() => setHighlightId(null), 600);
              return session;
            }}
          />
        </div>
        <div className="min-w-0 lg:col-span-2">
          <RecentSessionsList
            sessions={sessions}
            highlightId={highlightId}
            onDelete={deleteSession}
            onRestore={restoreSession}
          />
        </div>
      </div>
    </div>
  );
}
