import type { ApiResponse } from "@/types/api.types";

export type VisitSource =
  | "address-bar"
  | "link"
  | "search"
  | "back"
  | "forward"
  | "history";
export type VisitOutcome = "found" | "not-found";

export interface RecordVisitInput {
  address: string;
  source: VisitSource;
  outcome: VisitOutcome;
  eventId: string;
}

export interface RecordVisitVariables {
  personId: string;
  visit: RecordVisitInput;
}

export interface Visit extends RecordVisitInput {
  id: string;
  personId: string;
  siteId: string | null;
  title: string | null;
  visitedAt: string;
}

export interface VisitHistoryResponse extends ApiResponse<Visit[]> {
  meta: { nextCursor: string | null; total: number };
}

export interface ClearVisitHistoryResult {
  deletedCount: number;
}
