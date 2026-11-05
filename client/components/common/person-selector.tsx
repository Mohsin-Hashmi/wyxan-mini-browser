"use client";

import { UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePeople } from "@/hooks/apis/use-people";
import { usePersonStore } from "@/store/person-store";
import { getApiErrorMessage } from "@/lib/api-error";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function PersonSelector() {
  const people = usePeople();
  const personId = usePersonStore((state) => state.personId);
  const setPersonId = usePersonStore((state) => state.setPersonId);
  const selectedPerson = people.data?.find((person) => person.id === personId);
  const placeholder = people.isPending
    ? "Loading people…"
    : people.isError
      ? "People unavailable"
      : !people.data?.length
        ? "No people available"
        : "Choose a person";

  return (
    <div className="flex flex-col gap-1">
      <Select
        value={selectedPerson?.id || null}
        onValueChange={(value) => {
          if (value) setPersonId(value);
        }}
        disabled={people.isPending || !people.data?.length}
      >
        <SelectTrigger
          aria-label="Browsing person"
          aria-describedby={people.isError ? "people-error" : undefined}
          className="h-10.5 min-w-40 rounded-lg bg-transparent px-3.5 shadow-xs"
        >
          <UserRound aria-hidden="true" className="size-4.5 shrink-0" />
          <SelectValue placeholder={placeholder}>
            {selectedPerson?.name}
          </SelectValue>
        </SelectTrigger>
        <SelectContent align="end" alignItemWithTrigger={false}>
          {people.data?.map((person) => (
            <SelectItem key={person.id} value={person.id}>
              {person.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {people.isError && (
        <Alert
          variant="destructive"
          id="people-error"
          role="alert"
          className="max-w-52 text-xs text-destructive"
        >
          <AlertDescription className="text-xs">
            {getApiErrorMessage(people.error)}
          </AlertDescription>
          <Button
            variant="link"
            disabled={people.isFetching}
            onClick={() => void people.refetch()}
            className="h-6 px-0 text-xs"
          >
            Retry people
          </Button>
        </Alert>
      )}
    </div>
  );
}
