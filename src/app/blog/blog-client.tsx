"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Link from "next/link";
import { blogPosts } from "@/lib/salon-data";
import { getImage } from "@/lib/salon-images";
import { useSalonStore } from "@/lib/store";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Clock, Search, ArrowRight, CalendarHeart, User } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Hair Care", "Skin Care", "Bridal", "Trends", "Seasonal", "Wellness"] as const;

export function BlogClient() {
  const { openBooking } = useSalonStore();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const featured = blogPosts[0];

  const filtered = useMemo(() => {
    return blogPosts.filter((post) => {
      if (post.slug === featured.slug && activeCategory === "All" && query.trim() === "") return false;
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q === "" ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  return (
    <div className="flex flex-col">
      {/* ============== HERO ============== */}
      <PageHero
        eyebrow="Beauty tips & blog"
        title="Expert guides for everyday glow"
        description="Straight-talking advice from our stylists, colourists and therapists — covering hair care, skin, bridal prep, seasonal trends and the science of healthy beauty."
        imageKey="blogHair"
        imageIndex={1}
      >
        <Button
          onClick={() => openBooking()}
          size="lg"
          className="h-9 rounded-full bg-primary px-4 text-xs sm:h-11 sm:px-7 sm:text-base shadow-lg shadow-primary/25 hover:bg-primary/90"
        >
          <CalendarHeart className="mr-2 h-5 w-5" /> Book a consultation
        </Button>
      </PageHero>

      {/* ============== FEATURED POST ============== */}
      <section className="bg-background py-5 sm:py-6 md:py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Link href={`/blog/${featured.slug}`} className="group block">
              <Card className="overflow-hidden border-border/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="grid md:grid-cols-2">
                  <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:h-full">
                    <Image
                      src={getImage(featured.imageKey, featured.imageIndex)}
                      alt={featured.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <Badge className="absolute left-2 top-2 px-1.5 py-0 text-[0.55rem] bg-background/90 text-foreground backdrop-blur-sm sm:left-4 sm:top-4 sm:px-2 sm:py-0.5 sm:text-xs">
                      Featured
                    </Badge>
                  </div>
                  <CardContent className="flex flex-col gap-2 p-3 sm:gap-4 sm:p-9">
                    <div className="flex items-center gap-2 text-[0.6rem] text-muted-foreground sm:gap-3 sm:text-xs">
                      <Badge className="bg-secondary px-1.5 py-0 text-[0.55rem] text-secondary-foreground sm:px-2 sm:py-0.5 sm:text-xs">{featured.category}</Badge>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {featured.readTime}
                      </span>
                    </div>
                    <h2 className="font-serif font-semibold leading-tight text-foreground text-sm sm:text-lg md:text-xl lg:text-2xl">
                      {featured.title}
                    </h2>
                    <p className="line-clamp-3 text-pretty text-[0.7rem] text-muted-foreground leading-snug sm:line-clamp-none sm:text-base md:leading-relaxed">
                      {featured.excerpt}
                    </p>
                    <div className="mt-auto flex items-center gap-2 border-t border-border/60 pt-2.5 sm:gap-3 sm:pt-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-primary sm:h-9 sm:w-9">
                        <User className="h-3 w-3 sm:h-4 sm:w-4" />
                      </span>
                      <div className="min-w-0 flex-1 text-[0.65rem] sm:text-sm">
                        <p className="truncate font-medium text-foreground">{featured.author}</p>
                        <p className="text-[0.6rem] text-muted-foreground sm:text-xs">{featured.date}</p>
                      </div>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1 text-[0.65rem] font-semibold text-primary sm:text-sm">
                      Read <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============== SEARCH + FILTER ============== */}
      <section className="bg-blush py-5 sm:py-6 md:py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:gap-5">
            <Reveal className="relative max-w-xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles, tags or topics..."
                aria-label="Search articles"
                className="h-9 rounded-full border-border/70 bg-background pl-10 pr-4 text-xs sm:h-11 sm:pl-11 sm:text-sm"
              />
            </Reveal>
            <Reveal delay={80} className="flex flex-wrap gap-1.5 sm:gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "border border-border/70 bg-background text-foreground/75 hover:bg-secondary hover:text-foreground"
                  )}
                >
                  {cat}
                </button>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============== POSTS GRID ============== */}
      <section className="bg-background py-5 sm:py-6 md:py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border/80 bg-secondary/30 text-center py-5 sm:py-8 md:py-12 lg:py-20">
              <Search className="h-7 w-7 text-muted-foreground sm:h-10 sm:w-10" />
              <h3 className="font-serif text-base font-semibold sm:text-xl text-foreground">No articles found</h3>
              <p className="max-w-sm text-xs text-muted-foreground sm:text-sm">
                Try a different search term or browse all articles by clearing the filters.
              </p>
              <Button
                onClick={() => {
                  setQuery("");
                  setActiveCategory("All");
                }}
                variant="outline"
                className="rounded-full"
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
              {filtered.map((post, i) => (
                <Reveal key={post.slug} delay={(i % 3) * 80}>
                  <Link href={`/blog/${post.slug}`} className="group block h-full">
                    <Card className="h-full overflow-hidden border-border/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={getImage(post.imageKey, post.imageIndex)}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <Badge className="absolute left-1.5 top-1.5 px-1.5 py-0 text-[0.55rem] bg-background/90 text-foreground backdrop-blur-sm sm:left-3 sm:top-3 sm:px-2 sm:py-0.5 sm:text-xs">
                          {post.category}
                        </Badge>
                      </div>
                      <CardContent className="flex flex-1 flex-col gap-1.5 sm:gap-3">
                        <div className="flex items-center gap-1.5 text-[0.6rem] text-muted-foreground sm:gap-2 sm:text-xs">
                          <span>{post.date}</span>
                          <span aria-hidden>·</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {post.readTime}
                          </span>
                        </div>
                        <h3 className="font-serif text-[0.8rem] font-semibold leading-tight text-foreground sm:text-lg">
                          {post.title}
                        </h3>
                        <p className="line-clamp-2 text-[0.7rem] text-muted-foreground sm:text-sm leading-snug md:leading-relaxed">
                          {post.excerpt}
                        </p>
                        <p className="mt-auto text-[0.6rem] font-medium text-foreground/70 sm:text-xs">
                          By {post.author}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
