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
        <div className="rounded-lg border bg-card p-4">
          <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">
            Readiness
          </p>
          <ProgressRing value={62} size={88} />
        </div>
        <CountdownBanner />
        <WeeklyChart />
      </div>
    </div>
  );
}
