import { Bookmark, House, Search, SquareArrowOutUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HistoryDrawer } from "@/components/history";
import type { AppSidebarProps } from "@/types/common.types";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const navigation = [{ label: "Bookmarks", icon: Bookmark }];

export function AppSidebar({ activePage = "home" }: AppSidebarProps) {
  return (
    <NavigationMenu
      aria-label="Main navigation"
      className="max-w-none flex-none shrink-0 justify-center border-b border-border/65 bg-surface px-3 py-3 md:w-19 md:items-start md:border-r md:border-b-0 md:py-5"
    >
      <NavigationMenuList className="flex-none gap-3 md:flex-col md:gap-4">
        <NavigationMenuItem>
          <NavigationMenuLink
            render={<Link href="/home" />}
            active={activePage === "home"}
            aria-label="Home"
            aria-current={activePage === "home" ? "page" : undefined}
            title="Home"
            className={`size-11 justify-center rounded-lg ${activePage === "home" ? "bg-accent text-primary data-active:bg-accent" : "text-foreground/85"}`}
          >
            <House aria-hidden="true" className="size-5.5" />
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            render={<Link href="/search" />}
            active={activePage === "search"}
            aria-label="Search"
            aria-current={activePage === "search" ? "page" : undefined}
            title="Search"
            className={`size-11 justify-center rounded-lg ${activePage === "search" ? "bg-accent text-primary data-active:bg-accent" : "text-foreground/85"}`}
          >
            <Search aria-hidden="true" className="size-5" />
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            render={<Link href="/publish" />}
            active={activePage === "publish"}
            aria-label="Publish website"
            aria-current={activePage === "publish" ? "page" : undefined}
            title="Publish website"
            className={`size-11 justify-center rounded-lg ${activePage === "publish" ? "bg-accent text-primary data-active:bg-accent" : "text-foreground/85"}`}
          >
            <SquareArrowOutUpRight aria-hidden="true" className="size-5" />
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <HistoryDrawer />
        </NavigationMenuItem>
        {navigation.map(({ label, icon: Icon }) => (
          <NavigationMenuItem key={label}>
            <Button
              disabled
              variant="ghost"
              size="icon"
              aria-label={label}
              title={label}
              className="size-11 text-foreground/85 disabled:opacity-100"
            >
              <Icon aria-hidden="true" className="size-5" />
            </Button>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
