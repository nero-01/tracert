import { StreakCard } from "@/components/dashboard/StreakCard";
import { ProgressRing } from "@/components/dashboard/ProgressRing";
import { CountdownBanner } from "@/components/dashboard/CountdownBanner";
import { WeeklyChart } from "@/components/dashboard/WeeklyChart";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StreakCard />
        <ProgressRing value={0} />
        <CountdownBanner />
        <WeeklyChart />
      </div>
    </div>
  );
}
