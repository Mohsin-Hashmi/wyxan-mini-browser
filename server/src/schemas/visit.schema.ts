import { z } from "zod";
import { addressSchema } from "./site.schema.js";

const objectIdSchema = z.string().regex(/^[a-fA-F0-9]{24}$/, "Provide a valid ID").toLowerCase();

export const visitSourceSchema = z.enum(["address-bar", "link", "search", "back", "forward", "history"]);
export const visitOutcomeSchema = z.enum(["found", "not-found"]);

export const recordVisitBodySchema = z.object({
  address: addressSchema,
  source: visitSourceSchema,
  outcome: visitOutcomeSchema,
  eventId: z.uuid().toLowerCase(),
}).strict();

const personParamsSchema = z.object({ personId: objectIdSchema }).strict();

export const visitHistoryQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(20),
  before: objectIdSchema.optional(),
  q: z.string().trim().max(200).optional(),
}).strict();

export const recordVisitRequestSchema = z.object({
  params: personParamsSchema,
  body: recordVisitBodySchema,
});

export const visitHistoryRequestSchema = z.object({
  params: personParamsSchema,
  query: visitHistoryQuerySchema,
});

export const clearVisitHistoryRequestSchema = z.object({
  params: personParamsSchema,
});

export type VisitSource = z.infer<typeof visitSourceSchema>;
export type VisitOutcome = z.infer<typeof visitOutcomeSchema>;
export type RecordVisitInput = z.infer<typeof recordVisitBodySchema>;
export type VisitHistoryQuery = z.infer<typeof visitHistoryQuerySchema>;
