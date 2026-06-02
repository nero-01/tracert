import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/surface-card";

const quickLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/blueprint", label: "Blueprint" },
  { href: "/dashboard/labs", label: "Lab Hours" },
  { href: "/dashboard/streak", label: "Streak" },
  { href: "/dashboard/insights", label: "AI Insights" },
  { href: "/dashboard/leaderboard", label: "Leaderboard" },
  { href: "/dashboard/journey", label: "Journey" },
  { href: "/dashboard/settings", label: "Settings" },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-base)] p-6">
      <SurfaceCard hoverable padding="lg" className="w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Tracert Dev Mode</h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Auth is bypassed. Use the links below to open any page directly.
        </p>

        <Button asChild className="mt-6 h-11 w-full sm:w-auto">
          <Link href="/dashboard">Open Dashboard</Link>
        </Button>

        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          {quickLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="rounded-card border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-3 text-sm font-medium text-[var(--text-primary)] transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-500/40 hover:shadow-glow-teal active:scale-[0.98]"
            >
              {label}
            </Link>
          ))}
        </div>
      </SurfaceCard>
    </div>
  );
}
