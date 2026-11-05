import type { ReactNode } from "react";
import { AppHeader } from "./app-header";
import { AppSidebar } from "./app-sidebar";
import { BrowserToolbar } from "./browser-toolbar";
import { AppFooter } from "./app-footer";
import { SkipLink } from "./skip-link";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <SkipLink />
      <AppHeader />
      <div className="flex flex-1 flex-col md:flex-row">
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <BrowserToolbar />
          <div
            id="main-content"
            role="main"
            tabIndex={-1}
            className="mx-auto w-full max-w-[1600px] flex-1 space-y-7 px-4 py-5 lg:px-6"
          >
            {children}
          </div>
          <AppFooter />
        </div>
      </div>
    </div>
  );
}
