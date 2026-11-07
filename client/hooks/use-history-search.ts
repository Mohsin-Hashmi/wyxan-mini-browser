"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { historySearchSchema } from "@/schemas/history.schema";
import type { HistorySearchValues } from "@/types/history.types";

/*
 * Validate and submit the history search without fetching on every keystroke.
 * An empty submitted query restores the person's complete newest-first history.
 */
export function useHistorySearch() {
  const [query, setQuery] = useState("");
  const formik = useFormik<HistorySearchValues>({
    initialValues: { query: "" },
    validationSchema: historySearchSchema,
    onSubmit: (values, { setSubmitting }) => {
      setQuery(values.query.trim());
      setSubmitting(false);
    },
  });
  return { formik, query };
}
