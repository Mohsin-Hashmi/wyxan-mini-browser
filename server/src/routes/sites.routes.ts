import { Router } from "express";
import { findSites, getSite, publishSite } from "../controllers/sites.controller.js";

export const sitesRouter = Router();

sitesRouter.post("/sites", publishSite);
sitesRouter.get("/sites/resolve", getSite);
sitesRouter.get("/sites/search", findSites);
