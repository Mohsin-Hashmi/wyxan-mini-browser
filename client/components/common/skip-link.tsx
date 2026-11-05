"use client";

import Link from "next/link";

export function SkipLink() {
  return (
    <Link
      href="#main-content"
      onClick={() => document.getElementById("main-content")?.focus()}
      className="sr-only z-50 rounded-lg bg-primary p-3 text-primary-foreground focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
    >
      Skip to content
    </Link>
  );
}
