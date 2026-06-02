import { MarketingNav } from "@/components/layout/MarketingNav";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--bg-base)]">
      <MarketingNav />
      {children}
    </div>
  );
}
