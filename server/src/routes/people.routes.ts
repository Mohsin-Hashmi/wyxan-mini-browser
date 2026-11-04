import { Router } from "express";
import { listPeople } from "../controllers/people.controller.js";

export const peopleRouter = Router();

peopleRouter.get("/people", listPeople);
