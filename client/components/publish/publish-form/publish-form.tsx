"use client";

import Link from "next/link";
import { Form, FormikProvider } from "formik";
import { CircleAlert, CircleCheck, CloudUpload, Plus } from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FieldSet } from "@/components/ui/field";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { usePublishForm } from "@/hooks/use-publish-form";
import { usePeople } from "@/hooks/apis/use-people";
import { PublishDetails } from "../publish-details/publish-details";
import { PublishHtmlEditor } from "../publish-html-editor/publish-html-editor";

export function PublishForm() {
  const { formik, publishedSite, submitError, publishAnother } =
    usePublishForm();
  const people = usePeople();

  if (publishedSite) {
    return (
      <Card
        role="status"
        aria-live="polite"
        className="items-center gap-4 rounded-xl border border-primary/20 bg-transparent p-8 text-center shadow-none ring-0 md:p-12"
      >
        <CircleCheck aria-hidden="true" className="size-12 text-primary" />
        <CardTitle role="heading" aria-level={2} className="text-2xl font-bold">
          Website published
        </CardTitle>
        <CardDescription className="max-w-xl text-base leading-7 wrap-anywhere">
          <span className="font-semibold text-foreground">
            {publishedSite.title}
          </span>{" "}
          is now published at{" "}
          <span className="font-semibold text-primary">
            {publishedSite.address}
          </span>{" "}
          and available in search.
        </CardDescription>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Button
            type="button"
            onClick={publishAnother}
            className="h-11 px-5 text-base"
          >
            <Plus aria-hidden="true" />
            Publish another
          </Button>
          <Button
            render={<Link href="/home" />}
            nativeButton={false}
            variant="outline"
            className="h-11 px-5 text-base"
          >
            Back to home
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="gap-0 rounded-xl border border-border/70 bg-transparent p-6 shadow-none ring-0 md:p-8">
      <FormikProvider value={formik}>
        <Form
          noValidate
          aria-label="Publish website"
          aria-busy={formik.isSubmitting}
        >
          <FieldSet disabled={formik.isSubmitting} className="min-w-0 gap-6">
            <PublishDetails />
            <PublishHtmlEditor />
            {submitError && (
              <Alert variant="destructive">
                <CircleAlert aria-hidden="true" />
                <AlertTitle>Unable to publish website</AlertTitle>
                <AlertDescription>{submitError}</AlertDescription>
              </Alert>
            )}
            <Separator />
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                render={<Link href="/home" />}
                nativeButton={false}
                variant="outline"
                disabled={formik.isSubmitting}
                className="h-11 px-6 text-base"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={
                  formik.isSubmitting ||
                  people.isPending ||
                  !people.data?.length
                }
                className="h-11 min-w-36 px-6 text-base"
              >
                {formik.isSubmitting ? (
                  <Spinner aria-hidden="true" />
                ) : (
                  <CloudUpload aria-hidden="true" className="size-5" />
                )}
                {formik.isSubmitting ? "Publishing…" : "Publish website"}
              </Button>
            </div>
          </FieldSet>
        </Form>
      </FormikProvider>
    </Card>
  );
}
