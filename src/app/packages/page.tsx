import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { packages } from "@/lib/salon-data";
import { getImage } from "@/lib/salon-images";
import { BookButton } from "@/components/site/book-button";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  CalendarHeart,
  CheckCircle2,
  ArrowRight,
  Clock,
  Gift,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Packages",
  description:
    "Curated hair, skin and spa packages at Lumière Beauty Lounge, San Francisco. Bundled treatments at better-than-à-la-carte pricing.",
  alternates: { canonical: "/packages" },
};

export default function PackagesPage() {

  return (
    <div className="flex flex-col">
      <PageHero
        eyebrow="Beauty packages"
        title="Curated bundles, real savings"
        description="Hand-picked combinations of our most-loved services — bundled to save you up to 26% compared with à la carte pricing. One booking, one glow-up."
        imageKey="spa"
        imageIndex={5}
      >
        <BookButton
          className="rounded-full bg-primary px-6 text-sm shadow-sm hover:bg-primary/90 hover:shadow-md"
        >
          <CalendarHeart className="mr-1.5 h-4 w-4" />
          Book a package
        </BookButton>
      </PageHero>

      {/* ============== PACKAGES GRID ============== */}
      <section className="bg-background py-6 md:py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {packages.map((p, i) => {
              const savings = p.originalPrice - p.price;
              return (
                <Reveal key={p.slug} delay={(i % 2) * 80}>
                  <Card
                    className={cn(
                      "group relative h-full overflow-hidden border-border/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
                      p.popular && "ring-2 ring-primary"
                    )}
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={getImage(p.imageKey, p.imageIndex)}
                        alt={p.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/30 to-foreground/5" />

                      {/* Badges */}
                      <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                        {p.popular && (
                          <Badge className="rounded-full bg-primary px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-primary-foreground">
                            Most popular
                          </Badge>
                        )}
                      </div>
                      <Badge className="absolute right-3 top-3 rounded-full bg-salon-gold px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-salon-espresso">
                        Save {p.save}%
                      </Badge>

                      {/* Bottom-left name + duration */}
                      <div className="absolute bottom-3 left-4 right-4">
                        <h3 className="font-serif font-semibold text-background text-lg md:text-xl lg:text-2xl">
                          {p.name}
                        </h3>
                        <div className="mt-1 flex items-center gap-1.5 text-xs font-medium text-background/85">
                          <Clock className="h-3.5 w-3.5" />
                          {p.duration}
                        </div>
                      </div>
                    </div>

                    <CardContent className="flex flex-1 flex-col gap-4 p-4 md:p-5 lg:p-6">
                      <p className="text-sm text-muted-foreground leading-snug md:leading-relaxed">
                        {p.description}
                      </p>

                      {/* Services list */}
                      <ul className="flex flex-col gap-2">
                        {p.services.map((svc) => (
                          <li
                            key={svc}
                            className="flex items-start gap-2 text-sm text-foreground/90"
                          >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <span>{svc}</span>
                          </li>
                        ))}
                      </ul>

                      {p.bestFor && (
                        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                          Best for:{" "}
                          <span className="text-foreground/80">
                            {p.bestFor}
                          </span>
                        </p>
                      )}

                      {/* Price row */}
                      <div className="mt-auto flex flex-wrap items-end justify-between gap-3 border-t border-border/60 pt-4">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-sm text-muted-foreground line-through">
                              ${p.originalPrice}
                            </span>
                            <span className="font-serif font-bold text-primary text-xl md:text-2xl lg:text-3xl">
                              ${p.price}
                            </span>
                          </div>
                          <p className="mt-0.5 text-xs font-semibold text-emerald-600">
                            You save ${savings}
                          </p>
                        </div>
                        <BookButton service={p.slug}
                          className="rounded-full bg-primary px-5 text-sm shadow-sm hover:bg-primary/90 hover:shadow-md"
                        >
                          <CalendarHeart className="mr-1.5 h-4 w-4" />
                          Book
                        </BookButton>
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============== GIFT CARD BANNER ============== */}
      <section className="bg-background pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col items-start gap-6 rounded-3xl bg-foreground text-background md:flex-row md:items-center md:justify-between p-4 md:p-6 lg:p-8">
              <div className="flex items-start gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-salon-gold text-salon-espresso">
                  <Gift className="h-7 w-7" />
                </span>
                <div>
                  <h2 className="font-serif font-semibold tracking-tight text-background text-lg md:text-xl lg:text-2xl">
                    Gift a Lumière moment
                  </h2>
                  <p className="mt-2 max-w-xl text-sm text-background/80 leading-snug md:leading-relaxed">
                    Treat someone you love to a pampering experience they&apos;ll
                    never forget. Gift cards are valid for a year, never expire
                    on unused value, and work across every service and package.
                  </p>
                </div>
              </div>
              <Button
                asChild
                className="shrink-0 rounded-full bg-background px-7 text-sm font-semibold text-foreground shadow-sm hover:bg-background/90 hover:shadow-md"
              >
                <Link href="/contact">
                  Buy a gift card
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
