import {
  ArrowLeft,
  ArrowRight,
  CloudUpload,
  LockKeyhole,
  RotateCw,
  Search,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import Link from "next/link";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { PersonSelector } from "./person-selector";
import { BrowserAddress } from "./browser-address";
import { Skeleton } from "@/components/ui/skeleton";
import type { BrowserToolbarProps } from "@/types/common.types";

export function BrowserToolbar({ pageHref = "/home" }: BrowserToolbarProps) {
  return (
    <div className="border-b border-border/65 bg-surface px-4 py-3 lg:px-6">
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="flex items-center gap-1">
          <Button
            disabled
            variant="ghost"
            size="icon"
            aria-label="Back"
            className="text-muted-foreground disabled:opacity-100"
          >
            <ArrowLeft aria-hidden="true" className="size-5" />
          </Button>
          <Button
            disabled
            variant="ghost"
            size="icon"
            aria-label="Forward"
            className="text-muted-foreground/65 disabled:opacity-100"
          >
            <ArrowRight aria-hidden="true" className="size-5" />
          </Button>
          <Button
            render={<Link href={pageHref} />}
            nativeButton={false}
            variant="ghost"
            size="icon"
            aria-label="Return to current page"
          >
            <RotateCw aria-hidden="true" className="size-5" />
          </Button>
        </div>
        <div className="relative order-first min-w-0 basis-full sm:order-0 sm:flex-1 sm:basis-auto">
          <Label
            htmlFor={`${pageHref.slice(1)}-browser-address`}
            className="sr-only"
          >
            Browser address
          </Label>
          <InputGroup className="h-10.5 bg-transparent shadow-xs has-disabled:bg-transparent has-disabled:opacity-100">
            <Suspense fallback={<Skeleton className="h-8 min-w-0 flex-1" />}>
              <BrowserAddress pageHref={pageHref} />
            </Suspense>
            <InputGroupAddon className="pl-3.5">
              <LockKeyhole aria-hidden="true" className="size-4.5" />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                disabled
                variant="ghost"
                size="icon-sm"
                aria-label="Save address"
                className="text-muted-foreground disabled:opacity-100"
              >
                <Star aria-hidden="true" className="size-4.5" />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
        <Button
          render={<Link href="/search" />}
          nativeButton={false}
          variant="outline"
          aria-label="Search"
          className="h-10.5 rounded-lg bg-transparent px-3.5 shadow-xs disabled:opacity-100"
        >
          <Search aria-hidden="true" className="size-4.5" />
          <span className="hidden lg:inline">Search</span>
        </Button>
        <PersonSelector />
        <Button
          render={<Link href="/publish" />}
          nativeButton={false}
          aria-current={pageHref === "/publish" ? "page" : undefined}
          className="h-10.5 flex-1 rounded-lg px-4 shadow-sm disabled:opacity-100 sm:flex-none"
        >
          <CloudUpload aria-hidden="true" className="size-5" />
          <span className="hidden sm:inline">Publish Website</span>
          <span className="sm:hidden">Publish</span>
        </Button>
      </div>
    </div>
  );
}
