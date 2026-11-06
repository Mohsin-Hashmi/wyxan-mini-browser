"use client";

import { useSearchParams } from "next/navigation";
import { InputGroupInput } from "@/components/ui/input-group";
import type { BrowserAddressProps } from "@/types/common.types";

export function BrowserAddress({ pageHref }: BrowserAddressProps) {
  const searchParams = useSearchParams();
  const query = searchParams.toString();

  return (
    <InputGroupInput
      id={`${pageHref.slice(1)}-browser-address`}
      aria-label="Browser address"
      readOnly
      value={`https://wyxan.ai/browser${pageHref}${query ? `?${query}` : ""}`}
      className="h-10.5 text-sm"
    />
  );
}
