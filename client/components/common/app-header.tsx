import { Bell, CircleHelp, PanelsTopLeft, Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function AppHeader() {
  return (
    <Card
      role="banner"
      className="h-14 shrink-0 flex-row items-center justify-between gap-3 rounded-none border-b border-border/65 bg-surface px-4 py-0 shadow-none ring-0 md:px-6"
    >
      <Link
        href="/home"
        className="flex min-w-0 items-center gap-3"
        aria-label="Wyxan Mini Browser home"
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
          <PanelsTopLeft aria-hidden="true" className="size-5" />
        </span>
        <span className="truncate text-base font-bold tracking-tight sm:text-lg">
          Wyxan Mini Browser
        </span>
      </Link>
      <div className="flex shrink-0 items-center gap-1 sm:gap-3">
        <Button
          disabled
          variant="ghost"
          className="hidden gap-2 text-muted-foreground disabled:opacity-100 sm:inline-flex"
        >
          <CircleHelp aria-hidden="true" className="size-4.5" />
          Help
        </Button>
        <Separator
          orientation="vertical"
          className="hidden h-5 w-px bg-border/65 sm:block"
        />
        <Button
          disabled
          variant="ghost"
          size="icon"
          aria-label="Notifications"
          className="text-foreground disabled:opacity-100"
        >
          <Bell aria-hidden="true" className="size-5" />
        </Button>
        <Button
          disabled
          variant="ghost"
          size="icon"
          aria-label="Settings"
          className="text-foreground disabled:opacity-100"
        >
          <Settings aria-hidden="true" className="size-5" />
        </Button>
      </div>
    </Card>
  );
}
