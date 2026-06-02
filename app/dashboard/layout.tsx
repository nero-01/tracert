"use client";

import { BottomNav } from "@/components/layout/BottomNav";
import Sidebar from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg-base)]">
      <Sidebar className="hidden md:flex" />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden md:pl-16 lg:pl-60">
        <TopBar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 pb-24 md:p-6 md:pb-6 lg:p-8">
          {children}
        </main>
      </div>

      <BottomNav className="md:hidden" />
    </div>
  );
}
