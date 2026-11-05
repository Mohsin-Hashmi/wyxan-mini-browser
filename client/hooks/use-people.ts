"use client";

import { useQuery } from "@tanstack/react-query";
import { AXIOS } from "@/lib/axios";
import type { ApiResponse } from "@/types/api.types";
import type { Person } from "@/types/people.types";

/*
 * Cache the selectable people and expose loading, data and error state to the UI.
 */
export function usePeople() {
  return useQuery({
    queryKey: ["people"],
    queryFn: async ({ signal }) => {
      const response = await AXIOS.get<ApiResponse<Person[]>>("/people", {
        signal,
      });
      return response.data.data;
    },
  });
}
