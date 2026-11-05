import { AppShell } from "@/components/common";
import { HomeHero } from "./home-hero";
import { FeaturedSites } from "./featured-sites";
import { HomeAbout } from "./home-about";

export function HomePage() {
  return (
    <AppShell>
      <HomeHero />
      <FeaturedSites />
      <HomeAbout />
    </AppShell>
  );
}
