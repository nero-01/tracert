"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, LogOut, Settings } from "lucide-react";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/hooks/useUser";
import { getPageTitle } from "@/lib/layout/nav";

export function TopBar() {
  const pathname = usePathname();
  const { isPro } = useUser();
  const title = getPageTitle(pathname);

  return (
    <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--bg-surface)]/80 px-4 backdrop-blur-md md:px-6">
      <div className="min-w-0">
        <Link
          href="/dashboard"
          className="text-sm font-semibold text-brand-500 md:hidden"
        >
          Tracert
        </Link>
        <h1 className="hidden truncate text-lg font-semibold text-[var(--text-primary)] md:block">
          {title}
        </h1>
        <p className="truncate text-xs text-[var(--text-muted)] md:hidden">{title}</p>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-[var(--text-muted)]"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
            >
              <Avatar className="h-9 w-9">
                <AvatarFallback>DU</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <p>Dev User</p>
              <p className="text-xs font-normal text-[var(--text-muted)]">
                dev@tracert.app
              </p>
              {isPro && (
                <span className="mt-1 inline-block rounded-pill bg-brand-500/15 px-2 py-0.5 text-[10px] font-semibold text-brand-500">
                  PRO
                </span>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => toast.message("Auth disabled in dev mode")}
              className="flex items-center gap-2 text-[var(--text-muted)]"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
