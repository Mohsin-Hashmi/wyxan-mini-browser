"use client";

import { History, UserRound } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { getApiErrorMessage } from "@/lib/api-error";
import { HistoryList } from "../history-list/history-list";
import type { HistoryResultsProps } from "@/types/history.types";

export function HistoryResults({
  personId,
  history,
  visits,
  hasSearch,
}: HistoryResultsProps) {
  return (
    <ScrollArea
      className="min-h-0 flex-1"
      aria-label="Browsing history entries"
    >
      <div className="px-4 pb-6">
        {!personId ? (
          <Empty className="min-h-64">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <UserRound aria-hidden="true" />
              </EmptyMedia>
              <EmptyTitle className="text-lg font-semibold">
                Choose a person
              </EmptyTitle>
              <EmptyDescription>
                Select a name above to see their visits.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : history.isPending ? (
          <div
            role="status"
            aria-label="Loading history"
            className="space-y-4 px-2"
          >
            {Array.from({ length: 5 }, (_, index) => (
              <Skeleton key={index} className="h-24 w-full rounded-xl" />
            ))}
          </div>
        ) : (
          <>
            {history.isError && (
              <Alert variant="destructive" className="mb-4">
                <AlertTitle>Unable to load history</AlertTitle>
                <AlertDescription>
                  {getApiErrorMessage(history.error)}
                  <Button
                    variant="outline"
                    disabled={history.isFetching}
                    onClick={() =>
                      void (history.isFetchNextPageError
                        ? history.fetchNextPage()
                        : history.refetch())
                    }
                  >
                    Try again
                  </Button>
                </AlertDescription>
              </Alert>
            )}
            {!history.isError && !visits.length && (
              <Empty className="min-h-64">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <History aria-hidden="true" />
                  </EmptyMedia>
                  <EmptyTitle className="text-lg font-semibold">
                    {hasSearch
                      ? "No matching visits"
                      : "No browsing history yet"}
                  </EmptyTitle>
                  <EmptyDescription>
                    {hasSearch
                      ? "Try a different title or address."
                      : "Visits will appear here when this person browses published pages."}
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            )}
            <HistoryList visits={visits} />
            {history.hasNextPage && !history.isFetchNextPageError && (
              <Button
                variant="outline"
                disabled={history.isFetching}
                onClick={() => void history.fetchNextPage()}
                className="mt-4 w-full"
              >
                {history.isFetchingNextPage && <Spinner aria-hidden="true" />}
                {history.isFetchingNextPage
                  ? "Loading visits…"
                  : "Load more visits"}
              </Button>
            )}
          </>
        )}
      </div>
    </ScrollArea>
  );
}
