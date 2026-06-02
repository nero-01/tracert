const rows = [
  { rank: 1, name: "Taylor R.", track: "CCIE Enterprise", hours: 42.6, topics: 18 },
  { rank: 2, name: "Dev User", track: "CCNA Core", hours: 31.2, topics: 14 },
  { rank: 3, name: "Morgan P.", track: "CCNP Security", hours: 28.5, topics: 11 },
  { rank: 4, name: "Casey L.", track: "CCNA Automation", hours: 24.8, topics: 9 },
  { rank: 5, name: "Jordan K.", track: "CCNP Enterprise", hours: 22.1, topics: 8 },
];

export function LeaderboardTable() {
  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <div className="border-b px-4 py-3">
        <p className="text-sm font-medium">Community Leaderboard (Mock)</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50 text-muted-foreground">
            <tr>
              <th className="px-4 py-2">Rank</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Track</th>
              <th className="px-4 py-2">Hours</th>
              <th className="px-4 py-2">Topics</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.rank}
                className={row.name === "Dev User" ? "bg-primary/5" : "border-t"}
              >
                <td className="px-4 py-2 font-medium">#{row.rank}</td>
                <td className="px-4 py-2">{row.name}</td>
                <td className="px-4 py-2">{row.track}</td>
                <td className="px-4 py-2">{row.hours.toFixed(1)}</td>
                <td className="px-4 py-2">{row.topics}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
