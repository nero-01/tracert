import { CertTimeline } from "@/components/journey/CertTimeline";
import { TrackCard } from "@/components/journey/TrackCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function JourneyPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Cert Journey</h1>
        <Button asChild variant="outline">
          <Link href="/dashboard/settings">Update Goals</Link>
        </Button>
      </div>
      <CertTimeline />
      <TrackCard />
    </div>
  );
}
