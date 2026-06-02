"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUser } from "@/hooks/useUser";
import { allNavItems } from "@/lib/layout/nav";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { isPro } = useUser();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex h-screen w-16 flex-col border-r border-[var(--border)] bg-[var(--bg-surface)] lg:w-60",
        className
      )}
    >
      <div className="border-b border-[var(--border)] px-3 py-4 lg:px-5">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/15 text-sm font-bold text-brand-500">
            T
          </span>
          <span className="hidden text-lg font-semibold tracking-tight text-[var(--text-primary)] lg:inline">
            Tracert
          </span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-2 lg:p-3">
        {allNavItems.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href ||
            (href !== "/dashboard" && pathname.startsWith(href));

          return (
            <Link
              key={href}
              href={href}
              title={label}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-2 py-2.5 text-sm transition-all duration-200 lg:px-3",
                active
                  ? "bg-brand-500/10 text-brand-500 lg:border-r-2 lg:border-brand-500"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]"
              )}
            >
              <span
                className={cn(
                  "absolute left-0 top-1/2 hidden h-6 w-0.5 -translate-y-1/2 rounded-full bg-brand-500 transition-all duration-200 lg:block",
                  "group-hover:w-1",
                  active && "w-1"
                )}
              />
              <Icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110",
                  active && "text-brand-500"
                )}
              />
              <span className="hidden truncate lg:inline">{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-[var(--border)] p-2 lg:p-4">
        <div className="flex items-center gap-2 rounded-xl bg-[var(--bg-elevated)] p-2 lg:gap-3 lg:p-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-brand-500/20 text-brand-600 dark:text-brand-400">
              DU
            </AvatarFallback>
          </Avatar>
          <div className="hidden min-w-0 flex-1 lg:block">
            <p className="truncate text-sm font-medium text-[var(--text-primary)]">
              Dev User
            </p>
            <p className="truncate text-xs text-[var(--text-muted)]">
              dev@tracert.app
            </p>
          </div>
          {isPro && (
            <span className="hidden rounded-pill bg-brand-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-500 shadow-glow-teal lg:inline">
              Pro
            </span>
          )}
        </div>
      </div>
    </aside>
  );
}
