import axios from "axios";
import type { ApiErrorResponse } from "@/types/api.types";

/*
 * Read the backend's safe error message while keeping the original Axios error intact.
 */
export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const message = error.response?.data?.message || error.response?.data?.error?.message;
    if (typeof message === "string") {
      return message;
    }
  }

  return "Unable to complete the request. Please try again.";
}
