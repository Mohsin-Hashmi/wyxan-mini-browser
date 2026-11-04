import type { Types } from "mongoose";
import type { Person, PersonResponse } from "../types/person.types.js";

export function formatPerson(person: Pick<Person, "name"> & { _id: Types.ObjectId }): PersonResponse {
  return {
    id: person._id.toString(),
    name: person.name,
  };
}
