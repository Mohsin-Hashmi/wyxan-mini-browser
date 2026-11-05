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

export interface PublishSiteInput {
  address: string;
  title: string;
  html: string;
  authorId: string;
}
