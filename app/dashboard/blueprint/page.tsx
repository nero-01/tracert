import { TrackSelector } from "@/components/blueprint/TrackSelector";
import { DomainAccordion } from "@/components/blueprint/DomainAccordion";
import { ProgressRing } from "@/components/dashboard/ProgressRing";

export default function BlueprintPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Blueprint</h1>
        <ProgressRing value={0} />
      </div>
      <TrackSelector />
      <DomainAccordion />
    </div>
  );
}
