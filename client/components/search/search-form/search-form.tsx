"use client";

import { useRef } from "react";
import { Form, FormikProvider } from "formik";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import type { SearchFormProps } from "@/types/search.types";

export function SearchForm({
  formik,
  invalidQuery,
  isSearching,
  onClear,
}: SearchFormProps) {
  const input = useRef<HTMLInputElement>(null);
  const error =
    formik.touched.query || formik.submitCount > 0 || invalidQuery
      ? formik.errors.query
      : undefined;

  return (
    <FormikProvider value={formik}>
      <Form
        noValidate
        aria-label="Search published sites"
        aria-busy={isSearching}
        className="grid items-start gap-4 md:grid-cols-[1fr_auto]"
      >
        <Field data-invalid={!!error}>
          <FieldLabel htmlFor="search-query" className="sr-only">
            Search query
          </FieldLabel>
          <InputGroup className="h-12 rounded-xl border-primary/30 bg-card">
            <InputGroupInput
              {...formik.getFieldProps("query")}
              ref={input}
              id="search-query"
              placeholder="Search titles and page content…"
              autoComplete="off"
              maxLength={200}
              aria-invalid={!!error}
              aria-describedby={error ? "search-query-error" : undefined}
              className="h-12 text-base font-medium md:text-base"
            />
            <InputGroupAddon className="pl-4">
              <Search aria-hidden="true" className="size-6 text-primary" />
            </InputGroupAddon>
            {formik.values.query && (
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  aria-label="Clear search"
                  size="icon-sm"
                  onClick={() => {
                    onClear();
                    input.current?.focus();
                  }}
                >
                  <X aria-hidden="true" />
                </InputGroupButton>
              </InputGroupAddon>
            )}
          </InputGroup>
          {error && <FieldError id="search-query-error">{error}</FieldError>}
        </Field>
        <Button
          type="submit"
          disabled={formik.isSubmitting}
          className="h-12 rounded-xl px-6 text-base md:min-w-64"
        >
          {isSearching ? (
            <Spinner aria-hidden="true" className="size-5" />
          ) : (
            <Search aria-hidden="true" className="size-5" />
          )}
          Search Published Sites
        </Button>
      </Form>
    </FormikProvider>
  );
}
