"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Flame,
  LayoutDashboard,
  Map,
  Settings,
  Sparkles,
  Timer,
  Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/blueprint", label: "Blueprint", icon: BookOpen },
  { href: "/dashboard/labs", label: "Labs", icon: Timer },
  { href: "/dashboard/streak", label: "Streak", icon: Flame },
  { href: "/dashboard/insights", label: "Insights", icon: Sparkles },
  { href: "/dashboard/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/dashboard/journey", label: "Journey", icon: Map },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r bg-card md:flex md:flex-col">
      <div className="border-b px-6 py-5">
        <Link href="/dashboard" className="text-lg font-semibold tracking-tight">
          Tracert
        </Link>
        <p className="text-xs text-muted-foreground">Cisco cert tracker</p>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-4">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href ||
            (href !== "/dashboard" && pathname.startsWith(href));

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
