import { CountdownBanner } from "@/components/dashboard/CountdownBanner";
import { QuickActionsCard } from "@/components/dashboard/QuickActionsCard";
import { RecentActivityCard } from "@/components/dashboard/RecentActivityCard";
import { StreakCard } from "@/components/dashboard/StreakCard";
import { TopWeaknessCard } from "@/components/dashboard/TopWeaknessCard";
import { WeeklyProgressCard } from "@/components/dashboard/WeeklyProgressCard";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1>Dashboard</h1>

      <CountdownBanner readiness={62} />

      <div className="grid min-w-0 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StreakCard />
        <WeeklyProgressCard />
        <QuickActionsCard />
      </div>

      <div className="grid min-w-0 gap-4 lg:grid-cols-3">
        <RecentActivityCard />
        <TopWeaknessCard />
      </div>
    </div>
  );
}
