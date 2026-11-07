"use client";

import { SheetFooter } from "@/components/ui/sheet";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { usePersonStore } from "@/store/person-store";
import { usePeople } from "@/hooks/apis/use-people";
import { useVisitHistory } from "@/hooks/apis/use-visits";
import { useHistorySearch } from "@/hooks/use-history-search";
import { getApiErrorMessage } from "@/lib/api-error";
import { HistorySearch } from "../history-search/history-search";
import { HistoryHeader } from "../history-header/history-header";
import { HistoryResults } from "../history-results/history-results";
import { ClearHistoryDialog } from "../clear-history-dialog/clear-history-dialog";

export function HistoryPanel() {
  const personId = usePersonStore((state) => state.personId);
  const people = usePeople();
  const person = people.data?.find((entry) => entry.id === personId);
  const search = useHistorySearch();
  const history = useVisitHistory(personId, 20, search.query);
  const visits = history.data?.pages.flatMap((page) => page.data) || [];
  const total = history.data?.pages[0]?.meta.total || 0;
  return (
    <>
      <HistoryHeader />
      <div className="space-y-4 px-6 pb-4">
        {people.isError && (
          <Alert variant="destructive">
            <AlertTitle>Unable to load people</AlertTitle>
            <AlertDescription>
              {getApiErrorMessage(people.error)}
              <Button
                variant="outline"
                disabled={people.isFetching}
                onClick={() => void people.refetch()}
              >
                Retry people
              </Button>
            </AlertDescription>
          </Alert>
        )}
        {personId && <HistorySearch formik={search.formik} />}
        <div
          role="status"
          aria-live="polite"
          className="text-sm text-muted-foreground"
        >
          {!personId
            ? "History is shown for one person at a time."
            : history.isPending
              ? "Loading history…"
              : history.isError && !visits.length
                ? "History unavailable"
                : `${total} ${total === 1 ? "visit" : "visits"}${search.query ? " matching your search" : ""}`}
        </div>
        <Separator />
      </div>
      <HistoryResults
        personId={personId}
        history={history}
        visits={visits}
        hasSearch={!!search.query}
      />
      <SheetFooter className="border-t border-border/65 p-6">
        <ClearHistoryDialog
          personId={personId}
          personName={person?.name || "this person"}
          disabled={
            !person ||
            history.isPending ||
            history.isError ||
            (!search.query && !total)
          }
        />
      </SheetFooter>
    </>
  );
}
