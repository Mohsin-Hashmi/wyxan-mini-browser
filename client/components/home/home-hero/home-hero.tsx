import {
  CloudUpload,
  Layers,
  SquareArrowOutUpRight,
  Upload,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { BrowserIllustration } from "@/components/common/browser-illustration";

const highlights = [
  { title: "Browse freely", icon: Zap },
  { title: "Analyze content", icon: Layers },
  { title: "Publish to a mesh", icon: CloudUpload },
];

export function HomeHero() {
  return (
    <Card
      role="region"
      aria-labelledby="home-heading"
      className="grid min-h-76.5 items-center gap-6 overflow-hidden rounded-xl border border-primary/20 bg-linear-to-br from-surface to-accent/20 p-6 text-foreground shadow-none ring-0 md:px-10 lg:grid-cols-[1.65fr_1fr] lg:gap-8 lg:px-12 lg:py-5"
    >
      <div className="relative z-10">
        <Badge className="h-auto rounded-lg border-0 bg-accent px-3 py-1 text-sm font-medium text-primary">
          Browser Home
        </Badge>
        <CardTitle
          role="heading"
          aria-level={1}
          id="home-heading"
          className="mt-3 text-3xl leading-tight font-bold tracking-tight lg:text-[36px]"
        >
          A Decentralized Web Canvas
        </CardTitle>
        <CardDescription className="mt-1 max-w-165 text-base leading-6 text-muted-foreground lg:text-lg lg:leading-6">
          Explore, analyze, and publish web content across the open web and
          decentralized networks — all in Wyxan Mini Browser.
        </CardDescription>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-foreground/85 lg:gap-x-8">
          {highlights.map(({ title, icon: Icon }, index) => (
            <div key={title} className="flex items-center gap-3">
              {index > 0 && (
                <Separator
                  orientation="vertical"
                  className="mr-3 h-6 bg-primary/20 lg:mr-5"
                />
              )}
              <Icon aria-hidden="true" className="size-5" />
              {title}
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-4">
          <Button
            render={<Link href="#indexed-websites" />}
            nativeButton={false}
            className="h-11 min-w-48 rounded-lg px-6 text-base shadow-sm"
          >
            <SquareArrowOutUpRight aria-hidden="true" className="size-5" />
            Start Browsing
          </Button>
          <Button
            render={<Link href="/publish" />}
            nativeButton={false}
            variant="outline"
            className="h-11 min-w-52 rounded-lg border-primary/25 bg-transparent px-6 text-base shadow-xs disabled:opacity-100"
          >
            <Upload aria-hidden="true" className="size-5" />
            Publish a Website
          </Button>
        </div>
      </div>
      <BrowserIllustration />
    </Card>
  );
}
