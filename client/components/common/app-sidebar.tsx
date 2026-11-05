import {
  Bookmark,
  History,
  House,
  Search,
  SquareArrowOutUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const navigation = [
  { label: "Search", icon: Search },
  { label: "Browse", icon: SquareArrowOutUpRight },
  { label: "History", icon: History },
  { label: "Bookmarks", icon: Bookmark },
];

export function AppSidebar() {
  return (
    <NavigationMenu
      aria-label="Main navigation"
      className="max-w-none flex-none shrink-0 justify-center border-b border-border/65 bg-surface px-3 py-3 md:w-19 md:items-start md:border-r md:border-b-0 md:py-5"
    >
      <NavigationMenuList className="flex-none gap-3 md:flex-col md:gap-4">
        <NavigationMenuItem>
          <NavigationMenuLink
            render={<Link href="/home" />}
            active
            aria-label="Home"
            aria-current="page"
            title="Home"
            className="size-11 justify-center rounded-lg bg-accent text-primary data-active:bg-accent"
          >
            <House aria-hidden="true" className="size-5.5" />
          </NavigationMenuLink>
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
