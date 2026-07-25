"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Link from "next/link";
import { services, serviceCategories, type ServiceCategory, salonInfo } from "@/lib/salon-data";
import { getImage } from "@/lib/salon-images";
import { useSalonStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import {
  Clock, Search, ArrowRight, CalendarHeart, Sparkles, Star,
  ShieldCheck, Award, CheckCircle2, Users, Scissors,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Filter = "All" | ServiceCategory;

export function ServicesClient() {
  const { openBooking } = useSalonStore();
  const [activeCategory, setActiveCategory] = useState<Filter>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return services.filter((s) => {
      const matchesCategory = activeCategory === "All" || s.category === activeCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        s.name.toLowerCase().includes(q) ||
        s.shortDescription.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
      );
    });
  }, [activeCategory, query]);

  const chips: Filter[] = ["All", ...serviceCategories.map((c) => c.name)];

  // Count services per category for the chips
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    services.forEach((s) => {
      counts[s.category] = (counts[s.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="flex flex-col">
      {/* ============== HERO ============== */}
      <PageHero
        eyebrow="Our services"
        title="Beauty services for every you"
        description="Explore our full menu of hair, skin, makeup, bridal, spa and nail services. Each service includes a consultation, premium products, and aftercare guidance — delivered by certified stylists in our Hayes Valley studio."
        imageKey="salonInterior2"
        imageIndex={2}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={() => openBooking()}
            className="h-8 rounded-full bg-primary px-4 text-xs sm:h-9 sm:px-6 sm:text-sm shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
          >
            <CalendarHeart className="mr-2 h-4 w-4" />
            Book Now
          </Button>
          <a
            href="#services-grid"
            className="inline-flex items-center gap-1.5 rounded-full border border-background/30 bg-background/10 px-5 py-2.5 text-sm font-medium text-background backdrop-blur-sm transition-colors hover:bg-background/20"
          >
            Browse services
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </PageHero>

      {/* ============== QUICK STATS BAND ============== */}
      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 sm:px-6 md:grid-cols-4 lg:px-8">
          {[
            { icon: Scissors, value: `${services.length}+`, label: "Services offered" },
            { icon: Users, value: `${salonInfo.stats.stylists}`, label: "Certified stylists" },
            { icon: Star, value: salonInfo.stats.rating, label: "Average rating", isRating: true },
            { icon: Award, value: salonInfo.stats.years, label: "Years of care" },
          ].map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80}>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <stat.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-serif text-xl font-bold text-foreground sm:text-2xl">
                    {stat.value}{stat.isRating ? "/5" : ""}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============== SEARCH + FILTERS ============== */}
      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full max-w-md">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search services — try “balayage”, “facial”, “bridal”…"
                  className="h-11 rounded-full border-border/70 bg-background pl-11 pr-4 text-sm shadow-sm focus-visible:ring-primary"
                  aria-label="Search services"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
                {filtered.length === 1 ? "service" : "services"}
                {activeCategory !== "All" && (
                  <> in <span className="font-semibold text-foreground">{activeCategory}</span></>
                )}
              </p>
            </div>

            <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0 sm:pb-0">
              {chips.map((chip) => {
                const active = chip === activeCategory;
                const count = chip === "All" ? services.length : (categoryCounts[chip] || 0);
                return (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setActiveCategory(chip)}
                    className={cn(
                      "flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all",
                      active
                        ? "border-primary bg-primary text-primary-foreground shadow-sm"
                        : "border-border/70 bg-background text-foreground/75 hover:border-primary/40 hover:text-primary"
                    )}
                  >
                    {chip}
                    <span className={cn(
                      "rounded-full px-1.5 py-0.5 text-[0.65rem] font-semibold",
                      active ? "bg-primary-foreground/20 text-primary-foreground" : "bg-secondary text-muted-foreground"
                    )}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============== SERVICES GRID ============== */}
      <section id="services-grid" className="bg-background py-4 sm:py-6 md:py-8 lg:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-3xl border border-dashed border-border/70 bg-secondary/30 px-6 text-center py-5 sm:py-6 md:py-10 lg:py-16">
              <div className="flex h-10 w-10 items-center justify-center rounded-full sm:h-14 sm:w-14 bg-primary/10 text-primary">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="font-serif font-semibold text-foreground text-base sm:text-lg md:text-xl lg:text-2xl">No services found</h3>
              <p className="text-xs text-muted-foreground leading-snug sm:text-sm md:leading-relaxed">
                We couldn&apos;t find a service matching your search. Try a different keyword or browse all categories.
              </p>
              <Button
                onClick={() => { setQuery(""); setActiveCategory("All"); }}
                className="rounded-full bg-primary px-5"
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
              {filtered.map((s, i) => (
                <Reveal key={s.slug} delay={Math.min(i * 50, 300)}>
                  <Link href={`/services/${s.slug}`} className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-2xl">
                    <Card className="h-full cursor-pointer overflow-hidden border-border/70 p-0 gap-0 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/10">
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={getImage(s.imageKey, 0)}
                          alt={s.name}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent transition-opacity duration-500 group-hover:from-foreground/70" />
                        {/* Shine sweep */}
                        <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

                        {/* Top badges */}
                        <div className="absolute left-1.5 top-1.5 flex flex-wrap items-center gap-1 sm:left-3 sm:top-3 sm:gap-2">
                          <Badge className="rounded-full border border-background/20 bg-background/85 px-1.5 py-0 text-[0.55rem] text-foreground backdrop-blur-sm hover:bg-background/85 sm:px-2 sm:py-0.5 sm:text-xs">
                            {s.category}
                          </Badge>
                          {s.popular && (
                            <Badge className="gap-1 rounded-full bg-salon-gold px-1.5 py-0 text-[0.55rem] text-foreground shadow-sm sm:px-2.5 sm:py-0.5 sm:text-xs">
                              <Sparkles className="h-3 w-3" />
                              Popular
                            </Badge>
                          )}
                        </div>

                        {/* Duration + longevity */}
                        <div className="absolute bottom-1.5 left-1.5 flex flex-wrap items-center gap-1 sm:bottom-3 sm:left-3 sm:gap-2">
                          <span className="inline-flex items-center gap-1 rounded-full bg-background/85 px-1.5 py-0.5 text-[0.55rem] font-medium text-foreground backdrop-blur-sm sm:gap-1.5 sm:px-2.5 sm:py-1 sm:text-xs">
                            <Clock className="h-3 w-3 text-primary" />
                            {s.duration}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full bg-background/85 px-1.5 py-0.5 text-[0.55rem] font-medium text-foreground backdrop-blur-sm sm:px-2.5 sm:py-1 sm:text-xs">
                            <Sparkles className="h-3 w-3 text-salon-gold" />
                            {s.longevity}
                          </span>
                        </div>
                      </div>

                      {/* Body */}
                      <CardContent className="p-3 sm:p-5">
                        <h3 className="font-serif text-sm font-semibold sm:text-lg leading-snug text-foreground transition-colors group-hover:text-primary">
                          {s.name}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-[0.7rem] text-muted-foreground sm:mt-1.5 sm:text-sm leading-snug md:leading-relaxed">
                          {s.shortDescription}
                        </p>

                        {/* Key benefits preview */}
                        <ul className="mt-2 space-y-0.5 sm:mt-3 sm:space-y-1">
                          {s.benefits.slice(0, 2).map((b) => (
                            <li key={b} className="flex items-start gap-1.5 text-[0.65rem] text-muted-foreground sm:text-xs">
                              <CheckCircle2 className="mt-0.5 h-3 w-3 flex-shrink-0 text-primary" />
                              <span className="line-clamp-1">{b}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Footer: price + CTA */}
                        <div className="mt-2.5 flex items-end justify-between border-t border-border/50 pt-2 sm:mt-4 sm:pt-3">
                          <div>
                            <p className="text-[0.65rem] uppercase tracking-wide text-muted-foreground">from</p>
                            <p className="font-serif text-base font-bold text-primary sm:text-xl">${s.startingPrice}</p>
                          </div>
                          <span className="flex items-center gap-1 text-[0.65rem] font-medium text-primary sm:text-xs">
                            Details
                            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============== TRUST BAND ============== */}
      <section className="border-y border-border/60 bg-secondary/40 py-4 sm:py-6 md:py-8 lg:py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 px-4 sm:grid-cols-3 sm:gap-6 sm:px-6 lg:px-8">
          {[
            { icon: ShieldCheck, title: "Hygiene guaranteed", desc: "UV-sterilised tools, single-use applicators, 90°C-laundered towels." },
            { icon: Award, title: "Certified stylists", desc: "L'Oréal, Wella & CIDESCO trained. Continuous quarterly education." },
            { icon: CalendarHeart, title: "Free cancellation", desc: "Plans change. Cancel up to 24 hours before your appointment at no cost." },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary sm:h-10 sm:w-10">
                <item.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">{item.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground leading-snug md:leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============== CTA ============== */}
      <section className="bg-blush py-5 sm:py-6 md:py-10 lg:py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-4 text-center sm:px-6 lg:px-8">
          <Reveal className="flex flex-col items-center gap-5">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-salon-rose">
              <span className="h-px w-6 bg-salon-rose/50" />
              Still exploring?
              <span className="h-px w-6 bg-salon-rose/50" />
            </span>
            <h2 className="font-serif font-semibold leading-tight text-foreground text-lg sm:text-xl md:text-2xl lg:text-3xl">
              Can&apos;t find what you&apos;re looking for?
            </h2>
            <p className="max-w-xl text-pretty text-xs text-muted-foreground sm:text-base leading-snug md:leading-relaxed">
              Our team is happy to help you choose the right service, build a custom package, or answer any questions before you book. Reach out — we usually reply within a few hours.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button asChild className="rounded-full bg-primary px-6">
                <Link href="/contact">
                  Contact us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button onClick={() => openBooking()} variant="outline" className="rounded-full px-6">
                <CalendarHeart className="mr-2 h-4 w-4" />
                Book a consultation
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
