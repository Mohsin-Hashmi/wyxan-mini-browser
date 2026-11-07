import { PersonModel } from "../models/person.model.js";
import { SiteModel } from "../models/site.model.js";
import type {
  CreateSiteInput,
  ListSitesInput,
  SearchSitesInput,
} from "../schemas/site.schema.js";
import type { SiteResponse, SiteSearchResponse } from "../types/site.types.js";
import { formatSite, formatSiteListItem, formatSiteSearchResult } from "../utils/sites.utils.js";
import { prepareSiteContent } from "./site-content.service.js";

/*
 * Fetch a bounded page of site summaries in descending ID order.
 * Read one extra record to determine whether another page is available.
 */
export async function listSites(input: ListSitesInput) {
  const filter = input.before ? { _id: { $lt: input.before } } : {};
  const sites = await SiteModel.find(filter)
    .select("address title searchableText authorId createdAt")
    .sort({ _id: -1 })
    .limit(input.limit + 1)
    .lean();

  const hasMore = sites.length > input.limit;
  const items = sites.slice(0, input.limit).map(formatSiteListItem);
  const lastSite = items[items.length - 1];

  return {
    sites: items,
    nextCursor: hasMore && lastSite ? lastSite.id : null,
  };
}

/*
 * Check that the author exists and the sanitized HTML contains readable text.
 * Save the site with its searchable content and return the formatted record.
 */
export async function createSite(
  input: CreateSiteInput,
): Promise<SiteResponse> {
  const author = await PersonModel.exists({ _id: input.authorId });
  if (!author) {
    throw new Error("Author not found");
  }

  const content = prepareSiteContent(input.html);
  if (!content.searchableText) {
    throw new Error("HTML must contain readable content");
  }

  // Wait for the unique index before the first publish, including concurrent requests.
  await SiteModel.init();
  const site = await SiteModel.create({
    address: input.address,
    title: input.title,
    ...content,
    authorId: input.authorId,
  });

  return formatSite(site);
}

/*
 * Find a site by its validated, normalized address and format the result.
 * Return null when the address does not belong to a stored site.
 */
export async function resolveSite(
  address: string,
): Promise<SiteResponse | null> {
  const site = await SiteModel.findOne({ address }).lean();
  if (!site) {
    return null;
  }

  return formatSite(site);
}

/*
 * Search indexed titles and body text, then apply relevance ordering and the limit.
 * Format the matches as search results with plain-text excerpts.
 */
export async function searchSites(
  input: SearchSitesInput,
): Promise<SiteSearchResponse[]> {
  await SiteModel.init();
  const sites = await SiteModel.find(
    { $text: { $search: input.q } },
    { address: 1, title: 1, searchableText: 1, score: { $meta: "textScore" } },
  )
    .sort({ score: { $meta: "textScore" }, address: 1 })
    .limit(input.limit)
    .lean();

  return sites.map(formatSiteSearchResult);
}
