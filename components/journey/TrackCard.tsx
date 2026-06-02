import Link from "next/link";
import { MOCK_USER } from "@/lib/mock/mockUser";
import { SurfaceCard } from "@/components/ui/surface-card";

export function TrackCard() {
  return (
    <SurfaceCard hoverable glowOnHover>
      <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
        Current track
      </p>
      <p className="mt-1 text-lg font-semibold text-[var(--text-primary)]">CCNA Core · 200-301</p>
      <p className="mt-2 text-sm text-[var(--text-secondary)]">
        Progress: 62% · 31.2 hrs logged · 5 AI insights
      </p>
      <p className="text-sm text-[var(--text-muted)]">
        Exam date: {new Date(MOCK_USER.exam_date).toLocaleDateString()}
      </p>
      <Link
        href="/dashboard/blueprint"
        className="mt-4 inline-block text-sm font-medium text-brand-500 hover:text-brand-600"
      >
        Open blueprint →
      </Link>
    </SurfaceCard>
  );
}
