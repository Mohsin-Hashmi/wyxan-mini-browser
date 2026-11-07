import type { Types } from "mongoose";
import type { ZodError } from "zod";
import type { Site, SiteListItemResponse, SiteResponse, SiteSearchResponse } from "../types/site.types.js";

export function formatSite(site: Site & { _id: Types.ObjectId }): SiteResponse {
  return {
    id: site._id.toString(),
    address: site.address,
    title: site.title,
    html: site.html,
    authorId: site.authorId.toString(),
    createdAt: site.createdAt.toISOString(),
  };
}

export function formatSiteValidationErrors(error: ZodError) {
  return error.issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));
}

export function formatSiteSearchResult(
  site: Pick<Site, "address" | "title" | "searchableText"> & { _id: Types.ObjectId },
): SiteSearchResponse {
  return {
    id: site._id.toString(),
    address: site.address,
    title: site.title,
    excerpt: site.searchableText.length > 180
      ? `${site.searchableText.slice(0, 180)}…`
      : site.searchableText,
  };
}

export function formatSiteListItem(
  site: Omit<Site, "html"> & { _id: Types.ObjectId },
): SiteListItemResponse {
  return {
    ...formatSiteSearchResult(site),
    authorId: site.authorId.toString(),
    createdAt: site.createdAt.toISOString(),
  };
}
