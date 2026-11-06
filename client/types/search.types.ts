import type { FormikProps } from "formik";
import type { InferType } from "yup";
import type { searchSchema } from "@/schemas/search.schema";
import type { SiteSearchResult } from "@/types/sites.types";

export type SearchStatus = "idle" | "loading" | "error" | "success";

export type SearchFormValues = InferType<typeof searchSchema>;

export interface SearchFormProps {
  formik: FormikProps<SearchFormValues>;
  invalidQuery: boolean;
  isSearching: boolean;
  onClear: () => void;
}

export interface SearchResultsProps {
  status: SearchStatus;
  results: SiteSearchResult[];
  errorMessage: string;
  onRetry: () => void;
}
