"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function MarketingNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg-surface)]/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="font-semibold text-[var(--text-primary)]">
          Tracert
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/pricing" className="text-sm text-[var(--text-secondary)] hover:text-brand-500">
            Pricing
          </Link>
          <Link href="/login" className="text-sm text-[var(--text-secondary)] hover:text-brand-500">
            Login
          </Link>
          <ThemeToggle />
          <Button asChild size="sm">
            <Link href="/dashboard">Open Dashboard</Link>
          </Button>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-3">
                <Link href="/pricing" className="block text-sm">
                  Pricing
                </Link>
                <Link href="/login" className="block text-sm">
                  Login
                </Link>
                <Link href="/dashboard" className="block text-sm font-medium text-brand-500">
                  Dashboard
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
