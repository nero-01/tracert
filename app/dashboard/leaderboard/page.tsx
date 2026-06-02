import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LeaderboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1>Leaderboard</h1>
        <Button asChild variant="outline">
          <Link href="/dashboard/labs">Log More Study Time</Link>
        </Button>
      </div>
      <LeaderboardTable />
    </div>
  );
}
