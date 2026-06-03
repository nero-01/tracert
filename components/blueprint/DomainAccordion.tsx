"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { TopicRow } from "@/components/blueprint/TopicRow";
import { SurfaceCard } from "@/components/ui/surface-card";
import { getDomainColor } from "@/lib/blueprint/domain-colors";
import { cn } from "@/lib/utils";
import type { ConfidenceLevel, TopicStatus, TopicWithProgress } from "@/types";

type ComponentFilter = "all" | "written" | "lab";

interface DomainAccordionProps {
  trackId: string;
  domains: string[];
  topics: TopicWithProgress[];
  progressByDomain: Record<string, number>;
  onUpdateTopic: (
    topicId: string,
    updates: { status?: TopicStatus; confidence?: ConfidenceLevel }
  ) => void;
}

export function DomainAccordion({
  trackId,
  domains,
  topics,
  progressByDomain,
  onUpdateTopic,
}: DomainAccordionProps) {
  const [openDomains, setOpenDomains] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<Record<string, ComponentFilter>>({});
  const isCcie = trackId === "ccie-enterprise";

  useEffect(() => {
    if (domains.length > 0) {
      setOpenDomains((prev) => (prev.size > 0 ? prev : new Set([domains[0]])));
    }
  }, [domains]);

  function toggle(domain: string, open: boolean) {
    setOpenDomains((prev) => {
      const next = new Set(prev);
      if (open) next.add(domain);
      else next.delete(domain);
      return next;
    });
  }

  function getFilter(domain: string): ComponentFilter {
    return filters[domain] ?? "all";
  }

  function setFilter(domain: string, filter: ComponentFilter) {
    setFilters((prev) => ({ ...prev, [domain]: filter }));
  }

  function filterTopics(domainTopics: TopicWithProgress[], filter: ComponentFilter) {
    if (!isCcie || filter === "all") return domainTopics;
    if (filter === "written") {
      return domainTopics.filter((t) => t.component === "written" || t.component === "both");
    }
    return domainTopics.filter((t) => t.component === "lab" || t.component === "both");
  }

  const filterChips: { id: ComponentFilter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "written", label: "Written" },
    { id: "lab", label: "Lab" },
  ];

  return (
    <div className="space-y-3">
      {domains.map((domain) => {
        const domainTopics = topics.filter((t) => t.domain === domain);
        const weight = domainTopics[0]?.weight ?? 0;
        const progress = progressByDomain[domain] ?? 0;
        const isOpen = openDomains.has(domain);
        const dotColor = getDomainColor(domain, domains);
        const filter = getFilter(domain);
        const visibleTopics = filterTopics(domainTopics, filter);

        return (
          <Collapsible.Root
            key={domain}
            open={isOpen}
            onOpenChange={(open) => toggle(domain, open)}
          >
            <SurfaceCard hoverable padding="sm" className="overflow-hidden p-0">
              <Collapsible.Trigger asChild>
                <button
                  type="button"
                  className="group flex w-full items-center gap-3 p-4 text-left transition-all duration-200"
                >
                  <span
                    className={cn(
                      "h-3 w-3 shrink-0 rounded-full transition-transform duration-200 group-hover:scale-125 group-hover:shadow-glow-teal",
                      dotColor
                    )}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-[var(--text-primary)]">{domain}</span>
                      {weight > 0 && (
                        <span className="rounded-pill bg-[var(--bg-elevated)] px-2 py-0.5 text-xs text-[var(--text-muted)]">
                          {weight}%
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="hidden h-2 w-16 overflow-hidden rounded-pill bg-[var(--bg-subtle)] sm:block">
                        <div
                          className="h-full rounded-pill bg-brand-500 transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-[var(--text-muted)]">{progress}%</span>
                    </div>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-[var(--text-muted)] transition-transform duration-200",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
              </Collapsible.Trigger>

              <Collapsible.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <div className="border-t border-[var(--border)] bg-[var(--bg-elevated)] px-4">
                  {isCcie && isOpen && (
                    <div className="flex flex-wrap gap-2 py-3">
                      {filterChips.map((chip) => (
                        <button
                          key={chip.id}
                          type="button"
                          onClick={() => setFilter(domain, chip.id)}
                          className={cn(
                            "rounded-pill px-3 py-1 text-xs font-medium transition-all duration-200 active:scale-95",
                            filter === chip.id
                              ? "bg-brand-500/15 text-brand-500 border border-brand-500/30"
                              : "bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border)] hover:border-brand-500/30"
                          )}
                        >
                          {chip.label}
                        </button>
                      ))}
                    </div>
                  )}
                  {visibleTopics.map((topic) => (
                    <TopicRow key={topic.id} topic={topic} onUpdate={onUpdateTopic} />
                  ))}
                </div>
              </Collapsible.Content>
            </SurfaceCard>
          </Collapsible.Root>
        );
      })}
    </div>
  );
}
