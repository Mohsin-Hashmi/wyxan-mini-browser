import { createHash } from "node:crypto";
import mongoose from "mongoose";
import { connectDB } from "../src/config/db-connection.js";
import { PersonModel } from "../src/models/person.model.js";
import { SiteModel } from "../src/models/site.model.js";
import { VisitModel } from "../src/models/visit.model.js";
import { recordVisitBodySchema } from "../src/schemas/visit.schema.js";
import { peopleFixtures } from "./fixtures/people.js";
import { sitesFixtures } from "./fixtures/sites.js";
import { visitsStartedAt, visitTrails } from "./fixtures/visits.js";

/*
 * Seed fixed browsing trails after people and sites exist.
 * Use stable IDs, event IDs and timestamps so reruns preserve the same history.
 */
async function seedVisits(): Promise<void> {
  try {
    await connectDB();
    await VisitModel.init();
    let count = 0;

    for (const [trailIndex, trail] of visitTrails.entries()) {
      const person = peopleFixtures.find((fixture) => fixture.name === trail.person);
      if (!person || !await PersonModel.exists({ _id: person.id })) {
        throw new Error("Run seed:people before seeding visits");
      }

      for (const [stepIndex, [address, source]] of trail.steps.entries()) {
        const hash = createHash("sha256").update(`wyxan-visit:${person.id}:${stepIndex}`).digest("hex");
        const eventId = `${hash.slice(0, 8)}-${hash.slice(8, 12)}-4${hash.slice(13, 16)}-a${hash.slice(17, 20)}-${hash.slice(20, 32)}`;
        const expectedSite = sitesFixtures.find((fixture) => fixture.address === address);
        let outcome: "found" | "not-found" = "not-found";
        let siteId: mongoose.Types.ObjectId | null = null;
        let title: string | null = null;

        if (expectedSite) {
          const site = await SiteModel.findOne({ _id: expectedSite.id, address }).lean();
          if (!site) {
            throw new Error("Run seed:sites before seeding visits");
          }
          outcome = "found";
          siteId = site._id;
          title = site.title;
        }

        const input = recordVisitBodySchema.parse({ address, source, outcome, eventId });
        const visitedAt = new Date(visitsStartedAt.getTime() + (stepIndex * 5 + trailIndex) * 60000);
        await VisitModel.updateOne(
          { _id: new mongoose.Types.ObjectId(hash.slice(0, 24)), personId: person.id, eventId },
          { $setOnInsert: { personId: person.id, ...input, siteId, title, visitedAt } },
          { upsert: true, runValidators: true },
        );
        count += 1;
      }
    }

    console.log(`Visits seed complete: ${count} stable fixtures ensured`);
  } catch {
    console.error("Visits seed failed. Ensure people and sites are seeded first.");
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

void seedVisits();
