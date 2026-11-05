import { model, Schema } from "mongoose";
import { visitOutcomeSchema, visitSourceSchema } from "../schemas/visit.schema.js";
import type { Visit } from "../types/visit.types.js";

const visitModelSchema = new Schema<Visit>({
  personId: { type: Schema.Types.ObjectId, ref: "Person", required: true },
  address: { type: String, required: true, trim: true, lowercase: true },
  siteId: { type: Schema.Types.ObjectId, ref: "Site", default: null },
  title: { type: String, default: null },
  source: { type: String, enum: visitSourceSchema.options, required: true },
  outcome: { type: String, enum: visitOutcomeSchema.options, required: true },
  eventId: { type: String, required: true, lowercase: true },
  visitedAt: { type: Date, default: Date.now, immutable: true },
});

visitModelSchema.index({ personId: 1, eventId: 1 }, { unique: true });
visitModelSchema.index({ personId: 1, visitedAt: -1, _id: -1 });

export const VisitModel = model<Visit>("Visit", visitModelSchema);
