import { MOCK_USER } from "@/lib/mock/mockUser";

export function TrackCard() {
  return (
    <div className="rounded-lg border bg-card p-4">
      <p className="text-sm font-medium">Current Track</p>
      <p className="mt-1 text-lg font-semibold">CCNA Core · 200-301</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Progress: 62% · 31.2 hrs logged · 5 AI insights
      </p>
      <p className="text-sm text-muted-foreground">
        Exam date: {new Date(MOCK_USER.exam_date).toLocaleDateString()}
      </p>
    </div>
  );
}
