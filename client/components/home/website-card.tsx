import { ArrowUpRight, CalendarDays, Globe2, UserRound } from "lucide-react";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { SiteListItem } from "@/types/sites.types";

interface WebsiteCardProps {
  site: SiteListItem;
  authorName: string;
}

export function WebsiteCard({ site, authorName }: WebsiteCardProps) {
  const publishedDate = new Date(site.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <Card className="rounded-xl border border-border/70 bg-transparent py-0 shadow-none ring-0">
      <CardContent className="flex gap-4 p-4 lg:gap-5 lg:p-4.5">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent/75 text-primary">
          <Globe2 aria-hidden="true" className="size-7 stroke-[1.6]" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <CardTitle
                  role="heading"
                  aria-level={3}
                  className="text-base leading-6 font-bold tracking-tight wrap-break-word lg:text-lg"
                >
                  {site.title}
                </CardTitle>
                <Badge className="h-auto rounded-md border-0 bg-accent/70 px-2.5 py-0.5 text-xs font-medium text-primary">
                  HTML
                </Badge>
              </div>
              <CardDescription className="mt-0.5 text-sm break-all text-muted-foreground">
                {site.address}
              </CardDescription>
            </div>
            <Button
              disabled
              variant="outline"
              size="icon-sm"
              aria-label={`Open ${site.title}`}
              className="shrink-0 rounded-lg bg-transparent text-muted-foreground disabled:opacity-100"
            >
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Button>
          </div>
          <CardDescription className="mt-2 line-clamp-3 text-sm leading-5 wrap-break-word text-muted-foreground">
            {site.excerpt}
          </CardDescription>
          <CardFooter className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 border-0 bg-transparent p-0 text-[11px] text-muted-foreground lg:text-xs">
            <span className="flex items-center gap-2">
              <CalendarDays aria-hidden="true" className="size-3.5 shrink-0" />
              Published <time dateTime={site.createdAt}>{publishedDate}</time>
            </span>
            <Separator orientation="vertical" className="h-4" />
            <span className="flex items-center gap-2">
              <UserRound aria-hidden="true" className="size-3.5 shrink-0" />
              {authorName}
            </span>
          </CardFooter>
        </div>
      </CardContent>
    </Card>
  );
}
