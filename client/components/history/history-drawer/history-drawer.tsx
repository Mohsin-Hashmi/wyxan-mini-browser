"use client";

import { useState } from "react";
import { History } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { usePersonStore } from "@/store/person-store";
import { HistoryPanel } from "../history-panel/history-panel";

export function HistoryDrawer() {
  const [open, setOpen] = useState(false);
  const personId = usePersonStore((state) => state.personId);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="size-11 text-foreground/85"
          />
        }
        aria-label="Browsing history"
        title="Browsing history"
      >
        <History aria-hidden="true" className="size-5" />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="gap-0 overflow-hidden bg-surface data-[side=right]:w-full data-[side=right]:sm:inset-y-3 data-[side=right]:sm:h-auto data-[side=right]:sm:max-w-150 sm:mr-3 sm:rounded-2xl sm:border"
      >
        {open && <HistoryPanel key={personId} />}
      </SheetContent>
    </Sheet>
  );
}
