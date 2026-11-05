import { Router } from "express";
import { createVisit, listVisits } from "../controllers/visits.controller.js";

export const visitsRouter = Router();

visitsRouter.post("/people/:personId/visits", createVisit);
visitsRouter.get("/people/:personId/visits", listVisits);
