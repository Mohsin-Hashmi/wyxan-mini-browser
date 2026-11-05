import type { Types } from "mongoose";
import type { ZodError } from "zod";
import type { Visit, VisitResponse } from "../types/visit.types.js";

export function formatVisit(visit: Visit & { _id: Types.ObjectId }): VisitResponse {
  let siteId: string | null = null;
  if (visit.siteId) {
    siteId = visit.siteId.toString();
  }

  return {
    id: visit._id.toString(),
    personId: visit.personId.toString(),
    address: visit.address,
    siteId,
    title: visit.title,
    source: visit.source,
    outcome: visit.outcome,
    eventId: visit.eventId,
    visitedAt: visit.visitedAt.toISOString(),
  };
}

export function formatVisitValidationErrors(error: ZodError) {
  return error.issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));
}
