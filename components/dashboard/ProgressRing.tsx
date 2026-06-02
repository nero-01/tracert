export function ProgressRing({ value = 0 }: { value?: number }) {
  return (
    <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-primary/20">
      <span className="text-lg font-semibold">{value}%</span>
    </div>
  );
}
