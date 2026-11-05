"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AXIOS } from "@/lib/axios";
import type { ApiResponse } from "@/types/api.types";
import type {
  PublishSiteInput,
  Site,
  SiteSearchResult,
} from "@/types/sites.types";

/*
 * Resolve a normalized address only when an address has been supplied.
 */
export function useSite(address: string) {
  const normalizedAddress = address.trim().toLowerCase();

  return useQuery({
    queryKey: ["sites", "resolve", normalizedAddress],
    queryFn: async ({ signal }) => {
      const response = await AXIOS.get<ApiResponse<Site>>(
        "/sites/resolve",
        {
          params: new URLSearchParams({ address: normalizedAddress }),
          signal,
        },
      );
      return response.data.data;
    },
    enabled: normalizedAddress.length > 0,
  });
}

/*
 * Cache search results by submitted query and limit, without requesting empty queries.
 */
export function useSiteSearch(query: string, limit = 20) {
  const searchQuery = query.trim();

  return useQuery({
    queryKey: ["sites", "search", searchQuery, limit],
    queryFn: async ({ signal }) => {
      const response = await AXIOS.get<ApiResponse<SiteSearchResult[]>>(
        "/sites/search",
        {
          params: new URLSearchParams({ q: searchQuery, limit: String(limit) }),
          signal,
        },
      );
      return response.data.data;
    },
    enabled: searchQuery.length > 0,
  });
}

/*
 * Publish explicitly, cache the returned site and refresh active search results.
 */
export function usePublishSite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: PublishSiteInput) => {
      const response = await AXIOS.post<ApiResponse<Site>>("/sites", input);
      return response.data.data;
    },
    onSuccess: async (site) => {
      queryClient.setQueryData(["sites", "resolve", site.address], site);
      await queryClient.invalidateQueries({ queryKey: ["sites", "search"] });
    },
  });
}
