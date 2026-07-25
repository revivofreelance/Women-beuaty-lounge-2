"use client";

import Image from "next/image";
import { useMemo, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  galleryItems,
  galleryCategories,
  beforeAfter,
  stylists,
  type GalleryCategory,
} from "@/lib/salon-data";
import { getImage } from "@/lib/salon-images";
import { useSalonStore } from "@/lib/store";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BeforeAfterSlider } from "@/components/site/before-after-slider";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  CalendarHeart,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export function GalleryClient() {
  const { openBooking } = useSalonStore();
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | "All">(
    "All"
  );
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const stylistName = (slug?: string) =>
    stylists.find((s) => s.slug === slug)?.name ?? "Lumière team";

  const filtered = useMemo(() => {
    if (activeCategory === "All") return galleryItems;
    return galleryItems.filter((g) => g.category === activeCategory);
  }, [activeCategory]);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const next = useCallback(
    () =>
      setLightboxIndex((i) =>
        i === null ? i : (i + 1) % filtered.length
      ),
    [filtered.length]
  );
  const prev = useCallback(
    () =>
      setLightboxIndex((i) =>
        i === null ? i : (i - 1 + filtered.length) % filtered.length
      ),
    [filtered.length]
  );

  // Keyboard navigation + body scroll lock
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxIndex, closeLightbox, next, prev]);

  const active = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <div className="flex flex-col">
      {/* ============== HERO ============== */}
      <PageHero
        eyebrow="Our work"
        title="Gallery & transformations"
        description="Real client work by our stylists — cuts, colour, bridal, makeup, nails and spa results. Drag the before & after sliders below to see the difference for yourself."
        imageKey="galleryHaircut"
        imageIndex={3}
      >
        <Button
          onClick={() => openBooking()}
          size="lg"
          className="rounded-full bg-primary px-7 text-base shadow-lg shadow-primary/25 hover:bg-primary/90"
        >
          <CalendarHeart className="mr-2 h-5 w-5" /> Book your transformation
        </Button>
      </PageHero>

      {/* ============== FILTERS + GRID ============== */}
      <section className="bg-background py-6 md:py-8 lg:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <Reveal className="mb-8">
            <div
              role="tablist"
              aria-label="Filter gallery by category"
              className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
            >
              <button
                role="tab"
                aria-selected={activeCategory === "All"}
                onClick={() => setActiveCategory("All")}
                className={
                  "flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors " +
                  (activeCategory === "All"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/70")
                }
              >
                All
                <span className="ml-1.5 text-xs opacity-70">
                  ({galleryItems.length})
                </span>
              </button>
              {galleryCategories.map((cat) => {
                const count = galleryItems.filter(
                  (g) => g.category === cat
                ).length;
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(cat)}
                    className={
                      "flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors " +
                      (isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/70")
                    }
                  >
                    {cat}
                    {count > 0 && (
                      <span className="ml-1.5 text-xs opacity-70">
                        ({count})
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Grid */}
          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-6 md:py-10 lg:py-16">
              No items in this category yet — check back soon.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {filtered.map((g, i) => (
                <Reveal key={g.id} delay={Math.min(i * 40, 320)}>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(i)}
                    aria-label={`Open ${g.title} in lightbox`}
                    className="group relative block aspect-square w-full overflow-hidden rounded-xl bg-muted"
                  >
                    <Image
                      src={getImage(g.imageKey, g.imageIndex)}
                      alt={g.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <Maximize2 className="absolute right-3 top-3 h-4 w-4 text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute inset-x-0 bottom-0 p-3 text-left opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="block text-[0.65rem] font-semibold uppercase tracking-wider text-background/80">
                        {g.category}
                      </span>
                      <span className="block font-serif text-sm font-semibold leading-tight text-background">
                        {g.title}
                      </span>
                      <span className="mt-0.5 block text-xs text-background/75">
                        by {stylistName(g.stylistSlug)}
                      </span>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============== BEFORE & AFTER ============== */}
      <section className="border-t border-border/60 bg-foreground text-background py-6 md:py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            light
            eyebrow="Real transformations"
            title="Before & after slider"
            description="Drag the handle to reveal the difference our colour, cut, keratin and bridal services make. Every photo is real client work — no filters, no retouching."
          />
          <div className="mt-6 md:mt-10 grid gap-6 lg:grid-cols-3">
            {beforeAfter.slice(0, 3).map((ba, i) => (
              <Reveal key={ba.id} delay={i * 100} className="flex flex-col gap-3">
                <BeforeAfterSlider
                  beforeSrc={getImage(ba.beforeKey, ba.beforeIndex)}
                  afterSrc={getImage(ba.afterKey, ba.afterIndex)}
                  alt={ba.title}
                />
                <div className="flex items-center justify-between gap-3 px-1">
                  <div className="flex flex-col">
                    <span className="font-serif text-base font-semibold text-background">
                      {ba.title}
                    </span>
                    <span className="text-xs text-background/70">
                      {ba.service}
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className="rounded-full border-background/30 text-[0.65rem] font-medium uppercase tracking-wider text-background/80"
                  >
                    Real client
                  </Badge>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============== FINAL CTA ============== */}
      <section className="bg-background text-center py-6 md:py-10 lg:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col items-center gap-5">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
              <Sparkles className="h-6 w-6" />
            </span>
            <h2 className="font-serif font-semibold tracking-tight text-foreground text-xl md:text-2xl lg:text-3xl">
              Your transformation, next
            </h2>
            <p className="max-w-xl text-pretty text-base text-muted-foreground sm:text-lg leading-snug md:leading-relaxed">
              Book a free 10-minute consultation and we'll match you with the
              right stylist and service for your goals, your hair and your skin.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                onClick={() => openBooking()}
                size="lg"
                className="rounded-full bg-primary px-7 shadow-sm hover:bg-primary/90"
              >
                <CalendarHeart className="mr-2 h-4 w-4" /> Book a consultation
              </Button>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-border px-7 hover:bg-secondary"
                >
                  Browse services <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============== LIGHTBOX ============== */}
      {active && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/95 backdrop-blur"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title} — image ${lightboxIndex + 1} of ${filtered.length}`}
        >
          {/* Close */}
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close lightbox"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-background/15 text-background transition-colors hover:bg-background/25"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Prev */}
          {filtered.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-background/15 text-background transition-colors hover:bg-background/25 sm:left-6"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Next */}
          {filtered.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-background/15 text-background transition-colors hover:bg-background/25 sm:right-6"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Figure */}
          <figure
            className="relative mx-auto flex max-h-[90vh] w-full max-w-5xl flex-col items-center px-4 py-6"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={getImage(active.imageKey, active.imageIndex)}
              alt={active.title}
              className="max-h-[80vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
              width={1200}
              height={1600}
              sizes="100vw"
            />
            <figcaption className="mt-4 flex w-full max-w-3xl flex-col items-center gap-2 text-center">
              <div className="flex flex-col items-center gap-1">
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-background/70">
                  {active.category}
                </span>
                <span className="font-serif text-xl font-semibold text-background">
                  {active.title}
                </span>
                <span className="text-sm text-background/80">
                  by {stylistName(active.stylistSlug)}
                </span>
              </div>
              <span className="mt-1 rounded-full bg-background/15 px-3 py-1 text-xs font-medium text-background/85">
                {lightboxIndex + 1} / {filtered.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
