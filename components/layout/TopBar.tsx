"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from "./Sidebar";

export function TopBar() {
  return (
    <header className="flex items-center justify-between border-b bg-card px-4 py-3 md:hidden">
      <Link href="/dashboard" className="font-semibold">
        Tracert
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" aria-label="Open menu">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <Sidebar />
        </SheetContent>
      </Sheet>
    </header>
  );
}
