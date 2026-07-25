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
          className="rounded-full bg-primary px-7 text-base shadow-lg shadow-primary/25 hover:bg-primary/90"
        >
          <CalendarHeart className="mr-2 h-5 w-5" /> Book a consultation
        </Button>
      </PageHero>

      {/* ============== FEATURED POST ============== */}
      <section className="bg-background py-6 md:py-10 lg:py-16">
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
                    <Badge className="absolute left-4 top-4 bg-background/90 text-foreground backdrop-blur-sm">
                      Featured
                    </Badge>
                  </div>
                  <CardContent className="flex flex-col gap-4 p-7 sm:p-9">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <Badge className="bg-secondary text-secondary-foreground">{featured.category}</Badge>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {featured.readTime}
                      </span>
                    </div>
                    <h2 className="font-serif font-semibold leading-tight text-foreground text-lg md:text-xl lg:text-2xl">
                      {featured.title}
                    </h2>
                    <p className="text-pretty text-muted-foreground leading-snug md:leading-relaxed">
                      {featured.excerpt}
                    </p>
                    <div className="mt-auto flex items-center gap-3 border-t border-border/60 pt-4">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-primary">
                        <User className="h-4 w-4" />
                      </span>
                      <div className="text-sm">
                        <p className="font-medium text-foreground">{featured.author}</p>
                        <p className="text-xs text-muted-foreground">{featured.date}</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
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
      <section className="bg-blush py-6 md:py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5">
            <Reveal className="relative max-w-xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles, tags or topics..."
                aria-label="Search articles"
                className="h-11 rounded-full border-border/70 bg-background pl-11 pr-4"
              />
            </Reveal>
            <Reveal delay={80} className="flex flex-wrap gap-2">
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
      <section className="bg-background py-6 md:py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border/80 bg-secondary/30 text-center py-8 md:py-12 lg:py-20">
              <Search className="h-10 w-10 text-muted-foreground" />
              <h3 className="font-serif text-xl font-semibold text-foreground">No articles found</h3>
              <p className="max-w-sm text-sm text-muted-foreground">
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
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                        <Badge className="absolute left-3 top-3 bg-background/90 text-foreground backdrop-blur-sm">
                          {post.category}
                        </Badge>
                      </div>
                      <CardContent className="flex flex-col gap-3 pt-4">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{post.date}</span>
                          <span aria-hidden>·</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {post.readTime}
                          </span>
                        </div>
                        <h3 className="font-serif text-lg font-semibold leading-snug text-foreground">
                          {post.title}
                        </h3>
                        <p className="line-clamp-2 text-sm text-muted-foreground leading-snug md:leading-relaxed">
                          {post.excerpt}
                        </p>
                        <p className="text-xs font-medium text-foreground/70">
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
