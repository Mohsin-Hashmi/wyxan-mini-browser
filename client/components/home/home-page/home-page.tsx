import { AppShell } from "@/components/common";
import { HomeHero } from "../home-hero/home-hero";
import { FeaturedSites } from "../featured-sites/featured-sites";
import { HomeAbout } from "../home-about/home-about";

export function HomePage() {
  return (
    <AppShell>
      <HomeHero />
      <FeaturedSites />
      <HomeAbout />
    </AppShell>
  );
}
