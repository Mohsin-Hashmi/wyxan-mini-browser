import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { WebsiteListSkeletonProps } from "@/types/common.types";

export function WebsiteListSkeleton({
  columns = 2,
  label = "Loading indexed websites",
}: WebsiteListSkeletonProps) {
  return (
    <div role="status" aria-label={label}>
      <span className="sr-only">{label}…</span>
      <div
        aria-hidden="true"
        className={`grid gap-4 ${columns === 2 ? "lg:grid-cols-2" : ""}`}
      >
        {Array.from({ length: 4 }, (_, index) => (
          <Card
            key={index}
            className="rounded-xl border border-border/70 bg-transparent py-0 shadow-none ring-0"
          >
            <CardContent className="flex gap-4 p-4 lg:gap-5 lg:p-4.5">
              <Skeleton className="size-12 shrink-0 rounded-xl" />
              <div className="min-w-0 flex-1 space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
