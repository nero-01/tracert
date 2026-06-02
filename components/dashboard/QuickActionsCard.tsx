"use client";

import Link from "next/link";
import { BookOpen, Clock, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { SurfaceCard } from "@/components/ui/surface-card";
import { cn } from "@/lib/utils";

const actions = [
  {
    href: "/dashboard/labs",
    label: "Log a session",
    icon: Clock,
    toast: "Open Lab Hours to log a session",
  },
  {
    href: "/dashboard/blueprint",
    label: "Study blueprint",
    icon: BookOpen,
    toast: null,
  },
  {
    href: "/dashboard/insights",
    label: "Get AI insight",
    icon: Sparkles,
    toast: null,
  },
] as const;

export function QuickActionsCard() {
  return (
    <SurfaceCard className="h-full">
      <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
        Quick actions
      </p>
      <ul className="mt-4 space-y-2">
        {actions.map(({ href, label, icon: Icon, toast: toastMsg }) => (
          <li key={href}>
            <Link
              href={href}
              onClick={() => {
                if (toastMsg) toast.info(toastMsg);
              }}
              className={cn(
                "flex w-full items-center gap-3 rounded-card border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3",
                "transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-500/40 hover:shadow-glow-teal active:scale-[0.98]"
              )}
            >
              <Icon className="h-5 w-5 shrink-0 text-brand-500" />
              <span className="text-sm font-medium text-[var(--text-primary)]">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </SurfaceCard>
  );
}
