import { AppShell } from "@/components/common";
import { PublishHeader } from "../publish-header/publish-header";
import { PublishForm } from "../publish-form/publish-form";

export function PublishPage() {
  return (
    <AppShell pageHref="/publish">
      <PublishHeader />
      <PublishForm />
    </AppShell>
  );
}
