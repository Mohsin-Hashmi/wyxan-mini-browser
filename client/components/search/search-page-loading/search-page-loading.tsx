import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchHeader } from "../search-header/search-header";

export function SearchPageLoading() {
  return (
    <>
      <Card className="gap-6 rounded-xl border border-primary/20 bg-linear-to-br from-surface to-accent/20 p-6 shadow-none ring-0 md:px-10 lg:px-12 lg:py-8">
        <SearchHeader />
        <Skeleton aria-label="Loading search page" className="h-12 w-full" />
      </Card>
      <Skeleton className="h-72 w-full" />
    </>
  );
}
