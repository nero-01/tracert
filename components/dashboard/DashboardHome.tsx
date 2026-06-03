"use client";

import { CountdownBanner } from "@/components/dashboard/CountdownBanner";
import { GoalBar } from "@/components/labs/GoalBar";
import { QuickActionsCard } from "@/components/dashboard/QuickActionsCard";
import { RecentActivityCard } from "@/components/dashboard/RecentActivityCard";
import { StreakCard } from "@/components/dashboard/StreakCard";
import { TopWeaknessCard } from "@/components/dashboard/TopWeaknessCard";
import { SurfaceCard } from "@/components/ui/surface-card";
import { useBlueprint } from "@/hooks/useBlueprint";
import { useStudySessions } from "@/hooks/useStudySessions";
import { MOCK_USER } from "@/lib/mock/mockUser";
import { daysBetweenExam } from "@/lib/sessions/dateUtils";
import { calculateReadiness } from "@/lib/utils";

export function DashboardHome() {
  const { weeklyHours, weeklyTarget } = useStudySessions();
  const { topics } = useBlueprint("ccna-core");
  const readiness = calculateReadiness(
    topics.map((t) => ({ status: t.status, confidence: t.confidence }))
  );
  const daysLeft = daysBetweenExam(MOCK_USER.exam_date);

  return (
    <div className="space-y-6">
      <h1>Dashboard</h1>

      <CountdownBanner readiness={readiness} daysLeft={daysLeft} />

      <div className="grid min-w-0 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StreakCard />
        <SurfaceCard hoverable className="h-full">
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
            Weekly progress
          </p>
          <div className="mt-3">
            <GoalBar weeklyHours={weeklyHours} weeklyTarget={weeklyTarget} />
          </div>
        </SurfaceCard>
        <QuickActionsCard />
      </div>

      <div className="grid min-w-0 gap-4 lg:grid-cols-3">
        <RecentActivityCard />
        <TopWeaknessCard />
      </div>
    </div>
  );
}
