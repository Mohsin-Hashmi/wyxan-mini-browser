"use client";

import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { usePublishSite } from "@/hooks/apis/use-sites";
import { usePersonStore } from "@/store/person-store";
import { publishSchema } from "@/schemas/publish.schema";
import { getApiErrorMessage } from "@/lib/api-error";
import type { ApiErrorResponse } from "@/types/api.types";
import type { PublishFormValues } from "@/types/publish.types";
import type { Site } from "@/types/sites.types";

/*
 * Validate publisher details and submit HTML through the existing publish API.
 * Preserve entered values on failure and show the saved site only after success.
 */
export function usePublishForm() {
  const personId = usePersonStore((state) => state.personId);
  const publish = usePublishSite();
  const [publishedSite, setPublishedSite] = useState<Site | null>(null);
  const [submitError, setSubmitError] = useState("");
  const formik = useFormik<PublishFormValues>({
    initialValues: { authorId: personId, address: "", title: "", html: "" },
    validationSchema: publishSchema,
    validateOnChange: false,
    onSubmit: async (values, { setFieldError }) => {
      setSubmitError("");
      try {
        const site = await publish.mutateAsync({
          authorId: values.authorId,
          address: values.address.trim().toLowerCase(),
          title: values.title.trim(),
          html: values.html.trim(),
        });
        setPublishedSite(site);
      } catch (error) {
        setSubmitError(getApiErrorMessage(error));
        if (axios.isAxiosError<ApiErrorResponse>(error)) {
          if (error.response?.status === 409) {
            setFieldError(
              "address",
              "This address is already published. Choose another address.",
            );
          }
          for (const issue of error.response?.data?.errors || []) {
            if (
              issue.field === "authorId" ||
              issue.field === "address" ||
              issue.field === "title" ||
              issue.field === "html"
            ) {
              setFieldError(issue.field, issue.message);
            }
          }
        }
      }
    },
  });

  function publishAnother() {
    formik.resetForm({
      values: {
        authorId: formik.values.authorId,
        address: "",
        title: "",
        html: "",
      },
    });
    setPublishedSite(null);
    setSubmitError("");
    publish.reset();
  }

  return { formik, publishedSite, submitError, publishAnother };
}
