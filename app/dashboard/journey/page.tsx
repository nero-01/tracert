import { CertTimeline } from "@/components/journey/CertTimeline";
import { TrackCard } from "@/components/journey/TrackCard";

export default function JourneyPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Cert Journey</h1>
      <CertTimeline />
      <TrackCard />
    </div>
  );
}
