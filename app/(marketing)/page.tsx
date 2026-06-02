import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const quickLinks = [
  "/dashboard",
  "/dashboard/blueprint",
  "/dashboard/labs",
  "/dashboard/streak",
  "/dashboard/insights",
  "/dashboard/leaderboard",
  "/dashboard/journey",
  "/dashboard/settings",
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Tracert Dev Mode</CardTitle>
          <p className="text-sm text-muted-foreground">
            Auth is bypassed. Use the links below to open any page directly.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button asChild className="w-full sm:w-auto">
            <Link href="/dashboard">Open Dashboard</Link>
          </Button>

          <div className="grid gap-2 sm:grid-cols-2">
            {quickLinks.map((href) => (
              <Link
                key={href}
                href={href}
                className="rounded-md border px-3 py-2 text-sm hover:bg-muted"
              >
                {href}
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
