"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/hooks/useUser";
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

export default function Sidebar() {
  const pathname = usePathname();
  const { isPro } = useUser();

  return (
    <aside className="w-72 shrink-0 border-r bg-card">
      <div className="border-b px-6 py-5">
        <Link href="/dashboard" className="text-lg font-semibold tracking-tight">
          Tracert
        </Link>
        <p className="text-xs text-muted-foreground">Cisco cert tracker</p>
      </div>

      <div className="border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback>DU</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">Dev User</p>
            <p className="truncate text-xs text-muted-foreground">dev@tracert.app</p>
          </div>
          {isPro && <Badge>Pro</Badge>}
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-4">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
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
