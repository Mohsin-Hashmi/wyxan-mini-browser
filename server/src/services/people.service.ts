import { PersonModel } from "../models/person.model.js";
import type { PersonResponse } from "../types/person.types.js";
import { formatPerson } from "../utils/people.utils.js";

/*
 * Read people from MongoDB in name order, using their IDs to break ties.
 * Format each record to return only the public ID and name.
 */
export async function getPeople(): Promise<PersonResponse[]> {
  const people = await PersonModel.find({}, { _id: 1, name: 1 })
    .sort({ name: 1, _id: 1 })
    .lean();

  return people.map(formatPerson);
}
