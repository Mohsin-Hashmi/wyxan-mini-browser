import { Badge } from "@/components/ui/badge";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { BrowserIllustration } from "@/components/common/browser-illustration";

export function SearchHeader() {
  return (
    <div className="grid items-center gap-6 lg:grid-cols-[1.65fr_1fr] lg:gap-8">
      <div className="min-w-0">
        <Badge className="h-auto rounded-lg border-0 bg-accent px-3 py-1 text-sm font-medium text-primary">
          Search
        </Badge>
        <CardTitle
          id="search-heading"
          role="heading"
          aria-level={1}
          className="mt-3 text-3xl leading-tight font-bold tracking-tight lg:text-[36px]"
        >
          Search Published Sites
        </CardTitle>
        <CardDescription className="mt-1 text-base leading-6 text-muted-foreground lg:text-lg">
          Find and explore web content from the small web.
        </CardDescription>
      </div>
      <BrowserIllustration compact />
    </div>
  );
}
