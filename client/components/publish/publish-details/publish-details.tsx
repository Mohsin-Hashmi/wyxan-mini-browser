"use client";

import { useFormikContext } from "formik";
import { UserRound } from "lucide-react";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { usePeople } from "@/hooks/apis/use-people";
import { getApiErrorMessage } from "@/lib/api-error";
import type { PublishFormValues } from "@/types/publish.types";

export function PublishDetails() {
  const formik = useFormikContext<PublishFormValues>();
  const people = usePeople();
  const publisher = people.data?.find(
    (person) => person.id === formik.values.authorId,
  );
  const authorError = formik.touched.authorId
    ? formik.errors.authorId
    : undefined;
  const addressError = formik.touched.address
    ? formik.errors.address
    : undefined;
  const titleError = formik.touched.title ? formik.errors.title : undefined;

  return (
    <FieldGroup className="gap-6">
      {people.isError && (
        <Alert variant="destructive">
          <AlertTitle>Unable to load publishers</AlertTitle>
          <AlertDescription>
            {getApiErrorMessage(people.error)}
            <Button
              type="button"
              variant="outline"
              disabled={people.isFetching}
              onClick={() => void people.refetch()}
            >
              Retry publishers
            </Button>
          </AlertDescription>
        </Alert>
      )}
      <div className="grid items-start gap-6 md:grid-cols-2">
        <Field data-invalid={!!authorError}>
          <FieldLabel
            htmlFor="publish-author"
            className="text-base font-semibold"
          >
            Publisher
          </FieldLabel>
          <Select
            value={publisher?.id || null}
            disabled={
              formik.isSubmitting || people.isPending || !people.data?.length
            }
            onValueChange={(value) => {
              void formik.setFieldValue("authorId", value || "");
            }}
          >
            <SelectTrigger
              id="publish-author"
              aria-label="Publisher"
              aria-invalid={!!authorError}
              aria-describedby={
                authorError ? "publish-author-error" : "publish-author-help"
              }
              onBlur={() => void formik.setFieldTouched("authorId", true)}
              className="w-full rounded-lg px-3.5 text-base data-[size=default]:h-12"
            >
              <UserRound
                aria-hidden="true"
                className="mr-2 size-5 text-primary"
              />
              <SelectValue
                placeholder={
                  people.isPending
                    ? "Loading publishers…"
                    : "Choose a publisher"
                }
              >
                {publisher?.name}
              </SelectValue>
            </SelectTrigger>
            <SelectContent align="start" alignItemWithTrigger={false}>
              <SelectGroup>
                {people.data?.map((person) => (
                  <SelectItem key={person.id} value={person.id}>
                    {person.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <FieldDescription id="publish-author-help">
            {!people.isPending && !people.isError && !people.data?.length
              ? "No publishers available right now."
              : "The person credited as this website's author."}
          </FieldDescription>
          {authorError && (
            <FieldError id="publish-author-error">{authorError}</FieldError>
          )}
        </Field>
        <Field data-invalid={!!addressError}>
          <FieldLabel
            htmlFor="publish-address"
            className="text-base font-semibold"
          >
            Site address
          </FieldLabel>
          <Input
            {...formik.getFieldProps("address")}
            id="publish-address"
            placeholder="my-website.zz"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            maxLength={66}
            aria-invalid={!!addressError}
            aria-describedby={
              addressError ? "publish-address-error" : "publish-address-help"
            }
            className="h-12 px-3.5 text-base md:text-base"
          />
          <FieldDescription id="publish-address-help">
            Choose a unique .zz address, without a scheme or path.
          </FieldDescription>
          {addressError && (
            <FieldError id="publish-address-error">{addressError}</FieldError>
          )}
        </Field>
      </div>
      <Field data-invalid={!!titleError}>
        <FieldLabel htmlFor="publish-title" className="text-base font-semibold">
          Page title
        </FieldLabel>
        <Input
          {...formik.getFieldProps("title")}
          id="publish-title"
          placeholder="Give your page a clear, descriptive title"
          maxLength={160}
          aria-invalid={!!titleError}
          aria-describedby={titleError ? "publish-title-error" : undefined}
          className="h-12 px-3.5 text-base md:text-base"
        />
        {titleError && (
          <FieldError id="publish-title-error">{titleError}</FieldError>
        )}
      </Field>
    </FieldGroup>
  );
}
