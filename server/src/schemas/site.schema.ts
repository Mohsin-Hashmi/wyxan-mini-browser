import { z } from "zod";

export const addressSchema = z.string().trim().toLowerCase().max(253).regex(
  /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.zz$/,
  "Use a fictional address such as tidepool.zz, without a scheme or path",
);

export const createSiteSchema = z.object({
  address: addressSchema,
  title: z.string().trim().min(1).max(160),
  html: z.string().trim().min(1).max(102400).refine(
    (value) => Buffer.byteLength(value, "utf8") <= 102400,
    "HTML must not exceed 100 KiB",
  ),
  authorId: z.string().regex(/^[a-fA-F0-9]{24}$/, "Select a valid author"),
}).strict();

export const resolveSiteSchema = z.object({ address: addressSchema }).strict();

export const searchSitesSchema = z.object({
  q: z.string().trim().min(1, "Enter a search term").max(200),
  limit: z.coerce.number().int().min(1).max(50).default(20),
}).strict();

export const listSitesSchema = z.object({
  limit: z.coerce.number().int().min(1).max(50).default(4),
  before: z.string().regex(/^[a-fA-F0-9]{24}$/, "Provide a valid site cursor").optional(),
}).strict();

export type CreateSiteInput = z.infer<typeof createSiteSchema>;
export type SearchSitesInput = z.infer<typeof searchSitesSchema>;
export type ListSitesInput = z.infer<typeof listSitesSchema>;
