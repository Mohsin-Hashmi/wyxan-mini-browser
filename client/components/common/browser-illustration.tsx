import { Check, CloudUpload, Globe2, Network, Search } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { BrowserIllustrationProps } from "@/types/common.types";

export function BrowserIllustration({
  compact = false,
  variant = "search",
}: BrowserIllustrationProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative mx-auto hidden h-64 w-full max-w-[440px] items-center justify-center lg:flex",
        compact && "h-28 max-w-72",
      )}
    >
      <div className="absolute inset-x-8 inset-y-9 -rotate-16 rounded-[28px] bg-primary/8" />
      <div className="absolute inset-x-7 inset-y-11 rotate-15 rounded-[28px] bg-primary/7" />
      <Card
        className={cn(
          "relative w-[335px] gap-0 overflow-hidden rounded-2xl bg-white py-0 shadow-xl shadow-primary/10 ring-0",
          compact && "w-52 rounded-xl",
        )}
      >
        <CardHeader
          className={cn(
            "flex h-8 flex-row items-center gap-2 bg-border/60 px-3.5",
            compact && "h-5 gap-1.5 px-2.5",
          )}
        >
          <span className="size-2.5 rounded-full bg-neutral/60" />
          <span className="size-2.5 rounded-full bg-neutral/60" />
          <span className="size-2.5 rounded-full bg-neutral/60" />
        </CardHeader>
        <CardContent
          className={cn("space-y-4 p-5", compact && "space-y-2 p-3")}
        >
          <div
            className={cn(
              "flex items-center gap-5 rounded-xl bg-accent/55 px-5 py-4",
              compact && "gap-3 px-3 py-2",
            )}
          >
            <Globe2
              className={cn(
                "size-11 shrink-0 text-neutral/65",
                compact && "size-7",
              )}
            />
            <div className="flex-1 space-y-2">
              <div className="h-2.5 w-4/5 rounded-full bg-border/75" />
              <div className="h-2 w-full rounded-full bg-border/65" />
              <div className="h-2 w-3/5 rounded-full bg-border/65" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-2 w-2/5 rounded-full bg-border/55" />
            <div className="h-2 w-1/3 rounded-full bg-border/55" />
          </div>
        </CardContent>
      </Card>
      {compact ? (
        <Card className="absolute right-1 bottom-3 rounded-full bg-white/95 p-3 shadow-lg shadow-primary/10 ring-0">
          {variant === "publish" ? (
            <CloudUpload className="size-7 text-primary" />
          ) : (
            <Search className="size-7 text-primary" />
          )}
        </Card>
      ) : (
        <Card className="absolute right-0 bottom-3 flex-row items-center gap-3 rounded-xl border border-white bg-white/95 px-4 py-3.5 shadow-lg shadow-primary/10 ring-0">
          <Network className="size-7 text-primary" />
          <span className="text-sm font-semibold">Web + Mesh</span>
          <span className="flex size-6 items-center justify-center rounded-full bg-accent text-primary">
            <Check className="size-3.5" />
          </span>
        </Card>
      )}
    </div>
  );
}
