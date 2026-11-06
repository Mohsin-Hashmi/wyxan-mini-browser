"use client";

import { Card, CardTitle } from "@/components/ui/card";
import { useSearchForm } from "@/hooks/use-search-form";
import { useSiteSearch } from "@/hooks/apis/use-sites";
import { getApiErrorMessage } from "@/lib/api-error";
import type { SearchStatus } from "@/types/search.types";
import { SearchHeader } from "../search-header/search-header";
import { SearchForm } from "../search-form/search-form";
import { SearchResults } from "../search-results/search-results";

export function SearchPage() {
  const { formik, query, hasValidQuery, clearSearch } = useSearchForm();
  const limit = 50;
  const search = useSiteSearch(hasValidQuery ? query : "", limit);
  const results = search.data || [];
  let status: SearchStatus = "idle";
  if (hasValidQuery) {
    if (search.isPending) status = "loading";
    else if (search.isError) status = "error";
    else status = "success";
  }

  return (
    <>
      <Card
        role="region"
        aria-labelledby="search-heading"
        className="gap-6 rounded-xl border border-primary/20 bg-linear-to-br from-surface to-accent/20 p-6 shadow-none ring-0 md:px-10 lg:px-12 lg:py-8"
      >
        <SearchHeader />
        <SearchForm
          formik={formik}
          invalidQuery={!!query && !hasValidQuery}
          isSearching={search.isFetching}
          onClear={clearSearch}
        />
      </Card>
      <div>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <CardTitle
            role="heading"
            aria-level={2}
            id="search-results-heading"
            className="text-xl font-bold tracking-tight lg:text-[23px]"
          >
            Search results
          </CardTitle>
          <span
            role="status"
            aria-live="polite"
            className="max-w-2xl text-sm leading-6 text-muted-foreground wrap-anywhere md:text-base"
          >
            {status === "success"
              ? `${results.length} ${results.length === 1 ? "result" : "results"}${results.length === limit ? " shown" : ""} for “${query}”`
              : status === "loading"
                ? "Searching published pages…"
                : "Search across published page titles and content."}
          </span>
        </div>
        <SearchResults
          status={status}
          results={results}
          errorMessage={getApiErrorMessage(search.error)}
          onRetry={() => void search.refetch()}
        />
      </div>
    </>
  );
}
