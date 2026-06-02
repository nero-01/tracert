import { Progress } from "@/components/ui/progress";

export function GoalBar({
  weeklyHours,
  weeklyTarget,
}: {
  weeklyHours: number;
  weeklyTarget: number;
}) {
  const pct = weeklyTarget > 0 ? Math.min(100, Math.round((weeklyHours / weeklyTarget) * 100)) : 0;
  const remaining = Math.max(0, Math.round((weeklyTarget - weeklyHours) * 10) / 10);

  return (
    <div className="rounded-lg border bg-card p-4">
      <p className="text-sm font-medium">This week: {weeklyHours} / {weeklyTarget} hrs</p>
      <Progress value={pct} className="mt-3 h-3" />
      <p className="mt-2 text-sm text-muted-foreground">
        {remaining > 0
          ? `${remaining} hrs remaining to hit your weekly goal`
          : "Weekly goal reached. Great momentum."}
      </p>
    </div>
  );
}
