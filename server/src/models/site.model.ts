import { model, Schema } from "mongoose";
import type { Site } from "../types/site.types.js";

const siteModelSchema = new Schema<Site>({
  address: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  title: { type: String, required: true, trim: true, maxlength: 160 },
  html: { type: String, required: true },
  searchableText: { type: String, required: true },
  authorId: { type: Schema.Types.ObjectId, ref: "Person", required: true },
  createdAt: { type: Date, default: Date.now, immutable: true },
});

siteModelSchema.index({ title: "text", searchableText: "text" });

export const SiteModel = model<Site>("Site", siteModelSchema);
