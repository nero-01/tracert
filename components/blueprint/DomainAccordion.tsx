"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { TopicRow } from "@/components/blueprint/TopicRow";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { ConfidenceLevel, TopicStatus, TopicWithProgress } from "@/types";

interface DomainAccordionProps {
  domains: string[];
  topics: TopicWithProgress[];
  progressByDomain: Record<string, number>;
  onUpdateTopic: (
    topicId: string,
    updates: { status?: TopicStatus; confidence?: ConfidenceLevel }
  ) => void;
}

export function DomainAccordion({
  domains,
  topics,
  progressByDomain,
  onUpdateTopic,
}: DomainAccordionProps) {
  const [openDomains, setOpenDomains] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (domains.length > 0) {
      setOpenDomains((prev) => (prev.size > 0 ? prev : new Set([domains[0]])));
    }
  }, [domains]);

  function toggleDomain(domain: string) {
    setOpenDomains((prev) => {
      const next = new Set(prev);
      if (next.has(domain)) next.delete(domain);
      else next.add(domain);
      return next;
    });
  }

  return (
    <div className="space-y-2">
      {domains.map((domain) => {
        const domainTopics = topics.filter((t) => t.domain === domain);
        const weight = domainTopics[0]?.weight ?? 0;
        const progress = progressByDomain[domain] ?? 0;
        const isOpen = openDomains.has(domain);
        const mastered = domainTopics.filter((t) => t.status === "mastered").length;

        return (
          <div key={domain} className="rounded-lg border bg-card">
            <button
              type="button"
              onClick={() => toggleDomain(domain)}
              className="flex w-full items-center gap-3 p-4 text-left"
            >
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                  isOpen && "rotate-180"
                )}
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium">{domain}</span>
                  {weight > 0 && (
                    <span className="text-xs text-muted-foreground">· {weight}%</span>
                  )}
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <Progress value={progress} className="h-2 flex-1" />
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {progress}% · {mastered}/{domainTopics.length}
                  </span>
                </div>
              </div>
            </button>

            {isOpen && (
              <div className="border-t px-4">
                {domainTopics.map((topic) => (
                  <TopicRow key={topic.id} topic={topic} onUpdate={onUpdateTopic} />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
