import type { Types } from "mongoose";

export interface Site {
  address: string;
  title: string;
  html: string;
  searchableText: string;
  authorId: Types.ObjectId;
  createdAt: Date;
}

export interface SiteResponse {
  id: string;
  address: string;
  title: string;
  html: string;
  authorId: string;
  createdAt: string;
}

export interface SiteSearchResponse {
  id: string;
  address: string;
  title: string;
  excerpt: string;
}
