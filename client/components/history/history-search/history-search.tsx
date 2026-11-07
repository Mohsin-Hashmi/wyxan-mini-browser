"use client";

import { Form, FormikProvider } from "formik";
import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import type { HistorySearchProps } from "@/types/history.types";

export function HistorySearch({ formik }: HistorySearchProps) {
  const error = formik.touched.query ? formik.errors.query : undefined;
  return (
    <FormikProvider value={formik}>
      <Form
        noValidate
        aria-label="Search browsing history"
        className="flex items-start gap-2"
      >
        <Field data-invalid={!!error} className="min-w-0 flex-1">
          <FieldLabel htmlFor="history-search" className="sr-only">
            Search history
          </FieldLabel>
          <InputGroup className="h-11 bg-transparent">
            <InputGroupInput
              {...formik.getFieldProps("query")}
              id="history-search"
              placeholder="Search by title or address…"
              maxLength={200}
              aria-invalid={!!error}
              aria-describedby={error ? "history-search-error" : undefined}
              className="h-11 text-base md:text-sm"
            />
            <InputGroupAddon>
              <Search aria-hidden="true" className="size-4.5" />
            </InputGroupAddon>
          </InputGroup>
          {error && <FieldError id="history-search-error">{error}</FieldError>}
        </Field>
        <Button
          type="submit"
          disabled={formik.isSubmitting}
          variant="outline"
          className="h-11 px-4"
        >
          Search
        </Button>
      </Form>
    </FormikProvider>
  );
}
