import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { stylists, salonInfo } from "@/lib/salon-data";
import { getImage } from "@/lib/salon-images";
import { BookButton } from "@/components/site/book-button";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { Stars } from "@/components/site/stars";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarHeart,
  ArrowRight,
  Sparkles,
  Award,
  Languages,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the stylists, colourists and estheticians at Lumière Beauty Lounge, San Francisco. Browse specialities, ratings and book directly.",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {

  return (
    <div className="flex flex-col">
      {/* ============== HERO ============== */}
      <PageHero
        eyebrow="Our team"
        title="Meet the people behind your glow"
        description="Our stylists, colourists, makeup artists and therapists bring decades of combined training with L'Oréal, Wella, Vidal Sassoon and more — all under one roof in Hayes Valley."
        imageKey="team"
        imageIndex={0}
      >
        <BookButton
          size="lg"
          className="rounded-full bg-primary px-7 text-base shadow-lg shadow-primary/25 hover:bg-primary/90"
        >
          <CalendarHeart className="mr-2 h-5 w-5" /> Book with a stylist
        </BookButton>
      </PageHero>

      {/* ============== TEAM GRID ============== */}
      <section className="bg-background py-6 md:py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-10 flex flex-col gap-3 text-center">
            <span className="mx-auto inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-salon-rose">
              <span className="h-px w-6 bg-salon-rose/50" />
              The Lumière family
              <span className="h-px w-6 bg-salon-rose/50" />
            </span>
            <h2 className="font-serif font-semibold tracking-tight text-foreground text-xl md:text-2xl lg:text-3xl">
              Certified, passionate, here for you
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg leading-snug md:leading-relaxed">
              Every stylist at Lumière is hand-picked for their craft and their
              care. Tap a profile to see their work, certifications, signature
              styles and reviews.
            </p>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stylists.map((st, i) => (
              <Reveal key={st.slug} delay={i * 80} as="article">
                <Link href={`/team/${st.slug}`} className="group block h-full">
                  <Card className="h-full border-transparent bg-transparent p-0 shadow-none transition-all duration-300 hover:-translate-y-1.5">
                    <div className="rounded-arch relative aspect-[4/5] overflow-hidden shadow-md transition-shadow duration-300 group-hover:shadow-2xl group-hover:shadow-primary/15">
                      <Image
                        src={getImage(st.imageKey, st.imageIndex)}
                        alt={`${st.name} — ${st.position} at Lumière Beauty Lounge`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/15 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 lg:p-5">
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-background/80">
                          {st.position}
                        </span>
                        <h3 className="mt-1 font-serif text-xl font-semibold text-background">
                          {st.name}
                        </h3>
                        <div className="mt-2 flex items-center gap-2">
                          <Stars rating={st.rating} size={14} />
                          <span className="text-xs font-medium text-background/85">
                            {st.rating.toFixed(1)} · {st.reviews} reviews
                          </span>
                        </div>
                      </div>
                      <span className="absolute right-4 top-6 rounded-full bg-background/90 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-primary shadow-sm backdrop-blur">
                        {st.tier}
                      </span>
                    </div>
                    <CardContent className="flex flex-col gap-3 px-2 pb-2 pt-4">
                      <p className="line-clamp-2 text-sm text-muted-foreground leading-snug md:leading-relaxed">
                        {st.bio}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {st.expertise.slice(0, 3).map((e) => (
                          <Badge
                            key={e}
                            variant="secondary"
                            className="rounded-full bg-primary/10 text-xs font-medium text-primary hover:bg-primary/15"
                          >
                            {e}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-1 flex items-center justify-between border-t border-border/60 pt-3">
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                          <Clock className="h-3.5 w-3.5 text-salon-rose" />
                          {st.experience} experience
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition-transform group-hover:translate-x-0.5">
                          View profile <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============== JOIN OUR TEAM CTA ============== */}
      <section className="border-t border-border/60 bg-blush py-6 md:py-10 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal className="flex flex-col items-center gap-5">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
              <Sparkles className="h-6 w-6" />
            </span>
            <h2 className="font-serif font-semibold tracking-tight text-foreground text-xl md:text-2xl lg:text-3xl">
              Want to join our team?
            </h2>
            <p className="max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg leading-snug md:leading-relaxed">
              We're always looking for certified, kind, curious stylists,
              colourists, makeup artists and therapists to join the Lumière
              family. We offer the city's best commission structure, ongoing
              international training, and a hygienic, supportive workplace.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/careers">
                <Button
                  size="lg"
                  className="rounded-full bg-primary px-7 shadow-sm hover:bg-primary/90"
                >
                  View open roles <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-border bg-background px-7 hover:bg-secondary"
                >
                  Reach out
                </Button>
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-medium text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Award className="h-4 w-4 text-salon-rose" /> Certified &amp;
                trained globally
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Languages className="h-4 w-4 text-salon-rose" /> Multilingual
                team
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-salon-rose" /> Flexible hours
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-salon-rose" /> {salonInfo.stats.years}{" "}
                years of care
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
