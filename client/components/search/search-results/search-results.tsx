import { CircleAlert, Search, SearchX } from "lucide-react";
import { WebsiteCard } from "@/components/common/website-card";
import { WebsiteListSkeleton } from "@/components/common/website-list-skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";
import type { SearchResultsProps } from "@/types/search.types";

export function SearchResults({
  status,
  results,
  errorMessage,
  onRetry,
}: SearchResultsProps) {
  if (status === "loading")
    return (
      <WebsiteListSkeleton columns={1} label="Searching published sites" />
    );

  if (status === "error") {
    return (
      <Alert variant="destructive" className="min-h-60 bg-card p-6">
        <CircleAlert aria-hidden="true" />
        <AlertTitle>Unable to search published sites</AlertTitle>
        <AlertDescription className="space-y-4">
          <div>{errorMessage}</div>
          <Button variant="outline" onClick={onRetry}>
            Try again
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (status === "idle" || !results.length) {
    return (
      <Empty
        role="status"
        className="min-h-72 border border-solid border-border/70 bg-card/40"
      >
        <EmptyHeader>
          <EmptyMedia variant="icon">
            {status === "idle" ? (
              <Search aria-hidden="true" />
            ) : (
              <SearchX aria-hidden="true" />
            )}
          </EmptyMedia>
          <EmptyTitle className="text-lg font-semibold md:text-xl">
            {status === "idle"
              ? "Your next discovery starts here"
              : "No matching sites"}
          </EmptyTitle>
          <EmptyDescription className="text-base leading-7">
            {status === "idle"
              ? "Search for a word or phrase. Try plants, water, or stories to explore the published pages."
              : "Try a different word or a shorter phrase. Search looks through page titles and content."}
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div
      id="search-results"
      role="region"
      aria-labelledby="search-results-heading"
      className="space-y-4"
    >
      {results.map((site) => (
        <WebsiteCard key={site.id} site={site} />
      ))}
    </div>
  );
}
