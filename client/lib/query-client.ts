import { QueryClient } from "@tanstack/react-query";

let browserQueryClient: QueryClient | undefined;

/*
 * Keep one cache in the browser and a separate cache for each server render.
 */
export function getQueryClient(): QueryClient {
  const options = {
    defaultOptions: {
      queries: {
        staleTime: 60000,
        refetchOnWindowFocus: false,
        retry: false,
      },
      mutations: { retry: false },
    },
  };

  if (typeof window === "undefined") {
    return new QueryClient(options);
  }

  if (!browserQueryClient) {
    browserQueryClient = new QueryClient(options);
  }

  return browserQueryClient;
}
