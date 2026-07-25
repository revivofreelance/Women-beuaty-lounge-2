import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { stylists, services, testimonials } from "@/lib/salon-data";
import { getImage, getImages } from "@/lib/salon-images";
import { BookButton } from "@/components/site/book-button";
import { Reveal } from "@/components/site/reveal";
import { Stars } from "@/components/site/stars";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarHeart,
  ArrowLeft,
  ArrowRight,
  Award,
  Languages,
  Sparkles,
  Heart,
  CheckCircle2,
  ChevronRight,
  Instagram,
  Clock,
  Scissors,
  Star,
  Quote,
} from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return stylists.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const st = stylists.find((s) => s.slug === slug);
  if (!st) return {};
  return {
    title: `${st.name} — ${st.position}`,
    description: st.bio ?? `Book ${st.name}, ${st.position} at Lumière Beauty Lounge, San Francisco.`,
    alternates: { canonical: `/team/${st.slug}` },
    openGraph: {
      title: `${st.name} — ${st.position} at Lumière Beauty Lounge`,
      images: [getImage(st.imageKey, 0)],
    },
  };
}

export default async function StylistDetailPage({ params }: Props) {
  const { slug } = await params;
  const st = stylists.find((s) => s.slug === slug);
  if (!st) notFound();

  const firstName = st.name.split(" ")[0];

  // Portfolio: the stylist's own work shots (index 0 is their portrait)
  const portfolioImages = getImages(st.imageKey).slice(1, 7);

  // Services by this stylist: prefer recommendedStylistSlug match,
  // otherwise fall back to services whose name overlaps with signatureServices or expertise.
  const recommended = services.filter(
    (s) => s.recommendedStylistSlug === st.slug
  );
  const fallback = services.filter((s) =>
    s.name.split(/\s|&/).some((w) =>
      w.length > 3 &&
      [...st.signatureServices, ...st.expertise].some((e) =>
        e.toLowerCase().includes(w.toLowerCase())
      )
    )
  );
  const stylistServices =
    recommended.length >= 3
      ? recommended
      : [...recommended, ...fallback.filter((s) => !recommended.includes(s))].slice(0, 6);

  // Reviews: prefer testimonials whose service matches the stylist's signatureServices
  const matched = testimonials.filter(
    (t) =>
      st.signatureServices.some((ss) =>
        t.service.toLowerCase().includes(ss.toLowerCase().split(" ")[0])
      ) ||
      t.text.toLowerCase().includes(firstName.toLowerCase())
  );
  const stylistReviews = (matched.length >= 3 ? matched : testimonials).slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* ============== BREADCRUMB ============== */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-border/60 bg-background"
      >
        <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-1.5 px-4 py-3 text-xs text-muted-foreground sm:px-6 lg:px-8">
          <li>
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
          </li>
          <li>
            <ChevronRight className="h-3.5 w-3.5 opacity-60" />
          </li>
          <li>
            <Link href="/team" className="hover:text-primary">
              Our Team
            </Link>
          </li>
          <li>
            <ChevronRight className="h-3.5 w-3.5 opacity-60" />
          </li>
          <li>
            <span className="font-medium text-foreground">{st.name}</span>
          </li>
        </ol>
      </nav>

      {/* ============== HERO ============== */}
      <section className="bg-background py-6 md:py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
            {/* Portrait */}
            <Reveal>
              <div className="relative">
                <Image
                  src={getImage(st.imageKey, st.imageIndex)}
                  alt={`${st.name} — ${st.position} at Lumière Beauty Lounge`}
                  className="aspect-[4/5] w-full rounded-3xl object-cover shadow-xl"
                  priority
                  fetchPriority="high"
                  width={800}
                  height={1000}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute -bottom-5 -right-5 flex flex-col items-center rounded-2xl bg-primary px-6 py-4 text-primary-foreground shadow-lg">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-5 w-5 fill-current text-salon-gold" />
                    <span className="font-serif font-semibold leading-none text-lg md:text-xl lg:text-2xl">
                      {st.rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="mt-1 text-[0.65rem] font-medium uppercase tracking-wider text-primary-foreground/85">
                    {st.reviews} reviews
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Info */}
            <Reveal delay={120} className="flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                <Badge
                  variant="secondary"
                  className="w-fit rounded-full bg-primary/10 text-xs font-semibold uppercase tracking-[0.18em] text-primary"
                >
                  {st.position} · {st.tier}
                </Badge>
                <h1 className="font-serif font-semibold leading-tight tracking-tight text-foreground text-lg md:text-xl lg:text-2xl">
                  {st.name}
                </h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Stars rating={st.rating} size={15} />
                    <span className="font-medium text-foreground">
                      {st.rating.toFixed(1)}
                    </span>
                    <span>({st.reviews} reviews)</span>
                  </span>
                  <span className="hidden h-4 w-px bg-border sm:block" />
                  <span className="inline-flex items-center gap-1.5">
                    <Award className="h-4 w-4 text-salon-rose" />
                    {st.experience} experience
                  </span>
                </div>
              </div>

              <p className="text-pretty text-base text-foreground/80 leading-snug md:leading-relaxed">
                {st.longBio}
              </p>

              {/* Certifications, Languages, Availability cards */}
              <div className="grid gap-3 sm:grid-cols-2">
                <Card className="border-border/70 shadow-sm p-3 md:p-4 lg:p-5">
                  <CardContent className="flex flex-col gap-3 p-0">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-salon-rose">
                      <Award className="h-4 w-4" /> Certifications
                    </span>
                    <ul className="flex flex-col gap-2">
                      {st.certifications.map((c) => (
                        <li
                          key={c}
                          className="flex items-start gap-2 text-sm text-foreground/85"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-border/70 shadow-sm p-3 md:p-4 lg:p-5">
                  <CardContent className="flex flex-col gap-3 p-0">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-salon-rose">
                      <Languages className="h-4 w-4" /> Languages
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {st.languages.map((l) => (
                        <Badge
                          key={l}
                          variant="outline"
                          className="rounded-full border-border/70 text-xs font-medium"
                        >
                          {l}
                        </Badge>
                      ))}
                    </div>
                    <span className="mt-1 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-salon-rose">
                      <Clock className="h-4 w-4" /> Availability
                    </span>
                    <p className="text-sm font-medium text-foreground/85">
                      {st.availability}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Expertise */}
              <div className="flex flex-col gap-2.5">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-salon-rose">
                  <Sparkles className="h-4 w-4" /> Expertise
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {st.expertise.map((e) => (
                    <Badge
                      key={e}
                      className="rounded-full bg-primary/10 text-xs font-medium text-primary hover:bg-primary/15"
                    >
                      {e}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Signature styles */}
              <div className="flex flex-col gap-2.5">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-salon-rose">
                  <Heart className="h-4 w-4" /> Signature styles
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {st.favoriteStyles.map((s) => (
                    <Badge
                      key={s}
                      variant="secondary"
                      className="rounded-full bg-secondary text-xs font-medium text-secondary-foreground"
                    >
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <BookButton stylist={st.slug}
                  size="lg"
                  className="rounded-full bg-primary px-6 shadow-sm hover:bg-primary/90"
                >
                  <CalendarHeart className="mr-2 h-4 w-4" /> Book with {firstName}
                </BookButton>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-border px-6 hover:bg-secondary"
                >
                  <a
                    href={st.social.instagram ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram className="mr-2 h-4 w-4" /> Portfolio
                  </a>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="lg"
                  className="rounded-full px-6 text-foreground/80 hover:bg-secondary hover:text-primary"
                >
                  <Link href="/team">
                    <ArrowLeft className="mr-2 h-4 w-4" /> All stylists
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============== PORTFOLIO ============== */}
      <section className="border-t border-border/60 bg-secondary/30 py-6 md:py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-8 flex flex-col gap-2 text-center">
            <span className="mx-auto inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-salon-rose">
              <span className="h-px w-6 bg-salon-rose/50" />
              Recent work
              <span className="h-px w-6 bg-salon-rose/50" />
            </span>
            <h2 className="font-serif font-semibold tracking-tight text-foreground text-xl md:text-2xl lg:text-3xl">
              {firstName}'s portfolio
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-base text-muted-foreground leading-snug md:leading-relaxed">
              A selection of {firstName}'s recent cuts, colour and styling work.
              Tap any photo to see more in the gallery.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {portfolioImages.map((src, i) => (
              <Reveal key={i} delay={i * 60}>
                <Link
                  href="/gallery"
                  className="group relative block aspect-square overflow-hidden rounded-xl"
                >
                  <Image
                    src={src}
                    alt={`${st.name} portfolio work ${i + 1}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent transition-colors duration-300 group-hover:from-foreground/85" />
                  <span className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-medium text-background">
                    <span>View gallery</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============== REVIEWS ============== */}
      <section className="bg-background py-6 md:py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-10 flex flex-col gap-2 text-center">
            <span className="mx-auto inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-salon-rose">
              <span className="h-px w-6 bg-salon-rose/50" />
              Client love
              <span className="h-px w-6 bg-salon-rose/50" />
            </span>
            <h2 className="font-serif font-semibold tracking-tight text-foreground text-xl md:text-2xl lg:text-3xl">
              What clients say about {firstName}
            </h2>
            <div className="mx-auto mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <Stars rating={st.rating} size={16} />
              <span className="font-medium text-foreground">
                {st.rating.toFixed(1)}
              </span>
              <span>· based on {st.reviews} reviews</span>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stylistReviews.map((t, i) => (
              <Reveal key={t.id} delay={i * 80} as="article">
                <Card className="h-full border-border/70 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg p-4 md:p-5 lg:p-6">
                  <CardContent className="flex h-full flex-col gap-4 p-0">
                    <div className="flex items-center justify-between">
                      <Quote className="h-7 w-7 text-primary/30" />
                      <span className="rounded-full bg-secondary px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-secondary-foreground">
                        {t.source}
                      </span>
                    </div>
                    <Stars rating={t.rating} size={14} />
                    <p className="flex-1 text-pretty text-sm text-foreground/80 leading-snug md:leading-relaxed">
                      "{t.text}"
                    </p>
                    <div className="mt-1 flex items-center gap-3 border-t border-border/60 pt-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {t.name
                          .split(" ")
                          .map((w) => w[0])
                          .slice(0, 2)
                          .join("")}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-foreground">
                          {t.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {t.service} · {t.date}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============== SERVICES BY THIS STYLIST ============== */}
      <section className="border-t border-border/60 bg-secondary/30 py-6 md:py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-10 flex flex-col gap-2 text-center">
            <span className="mx-auto inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-salon-rose">
              <span className="h-px w-6 bg-salon-rose/50" />
              Book with {firstName}
              <span className="h-px w-6 bg-salon-rose/50" />
            </span>
            <h2 className="font-serif font-semibold tracking-tight text-foreground text-xl md:text-2xl lg:text-3xl">
              Services by {firstName}
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-base text-muted-foreground leading-snug md:leading-relaxed">
              {firstName} personally recommends these services — book any of them
              and request {firstName} as your stylist.
            </p>
          </Reveal>

          {stylistServices.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground">
              No specific services listed yet.{" "}
              <Link href="/services" className="text-primary underline">
                Browse all services
              </Link>
              .
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {stylistServices.map((s, i) => (
                <Reveal key={s.slug} delay={i * 70} as="article">
                  <Link href="/services" className="group block h-full">
                    <Card className="h-full overflow-hidden border-border/70 p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={getImage(s.imageKey, 0)}
                          alt={s.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-primary shadow-sm backdrop-blur">
                          {s.category}
                        </span>
                      </div>
                      <CardContent className="flex flex-col gap-2 p-3 md:p-4 lg:p-5">
                        <h3 className="font-serif text-lg font-semibold text-foreground">
                          {s.name}
                        </h3>
                        <p className="line-clamp-1 text-sm text-muted-foreground">
                          {s.shortDescription}
                        </p>
                        <div className="mt-2 flex items-center justify-between border-t border-border/60 pt-3">
                          <span className="text-sm font-semibold text-foreground">
                            from{" "}
                            <span className="text-primary">
                              ${s.startingPrice}
                            </span>
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition-transform group-hover:translate-x-0.5">
                            View <ArrowRight className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}

          <Reveal className="mt-6 md:mt-10 flex flex-col items-center gap-3 text-center">
            <p className="text-sm text-muted-foreground">
              Don't see what you're looking for? Explore our full menu.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/services">
                <Button
                  variant="outline"
                  className="rounded-full border-border px-6 hover:bg-secondary"
                >
                  <Scissors className="mr-2 h-4 w-4" /> All services
                </Button>
              </Link>
              <BookButton stylist={st.slug}
                className="rounded-full bg-primary px-6 shadow-sm hover:bg-primary/90"
              >
                <CalendarHeart className="mr-2 h-4 w-4" /> Book with {firstName}
              </BookButton>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
