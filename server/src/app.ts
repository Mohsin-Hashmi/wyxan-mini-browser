import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { connectDB } from "./config/db-connection.js";
import { peopleRouter } from "./routes/people.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:3000" }));
app.use(helmet());
app.use(express.json({ limit: "128kb" }));

app.get("/", (_req, res) => {
  res.send("Hello, World!");
});

app.get("/health", (_req, res) => {
  res.status(200).send("OK");
});

app.use("/api/v1/people", peopleRouter);

app.use((_req, res) => {
  res.status(404).json({ success: false, error: { message: "Endpoint not found" } });
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(() => {
    console.error("Failed to start the server");
    process.exit(1);
  });
