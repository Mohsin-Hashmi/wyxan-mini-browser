import { Badge } from "@/components/ui/badge";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { BrowserIllustration } from "@/components/common/browser-illustration";

export function PublishHeader() {
  return (
    <Card
      role="region"
      aria-labelledby="publish-heading"
      className="grid items-center gap-6 rounded-xl border border-primary/20 bg-linear-to-br from-surface to-accent/20 p-6 shadow-none ring-0 md:px-10 lg:grid-cols-[1.65fr_1fr] lg:gap-8 lg:px-12 lg:py-8"
    >
      <div className="min-w-0">
        <Badge className="h-auto rounded-lg border-0 bg-accent px-3 py-1 text-sm font-medium text-primary">
          Publishing
        </Badge>
        <CardTitle
          id="publish-heading"
          role="heading"
          aria-level={1}
          className="mt-3 text-3xl leading-tight font-bold tracking-tight lg:text-[36px]"
        >
          Publish New Website
        </CardTitle>
        <CardDescription className="mt-1 max-w-3xl text-base leading-6 text-muted-foreground lg:text-lg">
          Give your ideas an address. Choose a publisher, add your page details,
          and publish your HTML to the small web.
        </CardDescription>
      </div>
      <BrowserIllustration compact variant="publish" />
    </Card>
  );
}
