import type { ReactNode } from "react";

export interface AppShellProps {
  children: ReactNode;
  pageHref?: string;
}

export interface AppSidebarProps {
  activePage?: "home" | "search";
}

export interface BrowserAddressProps {
  pageHref: string;
}

export interface BrowserToolbarProps {
  pageHref?: string;
}

export interface BrowserIllustrationProps {
  compact?: boolean;
}

export interface SkipLinkProps {
  targetId?: string;
}

export interface WebsiteListSkeletonProps {
  columns?: 1 | 2;
  label?: string;
}
