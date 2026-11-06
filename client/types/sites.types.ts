import type { ApiResponse } from "@/types/api.types";

export interface Site {
  id: string;
  address: string;
  title: string;
  html: string;
  authorId: string;
  createdAt: string;
}

export interface SiteSearchResult {
  id: string;
  address: string;
  title: string;
  excerpt: string;
}

export interface WebsiteCardProps {
  site: SiteSearchResult;
  authorName?: string;
  publishedAt?: string;
}

export interface SiteListItem extends SiteSearchResult {
  authorId: string;
  createdAt: string;
}

export interface SiteListResponse extends ApiResponse<SiteListItem[]> {
  meta: { nextCursor: string | null };
}

export interface PublishSiteInput {
  address: string;
  title: string;
  html: string;
  authorId: string;
}
