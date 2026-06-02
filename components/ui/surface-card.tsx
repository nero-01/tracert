import { cn } from "@/lib/utils";

interface SurfaceCardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  glowOnHover?: boolean;
  padding?: "sm" | "md" | "lg";
  onClick?: () => void;
}

const paddingMap = {
  sm: "p-4",
  md: "p-5",
  lg: "p-6 md:p-8",
};

export function SurfaceCard({
  children,
  className,
  hoverable = false,
  glowOnHover = false,
  padding = "md",
  onClick,
}: SurfaceCardProps) {
  const Comp = onClick ? "button" : "div";

  return (
    <Comp
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "rounded-card border border-[var(--border)] bg-[var(--bg-surface)] text-left shadow-card transition-all duration-200 ease-out",
        paddingMap[padding],
        hoverable &&
          "hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-hover)]",
        glowOnHover &&
          "hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-glow-teal-strong",
        onClick && "active:scale-[0.98]",
        className
      )}
    >
      {children}
    </Comp>
  );
}
