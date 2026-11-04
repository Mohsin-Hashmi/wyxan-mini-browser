import type { Request, Response } from "express";
import { getPeople } from "../services/people.service.js";

/*
 * Fetch the available people and return them for browser and publisher selection.
 * Return a safe error response if the request cannot be completed.
 */
export async function listPeople(
  _request: Request,
  response: Response,
): Promise<void> {
  try {
    const people = await getPeople();
    response.status(200).json({
      success: true,
      message: "People fetched successfully",
      data: people,
    });
  } catch {
    response.status(500).json({
      success: false,
      message: "Failed to fetch people",
    });
  }
}
