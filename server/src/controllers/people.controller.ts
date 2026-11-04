import type { Request, Response } from "express";
import { getPeople } from "../services/people.service.js";

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
