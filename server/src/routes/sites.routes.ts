import { Router } from "express";
import { findSites, getSite, getSites, publishSite } from "../controllers/sites.controller.js";

export const sitesRouter = Router();

sitesRouter.post("/sites", publishSite);
sitesRouter.get("/sites", getSites);
sitesRouter.get("/sites/resolve", getSite);
sitesRouter.get("/sites/search", findSites);
