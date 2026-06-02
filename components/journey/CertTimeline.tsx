const levels = [
  { name: "CCNA", state: "active" },
  { name: "CCNP", state: "upcoming" },
  { name: "CCIE", state: "upcoming" },
  { name: "CCDE", state: "upcoming" },
];

export function CertTimeline() {
  return (
    <div className="rounded-lg border bg-card p-4">
      <p className="mb-3 text-sm font-medium">Certification Timeline</p>
      <div className="space-y-3">
        {levels.map((level, idx) => (
          <div key={level.name} className="flex items-center gap-3">
            <div
              className={`h-3 w-3 rounded-full ${
                level.state === "active" ? "bg-teal-500 ring-4 ring-teal-500/20" : "bg-muted"
              }`}
            />
            <span className="text-sm">{level.name}</span>
            {idx < levels.length - 1 && <div className="h-px flex-1 bg-border" />}
          </div>
        ))}
      </div>
    </div>
  );
}
