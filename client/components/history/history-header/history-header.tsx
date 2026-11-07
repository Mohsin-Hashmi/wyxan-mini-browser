"use client";

import { History, UserRound } from "lucide-react";
import {
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { usePersonStore } from "@/store/person-store";
import { usePeople } from "@/hooks/apis/use-people";

export function HistoryHeader() {
  const personId = usePersonStore((state) => state.personId);
  const setPersonId = usePersonStore((state) => state.setPersonId);
  const people = usePeople();
  const person = people.data?.find((entry) => entry.id === personId);
  return (
    <SheetHeader className="gap-4 p-6 pb-4 pr-12">
      <div className="flex items-center gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <History aria-hidden="true" className="size-6" />
        </span>
        <div>
          <SheetTitle className="text-2xl font-bold tracking-tight">
            Browsing History
          </SheetTitle>
          <SheetDescription className="mt-1">
            {person
              ? `${person.name} · Your journey through the small web`
              : "Choose a person to view their browsing history."}
          </SheetDescription>
        </div>
      </div>
      <Select
        value={person?.id || null}
        disabled={people.isPending || !people.data?.length}
        onValueChange={(value) => {
          if (value) setPersonId(value);
        }}
      >
        <SelectTrigger
          aria-label="History person"
          className="w-full bg-transparent data-[size=default]:h-11"
        >
          <UserRound aria-hidden="true" />
          <SelectValue
            placeholder={
              people.isPending
                ? "Loading people…"
                : people.isError
                  ? "People unavailable"
                  : !people.data?.length
                    ? "No people available"
                    : "Choose a person"
            }
          >
            {person?.name}
          </SelectValue>
        </SelectTrigger>
        <SelectContent align="start" alignItemWithTrigger={false}>
          <SelectGroup>
            {people.data?.map((entry) => (
              <SelectItem key={entry.id} value={entry.id}>
                {entry.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </SheetHeader>
  );
}
