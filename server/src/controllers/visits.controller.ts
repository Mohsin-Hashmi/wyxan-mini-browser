import type { Request, Response } from "express";
import {
  clearVisitHistoryRequestSchema,
  recordVisitRequestSchema,
  visitHistoryRequestSchema,
} from "../schemas/visit.schema.js";
import {
  clearVisitHistory,
  getVisitHistory,
  recordVisit,
} from "../services/visits.service.js";
import { formatVisitValidationErrors } from "../utils/visits.utils.js";

/*
 * Validate the selected person and arrival details, then record the visit.
 * Return 201 for a new arrival or 200 for an identical retry.
 */
export async function createVisit(
  request: Request,
  response: Response,
): Promise<void> {
  try {
    const input = recordVisitRequestSchema.safeParse({
      params: request.params,
      body: request.body,
    });
    if (!input.success) {
      response.status(400).json({
        success: false,
        message: "Invalid visit data",
        errors: formatVisitValidationErrors(input.error),
      });
      return;
    }

    const result = await recordVisit(
      input.data.params.personId,
      input.data.body,
    );
    let status = 200;
    if (result.created) {
      status = 201;
    }
    response.status(status).json({
      success: true,
      message: "Visit recorded successfully",
      data: result.visit,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Person not found") {
      response
        .status(404)
        .json({ success: false, message: "Person not found" });
      return;
    }
    if (error instanceof Error && error.message === "Site not found") {
      response.status(404).json({ success: false, message: "Site not found" });
      return;
    }
    if (
      error instanceof Error &&
      error.message === "This event ID is already used for a different visit"
    ) {
      response.status(409).json({
        success: false,
        message: "This event ID is already used for a different visit",
      });
      return;
    }
    response
      .status(500)
      .json({ success: false, message: "Failed to record visit" });
  }
}

/*
 * Validate the selected person and history cursor, then return a page of visits.
 * Include the next cursor so the frontend can request older entries.
 */
export async function listVisits(
  request: Request,
  response: Response,
): Promise<void> {
  try {
    const input = visitHistoryRequestSchema.safeParse({
      params: request.params,
      query: request.query,
    });
    if (!input.success) {
      response.status(400).json({
        success: false,
        message: "Invalid history query",
        errors: formatVisitValidationErrors(input.error),
      });
      return;
    }

    const history = await getVisitHistory(
      input.data.params.personId,
      input.data.query,
    );
    response.status(200).json({
      success: true,
      message: "Visits fetched successfully",
      data: history.visits,
      meta: { nextCursor: history.nextCursor, total: history.total },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Person not found") {
      response
        .status(404)
        .json({ success: false, message: "Person not found" });
      return;
    }
    if (
      error instanceof Error &&
      error.message === "History cursor not found"
    ) {
      response
        .status(404)
        .json({ success: false, message: "History cursor not found" });
      return;
    }
    response
      .status(500)
      .json({ success: false, message: "Failed to fetch visits" });
  }
}

/*
 * Validate the selected person and clear only their browsing history.
 * Return the removed count or a safe response for validation and database failures.
 */
export async function deleteVisits(
  request: Request,
  response: Response,
): Promise<void> {
  try {
    const input = clearVisitHistoryRequestSchema.safeParse({
      params: request.params,
    });
    if (!input.success) {
      response
        .status(400)
        .json({ success: false, message: "Provide a valid person ID" });
      return;
    }
    const deletedCount = await clearVisitHistory(input.data.params.personId);
    response
      .status(200)
      .json({
        success: true,
        message: "History cleared successfully",
        data: { deletedCount },
      });
  } catch (error) {
    if (error instanceof Error && error.message === "Person not found") {
      response
        .status(404)
        .json({ success: false, message: "Person not found" });
      return;
    }
    response
      .status(500)
      .json({ success: false, message: "Failed to clear history" });
  }
}
