"use client";

import Link from "next/link";
import type { SkipLinkProps } from "@/types/common.types";

export function SkipLink({ targetId = "main-content" }: SkipLinkProps) {
  return (
    <Link
      href={`#${targetId}`}
      onClick={() => document.getElementById(targetId)?.focus()}
      className="sr-only z-50 rounded-lg bg-primary p-3 text-primary-foreground focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
    >
      Skip to content
    </Link>
  );
}
