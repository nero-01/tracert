import { GoalBar } from "@/components/labs/GoalBar";
import { HoursChart } from "@/components/labs/HoursChart";
import { SessionForm } from "@/components/labs/SessionForm";

export default function LabsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Lab Hours</h1>
      <GoalBar />
      <HoursChart />
      <SessionForm />
    </div>
  );
}
