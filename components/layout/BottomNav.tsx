"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import { mainNavItems, moreNavItems } from "@/lib/layout/nav";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface BottomNavProps {
  className?: string;
}

export function BottomNav({ className }: BottomNavProps) {
  const pathname = usePathname();

  const bottomItems = mainNavItems.slice(0, 4);
  const moreActive = moreNavItems.some(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`)
  );

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border)] bg-[var(--bg-surface)]/90 backdrop-blur-lg",
        "shadow-[0_-4px_24px_rgba(0,0,0,0.08)]",
        className
      )}
      style={{ paddingBottom: "max(0.5rem, var(--sab))" }}
    >
      <div className="mx-auto flex h-16 max-w-lg items-stretch justify-around px-2">
        {bottomItems.map(({ href, label, icon: Icon, shortLabel }) => {
          const active =
            pathname === href ||
            (href !== "/dashboard" && pathname.startsWith(href));

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-lg px-1 transition-all duration-200 active:scale-95",
                active ? "text-brand-500" : "text-[var(--text-muted)]"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 transition-transform",
                  active && "scale-110 fill-brand-500/20"
                )}
              />
              <span className={cn("truncate text-[10px]", active && "font-medium")}>
                {shortLabel ?? label}
              </span>
            </Link>
          );
        })}

        <Sheet>
          <SheetTrigger asChild>
            <button
              type="button"
              className={cn(
                "flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-lg px-1 transition-all duration-200 active:scale-95",
                moreActive ? "text-brand-500" : "text-[var(--text-muted)]"
              )}
            >
              <MoreHorizontal className="h-5 w-5" />
              <span className="text-[10px]">More</span>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-[14px]">
            <SheetHeader>
              <SheetTitle>More</SheetTitle>
            </SheetHeader>
            <div className="mt-4 space-y-1">
              {moreNavItems.map(({ href, label, icon: Icon }) => {
                const active =
                  pathname === href ||
                  pathname.startsWith(`${href}/`);

                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "flex h-14 items-center gap-3 rounded-xl px-4 text-sm transition-colors",
                      active
                        ? "bg-brand-500/10 text-brand-500"
                        : "hover:bg-[var(--bg-elevated)]"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {label}
                  </Link>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
