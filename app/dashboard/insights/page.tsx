import { WeakAreaList } from "@/components/insights/WeakAreaList";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function InsightsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">AI Insights</h1>
        <Button asChild variant="outline">
          <Link href="/dashboard/blueprint">Review Blueprint Topics</Link>
        </Button>
      </div>
      <WeakAreaList />
    </div>
  );
}
