"use client";

import { useFormikContext } from "formik";
import { Code2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import type { PublishFormValues } from "@/types/publish.types";

export function PublishHtmlEditor() {
  const formik = useFormikContext<PublishFormValues>();
  const error = formik.touched.html ? formik.errors.html : undefined;

  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor="publish-html" className="text-base font-semibold">
        HTML editor
      </FieldLabel>
      <Card className="gap-0 overflow-hidden rounded-lg border border-input bg-transparent py-0 shadow-none ring-0">
        <div className="flex items-center justify-between gap-3 border-b border-border/65 bg-accent/20 px-4 py-3">
          <Badge className="gap-2 border-0 bg-accent text-primary">
            <Code2 aria-hidden="true" className="size-4" />
            HTML
          </Badge>
          <span className="text-xs text-muted-foreground">100 KiB maximum</span>
        </div>
        <Textarea
          {...formik.getFieldProps("html")}
          id="publish-html"
          placeholder={
            '<h1>Welcome to my website</h1>\n<p>A small page with something to share.</p>\n<p>Visit <a href="tidepool.zz">Tidepool</a>.</p>'
          }
          spellCheck={false}
          autoCapitalize="none"
          autoComplete="off"
          maxLength={102400}
          aria-invalid={!!error}
          aria-describedby={
            error ? "publish-html-error publish-html-help" : "publish-html-help"
          }
          className="min-h-80 resize-y rounded-none border-0 p-4 font-mono text-sm leading-7 shadow-none field-sizing-fixed focus-visible:ring-inset md:min-h-96 md:p-5"
        />
      </Card>
      <FieldDescription id="publish-html-help">
        Write headings, paragraphs, lists, and links to other .zz addresses.
        Scripts, styles, and unsupported markup are removed when publishing.
      </FieldDescription>
      {error && <FieldError id="publish-html-error">{error}</FieldError>}
    </Field>
  );
}
