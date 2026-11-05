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
} from "@/types/visits.types";

/*
 * Load older history pages while keeping each person's cache separate.
 */
export function useVisitHistory(personId: string, limit = 20) {
  return useInfiniteQuery({
    queryKey: ["visits", personId, limit],
    queryFn: async ({ pageParam, signal }) => {
      const params = new URLSearchParams({ limit: String(limit) });

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
