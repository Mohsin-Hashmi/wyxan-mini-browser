import mongoose from "mongoose";
import { connectDB } from "../src/config/db-connection.js";
import { PersonModel } from "../src/models/person.model.js";
import { SiteModel } from "../src/models/site.model.js";
import { createSiteSchema } from "../src/schemas/site.schema.js";
import { prepareSiteContent } from "../src/services/site-content.service.js";
import { peopleFixtures } from "./fixtures/people.js";
import { sitesCreatedAt, sitesFixtures } from "./fixtures/sites.js";

async function seedSites(): Promise<void> {
  try {
    await connectDB();
    await SiteModel.init();

    for (const fixture of sitesFixtures) {
      const author = peopleFixtures.find((person) => person.name === fixture.author);
      if (!author || !await PersonModel.exists({ _id: author.id })) {
        throw new Error("Run seed:people before seeding sites");
      }

      const input = createSiteSchema.parse({
        address: fixture.address, title: fixture.title, html: fixture.html, authorId: author.id,
      });
      const content = prepareSiteContent(input.html);
      if (!content.searchableText) throw new Error("Seed content must be readable");

      await SiteModel.updateOne(
        { _id: new mongoose.Types.ObjectId(fixture.id), address: input.address },
        { $setOnInsert: { ...input, ...content, createdAt: sitesCreatedAt } },
        { upsert: true, runValidators: true },
      );
    }

    console.log(`Sites seed complete: ${sitesFixtures.length} stable fixtures ensured`);
  } catch {
    console.error("Sites seed failed. Ensure people are seeded and fixture addresses are not already in use.");
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

void seedSites();
