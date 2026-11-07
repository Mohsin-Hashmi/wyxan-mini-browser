"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useClearVisitHistory } from "@/hooks/apis/use-visits";
import { getApiErrorMessage } from "@/lib/api-error";
import type { ClearHistoryDialogProps } from "@/types/history.types";

export function ClearHistoryDialog({
  personId,
  personName,
  disabled,
}: ClearHistoryDialogProps) {
  const [open, setOpen] = useState(false);
  const clear = useClearVisitHistory();
  return (
    <AlertDialog
      open={open}
      onOpenChange={(value) => {
        if (!clear.isPending) {
          setOpen(value);
          clear.reset();
        }
      }}
    >
      <AlertDialogTrigger
        disabled={disabled}
        render={
          <Button
            variant="outline"
            className="h-11 w-full border-destructive/20 bg-transparent text-destructive hover:bg-destructive/5 hover:text-destructive"
          />
        }
      >
        <Trash2 aria-hidden="true" />
        Clear history
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Clear browsing history?</AlertDialogTitle>
          <AlertDialogDescription>
            This permanently removes all visits for {personName}, including
            visits outside your current search. Published websites and other
            people&apos;s history are kept.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {clear.isError && (
          <Alert variant="destructive">
            <AlertDescription>
              {getApiErrorMessage(clear.error)}
            </AlertDescription>
          </Alert>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={clear.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={clear.isPending}
            onClick={() =>
              clear.mutate(personId, { onSuccess: () => setOpen(false) })
            }
          >
            {clear.isPending && <Spinner aria-hidden="true" />}
            {clear.isPending ? "Clearing…" : "Clear history"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
