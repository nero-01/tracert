import { MOCK_USER } from "@/lib/mock/mockUser";

export function CountdownBanner() {
  const examDate = new Date(MOCK_USER.exam_date);
  const now = new Date();
  const diffMs = examDate.getTime() - now.getTime();
  const daysLeft = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

  return (
    <div className="rounded-lg border bg-card p-4">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        Exam Countdown
      </p>
      <p className="mt-1 text-xl font-semibold">{daysLeft} days left</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Target date: {examDate.toLocaleDateString()}
      </p>
    </div>
  );
}
