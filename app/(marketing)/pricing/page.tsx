import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const freeFeatures = [
  "Blueprint tracker",
  "Lab hours logging",
  "Study streak",
  "Exam countdown",
  "3 AI insights / month",
  "Leaderboard (view)",
];

const proFeatures = [
  "Unlimited AI insights",
  "Streak freeze tokens",
  "Weekly summary emails",
  "Streak nudge emails",
  "Leaderboard participation",
  "Full journey history",
  "CSV export",
  "Priority support",
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 p-6 md:p-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Simple pricing for serious candidates</h1>
        <p className="mt-2 text-muted-foreground">
          Start free. Upgrade when you need unlimited AI coaching.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Free</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {freeFeatures.map((feature) => (
              <p key={feature} className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-emerald-500" />
                {feature}
              </p>
            ))}
            <Button asChild variant="outline" className="mt-4 w-full">
              <Link href="/signup">Get started free</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-primary/40">
          <CardHeader>
            <CardTitle>Pro — $14/mo or $120/yr</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {proFeatures.map((feature) => (
              <p key={feature} className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-emerald-500" />
                {feature}
              </p>
            ))}
            <p className="pt-2 text-xs text-muted-foreground">
              Save 29% with annual billing.
            </p>
            <Button asChild className="mt-2 w-full">
              <Link href="/dashboard/settings">Start Pro</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        CCIE lab costs around $1,600. Tracert Pro is designed to help you pass faster.
      </p>
    </div>
  );
}
