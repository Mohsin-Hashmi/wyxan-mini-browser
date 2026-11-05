import { Card } from "@/components/ui/card";

export function AppFooter() {
  return (
    <Card
      role="contentinfo"
      className="flex-row flex-wrap items-center justify-between gap-2 rounded-none border-t border-border/65 bg-surface px-6 py-3.5 text-xs text-foreground/80 shadow-none ring-0 sm:text-sm"
    >
      <span className="flex items-center gap-2.5">
        <span aria-hidden="true" className="size-2 rounded-full bg-success" />
        Ready
      </span>
      <span>Wyxan Mini Browser v0.2.4</span>
    </Card>
  );
}
