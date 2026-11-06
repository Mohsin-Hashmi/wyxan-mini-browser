"use client";

import { ArrowRight, CircleAlert, Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSites } from "@/hooks/apis/use-sites";
import { usePeople } from "@/hooks/apis/use-people";
import { getApiErrorMessage } from "@/lib/api-error";
import { WebsiteCard } from "@/components/common/website-card";
import { WebsiteListSkeleton } from "@/components/common/website-list-skeleton";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";

export function FeaturedSites() {
  const sites = useSites();
  const people = usePeople();
  const websites = sites.data?.pages.flatMap((page) => page.data) || [];

  return (
    <div
      role="region"
      id="indexed-websites"
      aria-labelledby="indexed-heading"
      className="scroll-mt-6"
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <CardTitle
            role="heading"
            aria-level={2}
            id="indexed-heading"
            className="text-xl font-bold tracking-tight lg:text-[23px]"
          >
            Indexed Websites
          </CardTitle>
          <CardDescription className="mt-0.5 text-sm text-muted-foreground">
            Discover websites published by people across the small web.
          </CardDescription>
        </div>
        {sites.hasNextPage && (
          <Button
            variant="ghost"
            disabled={sites.isFetching}
            onClick={() => void sites.fetchNextPage()}
            className="shrink-0 px-0 text-primary"
          >
            <span className="hidden sm:inline">
              {sites.isFetchingNextPage ? "Loading…" : "View More Sites"}
            </span>
            {sites.isFetchingNextPage ? (
              <Spinner aria-hidden="true" className="size-4.5 animate-spin" />
            ) : (
              <ArrowRight aria-hidden="true" className="size-4.5" />
            )}
            <span className="sr-only sm:hidden">Load more websites</span>
          </Button>
        )}
      </div>
      {sites.isPending ? (
        <WebsiteListSkeleton />
      ) : sites.isError && !websites.length ? (
        <Alert
          variant="destructive"
          className="flex min-h-60 flex-col items-center justify-center gap-3 rounded-xl border-border/70 bg-transparent p-6 text-center"
        >
          <CircleAlert aria-hidden="true" />
          <AlertTitle>Unable to load websites</AlertTitle>
          <AlertDescription>{getApiErrorMessage(sites.error)}</AlertDescription>
          <Button
            variant="outline"
            disabled={sites.isFetching}
            onClick={() => void sites.refetch()}
          >
            Try again
          </Button>
        </Alert>
      ) : !websites.length ? (
        <Empty
          role="status"
          className="min-h-60 border border-solid border-border/70"
        >
          <EmptyHeader>
            <EmptyMedia>
              <Globe2 aria-hidden="true" className="size-7 text-primary" />
            </EmptyMedia>
            <EmptyTitle>No websites published yet</EmptyTitle>
            <EmptyDescription>
              Published websites will appear here.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {websites.map((site) => (
            <WebsiteCard
              key={site.id}
              site={site}
              publishedAt={site.createdAt}
              authorName={
                people.data?.find((person) => person.id === site.authorId)
                  ?.name ||
                (people.isPending ? "Loading author…" : "Author unavailable")
              }
            />
          ))}
        </div>
      )}
      {sites.isFetchNextPageError && (
        <Alert variant="destructive" className="mt-3">
          <AlertDescription>
            Unable to load more websites. Use View More Sites to try again.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
