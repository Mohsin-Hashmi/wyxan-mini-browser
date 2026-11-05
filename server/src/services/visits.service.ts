import { mongo } from "mongoose";
import type { Types } from "mongoose";
import { PersonModel } from "../models/person.model.js";
import { SiteModel } from "../models/site.model.js";
import { VisitModel } from "../models/visit.model.js";
import type {
  RecordVisitInput,
  VisitHistoryQuery,
} from "../schemas/visit.schema.js";
import type {
  RecordVisitResult,
  VisitHistoryResponse,
  VisitResponse,
} from "../types/visit.types.js";
import { formatVisit } from "../utils/visits.utils.js";

/*
 * Look for a previously recorded arrival with this person's event ID.
 * Reject reuse with different details, otherwise return the original visit.
 */
async function findExistingVisit(
  personId: string,
  input: RecordVisitInput,
): Promise<VisitResponse | null> {
  const visit = await VisitModel.findOne({
    personId,
    eventId: input.eventId,
  }).lean();
  if (!visit) {
    return null;
  }

  if (
    visit.address !== input.address ||
    visit.source !== input.source ||
    visit.outcome !== input.outcome
  ) {
    throw new Error("This event ID is already used for a different visit");
  }

  return formatVisit(visit);
}

/*
 * Record a displayed address arrival for an existing person.
 * Preserve missing-page outcomes and return the original record for matching retries.
 */
export async function recordVisit(
  personId: string,
  input: RecordVisitInput,
): Promise<RecordVisitResult> {
  const person = await PersonModel.exists({ _id: personId });
  if (!person) {
    throw new Error("Person not found");
  }

  await VisitModel.init();
  const existingVisit = await findExistingVisit(personId, input);
  if (existingVisit) {
    return { visit: existingVisit, created: false };
  }

  let siteId: Types.ObjectId | null = null;
  let title: string | null = null;
  if (input.outcome === "found") {
    const site = await SiteModel.findOne(
      { address: input.address },
      { _id: 1, title: 1 },
    ).lean();
    if (!site) {
      throw new Error("Site not found");
    }
    siteId = site._id;
    title = site.title;
  }

  try {
    const visit = await VisitModel.create({
      personId,
      ...input,
      siteId,
      title,
    });
    return { visit: formatVisit(visit), created: true };
  } catch (error) {
    // Another request may have saved the same arrival after our first lookup.
    if (error instanceof mongo.MongoServerError && error.code === 11000) {
      const savedVisit = await findExistingVisit(personId, input);
      if (savedVisit) {
        return { visit: savedVisit, created: false };
      }
    }
    throw error;
  }
}

/*
 * Read a person's visits from newest to oldest using a visit ID as the cursor.
 * Keep equal timestamps ordered by ID and return the next cursor when more rows exist.
 */
export async function getVisitHistory(
  personId: string,
  input: VisitHistoryQuery,
): Promise<VisitHistoryResponse> {
  const person = await PersonModel.exists({ _id: personId });
  if (!person) {
    throw new Error("Person not found");
  }

  const query = VisitModel.find({ personId })
    .sort({ visitedAt: -1, _id: -1 })
    .limit(input.limit + 1);

  if (input.before) {
    const cursor = await VisitModel.findOne({
      _id: input.before,
      personId,
    }).lean();
    if (!cursor) {
      throw new Error("History cursor not found");
    }

    query.or([
      { visitedAt: { $lt: cursor.visitedAt } },
      { visitedAt: cursor.visitedAt, _id: { $lt: cursor._id } },
    ]);
  }

  const visits = await query.lean();
  const hasMore = visits.length > input.limit;
  if (hasMore) {
    visits.pop();
  }

  let nextCursor: string | null = null;
  const lastVisit = visits.at(-1);
  if (hasMore && lastVisit) {
    nextCursor = lastVisit._id.toString();
  }

  return { visits: visits.map(formatVisit), nextCursor };
}
