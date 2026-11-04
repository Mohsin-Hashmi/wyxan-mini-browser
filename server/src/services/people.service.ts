import { PersonModel } from "../models/person.model.js";
import type { PersonResponse } from "../types/person.types.js";

export async function getPeople(): Promise<PersonResponse[]> {
  const people = await PersonModel.find({}, { _id: 1, name: 1 })
    .sort({ name: 1, _id: 1 })
    .lean();

  return people.map((person) => ({
    id: person._id.toString(),
    name: person.name,
  }));
}
