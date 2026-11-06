"use client";

import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { searchSchema } from "@/schemas/search.schema";
import type { SearchFormValues } from "@/types/search.types";

/*
 * Validate submitted searches and keep the form synchronized with the URL.
 * Use URL navigation so refresh, direct links and browser back restore the query.
 */
export function useSearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") || "").trim();
  const hasValidQuery = searchSchema.isValidSync({ query });
  const formik = useFormik<SearchFormValues>({
    initialValues: { query },
    enableReinitialize: true,
    validationSchema: searchSchema,
    validateOnMount: true,
    validateOnChange: false,
    onSubmit: (values, { setSubmitting }) => {
      const params = new URLSearchParams({ q: values.query.trim() });
      router.push(`/search?${params.toString()}`, { scroll: false });
      setSubmitting(false);
    },
  });

  function clearSearch() {
    formik.resetForm({ values: { query: "" } });
    router.push("/search", { scroll: false });
  }

  return { formik, query, hasValidQuery, clearSearch };
}
