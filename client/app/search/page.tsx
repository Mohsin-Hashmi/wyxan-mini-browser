import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchPage, SearchPageLoading } from "@/components/search";
import { AppShell } from "@/components/common";

export const metadata: Metadata = {
  title: "Search Published Sites | Wyxan Mini Browser",
};

export default function Page() {
  return (
    <AppShell pageHref="/search">
      <Suspense fallback={<SearchPageLoading />}>
        <SearchPage />
      </Suspense>
    </AppShell>
  );
}
