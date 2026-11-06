import { Check, Info } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Item, ItemGroup, ItemMedia } from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";

const benefits = [
  "Browse the web and decentralized sites",
  "Analyze and extract structured information",
  "Publish static websites to the mesh",
];

export function HomeAbout() {
  return (
    <Card
      role="region"
      aria-labelledby="about-heading"
      className="grid gap-5 rounded-xl border border-primary/15 bg-accent/15 p-5 shadow-none ring-0 lg:grid-cols-[1fr_auto_auto] lg:items-center lg:gap-7 lg:px-8"
    >
      <div className="flex gap-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent/80 text-primary">
          <Info aria-hidden="true" className="size-6" />
        </span>
        <div>
          <CardTitle
            role="heading"
            aria-level={2}
            id="about-heading"
            className="text-lg font-bold tracking-tight lg:text-xl"
          >
            What is Wyxan Mini Browser?
          </CardTitle>
          <CardDescription className="mt-1 max-w-3xl text-sm leading-5 text-muted-foreground">
            A lightweight, decentralized web browser for exploring web content,
            analyzing open data, and publishing your own HTML sites to a
            database mesh.
          </CardDescription>
        </div>
      </div>
      <Separator
        orientation="vertical"
        className="hidden bg-primary/25 lg:block"
      />
      <ItemGroup className="gap-2 text-foreground/90">
        {benefits.map((benefit) => (
          <Item
            role="listitem"
            key={benefit}
            className="flex-nowrap gap-3 border-0 p-0 text-xs sm:text-sm"
          >
            <ItemMedia>
              <Check
                aria-hidden="true"
                className="size-4.5 shrink-0 text-primary"
              />
            </ItemMedia>
            {benefit}
          </Item>
        ))}
      </ItemGroup>
    </Card>
  );
}
