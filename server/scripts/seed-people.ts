import mongoose from "mongoose";
import { connectDB } from "../src/config/db-connection.js";
import { PersonModel } from "../src/models/person.model.js";
import { personSchema } from "../src/schemas/person.schema.js";
import { peopleCreatedAt, peopleFixtures } from "./fixtures/people.js";

async function seedPeople(): Promise<void> {
  try {
    await connectDB();

    for (const fixture of peopleFixtures) {
      const person = personSchema.parse({ name: fixture.name });
      await PersonModel.updateOne(
        { _id: new mongoose.Types.ObjectId(fixture.id) },
        { $setOnInsert: { name: person.name, createdAt: peopleCreatedAt } },
        { upsert: true, runValidators: true },
      );
    }

    console.log(`People seed complete: ${peopleFixtures.length} stable fixtures ensured`);
  } catch {
    console.error("People seed failed");
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

void seedPeople();
