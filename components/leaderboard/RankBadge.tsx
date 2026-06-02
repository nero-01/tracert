export function RankBadge({ rank = 0 }: { rank?: number }) {
  return (
    <span className="inline-flex rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
      #{rank || "—"}
    </span>
  );
}
