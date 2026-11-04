import { model, Schema } from "mongoose";
import type { Person } from "../types/person.types.js";

const personModelSchema = new Schema<Person>({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 80,
  },
  createdAt: { type: Date, default: Date.now, immutable: true },
});

personModelSchema.index({ name: 1, _id: 1 });

export const PersonModel = model<Person>("Person", personModelSchema);
