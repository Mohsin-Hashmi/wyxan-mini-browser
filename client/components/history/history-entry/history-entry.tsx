import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Globe2,
  History,
  Link2,
  Monitor,
  Search,
  SearchX,
} from "lucide-react";
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemMedia,
} from "@/components/ui/item";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { visitSourceLabels } from "@/lib/history";
import type { VisitSource } from "@/types/visits.types";
import type { HistoryEntryProps } from "@/types/history.types";

const sourceIcons: Record<VisitSource, typeof History> = {
  "address-bar": Monitor,
  link: Link2,
  search: Search,
  back: ArrowLeft,
  forward: ArrowRight,
  history: History,
};

export function HistoryEntry({ visit }: HistoryEntryProps) {
  const SourceIcon = sourceIcons[visit.source];
  const date = new Date(visit.visitedAt);
  return (
    <Item
      role="listitem"
      className="flex-nowrap items-start gap-3 rounded-xl border-0 px-2 py-4 hover:bg-accent/35"
    >
      <ItemMedia className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent/70 text-primary">
        {visit.outcome === "found" ? (
          <Globe2 aria-hidden="true" className="size-6" />
        ) : (
          <SearchX aria-hidden="true" className="size-6" />
        )}
      </ItemMedia>
      <ItemContent className="min-w-0 gap-1">
        <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
          <ItemTitle className="min-w-0 text-base font-semibold wrap-anywhere">
            {visit.title || "Page not found"}
          </ItemTitle>
          <time
            dateTime={visit.visitedAt}
            title={date.toLocaleString()}
            className="shrink-0 text-xs leading-6 text-muted-foreground"
          >
            {date.toLocaleTimeString(undefined, {
              hour: "numeric",
              minute: "2-digit",
            })}
          </time>
        </div>
        <ItemDescription className="line-clamp-none text-sm wrap-anywhere">
          {visit.address}
        </ItemDescription>
        <div className="mt-1 flex flex-wrap gap-1.5">
          <Badge
            variant="secondary"
            className="gap-1.5 rounded-md bg-accent/65 text-xs font-normal text-foreground"
          >
            <SourceIcon aria-hidden="true" className="size-3.5" />
            {visitSourceLabels[visit.source]}
          </Badge>
          {visit.outcome === "not-found" && (
            <Badge
              variant="outline"
              className="rounded-md text-xs text-muted-foreground"
            >
              Not found
            </Badge>
          )}
        </div>
      </ItemContent>
      <Button
        disabled
        variant="outline"
        size="icon-sm"
        aria-label={`Reopen ${visit.address}`}
        className="mt-1 shrink-0 bg-transparent text-muted-foreground disabled:opacity-100"
      >
        <ArrowUpRight aria-hidden="true" />
      </Button>
    </Item>
  );
}
