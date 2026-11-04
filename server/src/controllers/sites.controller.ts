import type { Request, Response } from "express";
import { mongo } from "mongoose";
import {
  createSiteSchema,
  resolveSiteSchema,
  searchSitesSchema,
} from "../schemas/site.schema.js";
import {
  createSite,
  resolveSite,
  searchSites,
} from "../services/sites.service.js";
import { formatSiteValidationErrors } from "../utils/sites.utils.js";

/*
 * Validate the publish request, create the site through the service, and return it.
 * Handle invalid authors, unreadable content, duplicate addresses, and other failures.
 */
export async function publishSite(
  request: Request,
  response: Response,
): Promise<void> {
  try {
    const input = createSiteSchema.safeParse(request.body);
    if (!input.success) {
      response.status(400).json({
        success: false,
        message: "Invalid site data",
        errors: formatSiteValidationErrors(input.error),
      });
      return;
    }

    const site = await createSite(input.data);
    response.status(201).json({
      success: true,
      message: "Site published successfully",
      data: site,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Author not found") {
      response
        .status(404)
        .json({ success: false, message: "Author not found" });
      return;
    }

    if (
      error instanceof Error &&
      error.message === "HTML must contain readable content"
    ) {
      response
        .status(400)
        .json({
          success: false,
          message: "HTML must contain readable content",
        });
      return;
    }

    if (error instanceof mongo.MongoServerError && error.code === 11000) {
      response
        .status(409)
        .json({ success: false, message: "This address is already published" });
      return;
    }

    response.status(500).json({
      success: false,
      message: "Failed to publish site",
    });
  }
}

/*
 * Validate the requested address and return its stored site.
 * Return a not-found response when no site exists at that address.
 */
export async function getSite(
  request: Request,
  response: Response,
): Promise<void> {
  try {
    const input = resolveSiteSchema.safeParse(request.query);
    if (!input.success) {
      response
        .status(400)
        .json({ success: false, message: "Provide a valid .zz address" });
      return;
    }

    const site = await resolveSite(input.data.address);
    if (!site) {
      response.status(404).json({ success: false, message: "Site not found" });
      return;
    }

    response
      .status(200)
      .json({
        success: true,
        message: "Site fetched successfully",
        data: site,
      });
  } catch {
    response
      .status(500)
      .json({ success: false, message: "Failed to fetch site" });
  }
}

/*
 * Validate the search query and result limit, then return matching sites.
 * Return validation details or a safe error response when the request fails.
 */
export async function findSites(
  request: Request,
  response: Response,
): Promise<void> {
  try {
    const input = searchSitesSchema.safeParse(request.query);
    if (!input.success) {
      response.status(400).json({
        success: false,
        message: "Invalid search query",
        errors: formatSiteValidationErrors(input.error),
      });
      return;
    }

    const sites = await searchSites(input.data);
    response
      .status(200)
      .json({
        success: true,
        message: "Sites searched successfully",
        data: sites,
      });
  } catch {
    response
      .status(500)
      .json({ success: false, message: "Failed to search sites" });
  }
}
