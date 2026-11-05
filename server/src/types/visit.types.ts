import type { Types } from "mongoose";
import type { VisitOutcome, VisitSource } from "../schemas/visit.schema.js";

export interface Visit {
  personId: Types.ObjectId;
  address: string;
  siteId: Types.ObjectId | null;
  title: string | null;
  source: VisitSource;
  outcome: VisitOutcome;
  eventId: string;
  visitedAt: Date;
}

export interface VisitResponse {
  id: string;
  personId: string;
  address: string;
  siteId: string | null;
  title: string | null;
  source: VisitSource;
  outcome: VisitOutcome;
  eventId: string;
  visitedAt: string;
}

export interface RecordVisitResult {
  visit: VisitResponse;
  created: boolean;
}

export interface VisitHistoryResponse {
  visits: VisitResponse[];
  nextCursor: string | null;
}
