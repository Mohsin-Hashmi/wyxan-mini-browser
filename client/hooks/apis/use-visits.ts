"use client";

import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AXIOS } from "@/lib/axios";
import type { ApiResponse } from "@/types/api.types";
import type {
  RecordVisitVariables,
  Visit,
  VisitHistoryResponse,
  ClearVisitHistoryResult,
} from "@/types/visits.types";

/*
 * Load older history pages while keeping each person's cache separate.
 */
export function useVisitHistory(personId: string, limit = 20, query = "") {
  const q = query.trim();
  return useInfiniteQuery({
    queryKey: ["visits", personId, limit, q],
    queryFn: async ({ pageParam, signal }) => {
      const params = new URLSearchParams({ limit: String(limit) });
      if (q) params.set("q", q);

      if (pageParam) {
        params.set("before", pageParam);
      }

      const response = await AXIOS.get<VisitHistoryResponse>(
        `/people/${personId}/visits`,
        {
          params,
          signal,
        },
      );
      return response.data;
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.meta.nextCursor || undefined,
    enabled: personId.length > 0,
  });
}

/*
 * Clear the captured person's history and reset their paginated query caches.
 * Reset cursors before refetching because their visits no longer exist.
 */
export function useClearVisitHistory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (personId: string) => {
      const response = await AXIOS.delete<ApiResponse<ClearVisitHistoryResult>>(
        `/people/${personId}/visits`,
      );
      return response.data.data;
    },
    onSuccess: async (_result, personId) => {
      await queryClient.resetQueries({ queryKey: ["visits", personId] });
    },
  });
}

/*
 * Record an arrival explicitly and refresh only the person captured in its input.
 * Retrying the same arrival must reuse that input's event ID.
 */
export function useRecordVisit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: RecordVisitVariables) => {
      const response = await AXIOS.post<ApiResponse<Visit>>(
        `/people/${input.personId}/visits`,
        input.visit,
      );
      return response.data.data;
    },
    onSuccess: async (_visit, input) => {
      await queryClient.invalidateQueries({
        queryKey: ["visits", input.personId],
      });
    },
  });
}
