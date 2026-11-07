import type { Metadata } from "next";
import { PublishPage } from "@/components/publish";

export const metadata: Metadata = {
  title: "Publish New Website | Wyxan Mini Browser",
};

export default function Page() {
  return <PublishPage />;
}
