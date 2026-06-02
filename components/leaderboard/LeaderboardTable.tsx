import { SurfaceCard } from "@/components/ui/surface-card";
import { cn } from "@/lib/utils";

const rows = [
  { rank: 1, name: "Taylor R.", track: "CCIE Enterprise", hours: 42.6, topics: 18 },
  { rank: 2, name: "Dev User", track: "CCNA Core", hours: 31.2, topics: 14 },
  { rank: 3, name: "Morgan P.", track: "CCNP Security", hours: 28.5, topics: 11 },
  { rank: 4, name: "Casey L.", track: "CCNA Automation", hours: 24.8, topics: 9 },
  { rank: 5, name: "Jordan K.", track: "CCNP Enterprise", hours: 22.1, topics: 8 },
];

export function LeaderboardTable() {
  return (
    <SurfaceCard padding="sm" className="overflow-hidden p-0">
      <div className="border-b border-[var(--border)] px-4 py-3">
        <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
          Community leaderboard
        </p>
        <p className="text-sm text-[var(--text-secondary)]">Mock data for development</p>
      </div>
      <div className="w-full min-w-0 overflow-x-auto">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead className="bg-[var(--bg-elevated)] text-[var(--text-muted)]">
            <tr>
              <th className="px-4 py-2 font-medium">Rank</th>
              <th className="px-4 py-2 font-medium">Name</th>
              <th className="px-4 py-2 font-medium">Track</th>
              <th className="px-4 py-2 font-medium">Hours</th>
              <th className="px-4 py-2 font-medium">Topics</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.rank}
                className={cn(
                  "border-t border-[var(--border)] transition-colors hover:bg-[var(--bg-elevated)]",
                  row.name === "Dev User" && "bg-brand-500/5"
                )}
              >
                <td className="px-4 py-3 font-medium text-[var(--text-primary)]">#{row.rank}</td>
                <td className="px-4 py-3 text-[var(--text-primary)]">{row.name}</td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">{row.track}</td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">{row.hours.toFixed(1)}</td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">{row.topics}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SurfaceCard>
  );
}
