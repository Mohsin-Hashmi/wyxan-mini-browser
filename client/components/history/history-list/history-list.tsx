import { Badge } from "@/components/ui/badge";
import { ItemGroup } from "@/components/ui/item";
import { groupVisitsByDay } from "@/lib/history";
import { HistoryEntry } from "../history-entry/history-entry";
import type { HistoryListProps } from "@/types/history.types";

export function HistoryList({ visits }: HistoryListProps) {
  return (
    <div className="space-y-4">
      {groupVisitsByDay(visits).map((group) => (
        <div key={group.label} className="space-y-1">
          <Badge
            role="heading"
            aria-level={3}
            variant="secondary"
            className="rounded-md bg-border/45 px-3 py-1 text-sm font-medium text-foreground"
          >
            {group.label}
          </Badge>
          <ItemGroup
            aria-label={group.label}
            className="gap-0 divide-y divide-border/60"
          >
            {group.visits.map((visit) => (
              <HistoryEntry key={visit.id} visit={visit} />
            ))}
          </ItemGroup>
        </div>
      ))}
    </div>
  );
}
