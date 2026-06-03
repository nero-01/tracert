"use client";

import { format, parseISO } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { formatHours } from "@/lib/utils";

function cellColor(minutes: number) {
  if (minutes === 0) return "bg-[var(--bg-subtle)]";
  if (minutes < 30) return "bg-brand-200 dark:bg-brand-900/50";
  if (minutes < 90) return "bg-brand-400";
  if (minutes < 180) return "bg-brand-500";
  return "bg-brand-600 shadow-glow-teal";
}

export function StreakHeatmap({
  calendarData,
}: {
  calendarData: { date: string; minutes: number }[];
}) {
  const weeks: { date: string; minutes: number }[][] = [];
  for (let i = 0; i < calendarData.length; i += 7) {
    weeks.push(calendarData.slice(i, i + 7));
  }

  const dayHeaders = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="min-w-0">
      <div className="overflow-x-auto pb-2 scrollbar-none">
        <div className="inline-block min-w-0">
          <div className="mb-2 hidden grid-cols-[auto_repeat(7,1fr)] gap-1 sm:grid">
            <div />
            {dayHeaders.map((d) => (
              <div key={d} className="text-center text-xs text-[var(--text-muted)]">
                {d}
              </div>
            ))}
          </div>
          <div className="mb-2 grid grid-cols-7 gap-1 sm:hidden">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <div key={i} className="text-center text-[10px] text-[var(--text-muted)]">
                {d}
              </div>
            ))}
          </div>
          <div className="space-y-1">
            {weeks.map((week, rowIdx) => {
              const monthLabel =
                rowIdx === 0 || format(parseISO(week[0].date), "M") !== format(parseISO(weeks[rowIdx - 1]?.[0]?.date ?? week[0].date), "M")
                  ? format(parseISO(week[0].date), "MMM")
                  : "";

              return (
                <div
                  key={week[0].date}
                  className="grid grid-cols-[auto_repeat(7,22px)] items-center gap-1 sm:grid-cols-[3rem_repeat(7,28px)] sm:gap-1.5"
                >
                  <span className="hidden w-12 text-xs text-[var(--text-muted)] sm:inline">
                    {monthLabel}
                  </span>
                  {week.map((day) => (
                    <TooltipProvider key={day.date}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className={cn(
                              "aspect-square h-[22px] w-[22px] rounded-md transition-transform hover:scale-110 hover:ring-2 hover:ring-brand-500 sm:h-7 sm:w-7",
                              cellColor(day.minutes)
                            )}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          {format(parseISO(day.date), "EEE d MMM yyyy")}
                          <br />
                          {day.minutes > 0
                            ? formatHours(day.minutes)
                            : "No session"}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[var(--text-muted)]">
        <span>Less</span>
        {[
          { label: "None", min: 0 },
          { label: "<30m", min: 15 },
          { label: "30–90m", min: 60 },
          { label: "90–3h", min: 120 },
          { label: "3h+", min: 200 },
        ].map(({ label, min }) => (
          <span key={label} className="flex items-center gap-1">
            <span className={cn("h-3 w-3 rounded-sm", cellColor(min))} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
