import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  FlaskConical,
  Flame,
  GitBranch,
  LayoutDashboard,
  Settings,
  Sparkles,
  Trophy,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  shortLabel?: string;
}

export const mainNavItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, shortLabel: "Home" },
  { href: "/dashboard/blueprint", label: "Blueprint", icon: BookOpen },
  { href: "/dashboard/labs", label: "Lab Hours", icon: FlaskConical, shortLabel: "Labs" },
  { href: "/dashboard/streak", label: "Streak", icon: Flame },
  { href: "/dashboard/insights", label: "AI Insights", icon: Sparkles, shortLabel: "Insights" },
];

export const moreNavItems: NavItem[] = [
  { href: "/dashboard/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/dashboard/journey", label: "Journey", icon: GitBranch },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export const allNavItems: NavItem[] = [...mainNavItems, ...moreNavItems];

export function getPageTitle(pathname: string): string {
  const item = allNavItems.find(
    (nav) => pathname === nav.href || pathname.startsWith(`${nav.href}/`)
  );
  if (item) return item.label;
  if (pathname === "/dashboard") return "Dashboard";
  return "Tracert";
}
