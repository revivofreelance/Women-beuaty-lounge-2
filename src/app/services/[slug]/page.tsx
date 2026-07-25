import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { services, stylists } from "@/lib/salon-data";
import { getImage, getImages } from "@/lib/salon-images";
import { BookButton } from "@/components/site/book-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/components/site/reveal";
import { Stars } from "@/components/site/stars";
import {
  Clock, Tag, CheckCircle2, ArrowRight, ArrowLeft, CalendarHeart,
  User, Info, Heart, ChevronRight, Wrench, Sparkles, ShieldCheck, ListChecks,
} from "lucide-react";
import { cn } from "@/lib/utils";

function SectionTitle({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <h2 className="flex items-center gap-2 font-serif font-semibold tracking-tight text-foreground text-sm sm:gap-2.5 sm:text-lg md:text-xl lg:text-2xl">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary sm:h-9 sm:w-9">
        <Icon className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5" />
      </span>
      {children}
    </h2>
  );
}

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.shortDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.name} — Lumière Beauty Lounge`,
      description: service.shortDescription,
      images: [getImage(service.imageKey, 0)],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const stylist = stylists.find((st) => st.slug === service.recommendedStylistSlug) ?? stylists[0];
  const stylistFirstName = stylist.name.split(" ")[0];

  const related = services.filter((s) => service.relatedSlugs.includes(s.slug)).slice(0, 3);
  const excluded = [getImage(service.imageKey, 0), ...related.map((s) => getImage(s.imageKey, 0))];
  const galleryImages = service.galleryKeys
    .flatMap((k) => getImages(k))
    .filter((src) => !excluded.includes(src))
    .slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* ============== BREADCRUMB ============== */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-border/60 bg-secondary/30"
      >
        <ol className="mx-auto flex max-w-7xl items-center gap-1 px-4 py-2 text-[0.7rem] sm:gap-1.5 sm:py-3.5 sm:text-sm sm:px-6 lg:px-8">
          <li>
            <Link href="/" className="text-muted-foreground transition-colors hover:text-primary">
              Home
            </Link>
          </li>
          <li aria-hidden className="text-muted-foreground/60">
            <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </li>
          <li>
            <Link href="/services" className="text-muted-foreground transition-colors hover:text-primary">
              Services
            </Link>
          </li>
          <li aria-hidden className="text-muted-foreground/60">
            <ChevronRight className="h-3.5 w-3.5" />
          </li>
          <li>
            <span className="font-medium text-foreground">{service.name}</span>
          </li>
        </ol>
      </nav>

      {/* ============== HERO ============== */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={getImage(service.imageKey, 0)}
            alt={service.name}
            className="h-full w-full object-cover"
            priority
            fetchPriority="high"
            fill
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/92 via-foreground/75 to-foreground/45" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 sm:py-6 md:py-10 lg:py-16">
          <Reveal className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="rounded-full border border-background/20 bg-background/15 px-2 py-0 text-[0.6rem] text-background backdrop-blur-sm hover:bg-background/15 sm:px-2.5 sm:py-0.5 sm:text-xs">
                {service.category}
              </Badge>
              {service.popular && (
                <Badge className="gap-1 rounded-full bg-primary px-2 py-0 text-[0.6rem] text-primary-foreground shadow-sm sm:px-3 sm:py-0.5 sm:text-xs">
                  <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  Popular choice
                </Badge>
              )}
            </div>
            <h1 className="mt-2.5 font-serif font-semibold leading-tight tracking-tight text-background text-lg sm:mt-4 sm:text-xl md:text-2xl lg:text-3xl">
              {service.name}
            </h1>
            <p className="mt-2 max-w-xl text-pretty text-xs text-background/85 sm:mt-4 sm:text-lg leading-snug md:leading-relaxed">
              {service.shortDescription}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[0.65rem] text-background/85 sm:mt-6 sm:gap-4 sm:text-sm">
              <span className="inline-flex items-center gap-2 rounded-full bg-background/10 px-3.5 py-1.5 backdrop-blur-sm ring-1 ring-background/15">
                <Clock className="h-4 w-4 text-salon-gold" />
                {service.duration}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-background/10 px-3.5 py-1.5 backdrop-blur-sm ring-1 ring-background/15">
                <Tag className="h-4 w-4 text-salon-gold" />
                from ${service.startingPrice}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-background/10 px-3.5 py-1.5 backdrop-blur-sm ring-1 ring-background/15">
                <Sparkles className="h-4 w-4 text-salon-gold" />
                Lasts {service.longevity}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 items-center gap-2 sm:mt-8 sm:flex sm:flex-wrap sm:gap-3">
              <BookButton service={service.slug}
                className="h-8 w-full rounded-full bg-primary px-2 text-[0.7rem] shadow-sm transition-all hover:bg-primary/90 hover:shadow-md sm:h-9 sm:w-auto sm:px-6 sm:text-sm"
              >
                <CalendarHeart className="mr-1 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
                Book this service
              </BookButton>
              <Button
                asChild
                variant="outline"
                className="h-8 w-full rounded-full border-background/30 bg-background/10 px-2 text-[0.7rem] text-background backdrop-blur-sm hover:bg-background/20 hover:text-background sm:h-9 sm:w-auto sm:px-6 sm:text-sm"
              >
                <Link href="/services">
                  <ArrowLeft className="mr-1 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
                  All services
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============== BODY ============== */}
      <section className="py-5 sm:py-6 md:py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {/* ---------- MAIN ---------- */}
            <div className="space-y-7 sm:space-y-14 lg:col-span-2">
              {/* Overview */}
              <Reveal>
                <div className="space-y-2 sm:space-y-4">
                  <SectionTitle icon={Sparkles}>Overview</SectionTitle>
                  <p className="text-pretty text-[0.7rem] text-muted-foreground sm:text-base leading-snug md:leading-relaxed">
                    {service.overview}
                  </p>
                </div>
              </Reveal>

              {/* Process */}
              <Reveal>
                <div className="space-y-3 sm:space-y-6">
                  <SectionTitle icon={ListChecks}>What to expect</SectionTitle>
                  <ol className="space-y-2.5 sm:space-y-4">
                    {service.process.map((step, i) => (
                      <li
                        key={step.title}
                        className="flex gap-2 rounded-2xl border border-border/70 bg-card p-2.5 transition-colors hover:border-primary/30 sm:gap-3 sm:p-4 md:gap-4 lg:p-5"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[0.7rem] font-semibold text-primary-foreground shadow-sm sm:h-8 sm:w-8 sm:text-sm">
                          {i + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                            <h3 className="font-serif text-[0.8rem] font-semibold leading-tight text-foreground sm:text-lg">
                              {step.title}
                            </h3>
                            <Badge
                              variant="secondary"
                              className="w-fit shrink-0 gap-1 rounded-full px-1.5 py-0 text-[0.6rem] font-medium sm:px-2 sm:py-0.5 sm:text-xs"
                            >
                              <Clock className="h-2.5 w-2.5 text-primary sm:h-3 sm:w-3" />
                              {step.duration}
                            </Badge>
                          </div>
                          <p className="mt-1 text-[0.7rem] text-muted-foreground leading-snug sm:mt-2 sm:text-sm md:leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>

              {/* Benefits & suitability */}
              <Reveal>
                <div className="space-y-6">
                  <SectionTitle icon={CheckCircle2}>Benefits &amp; suitability</SectionTitle>
                  <div className="grid grid-cols-2 gap-3 sm:gap-5">
                    <Card className="border-border/70 p-2.5 shadow-none sm:p-4 lg:p-5">
                      <div className="mb-2 flex items-center gap-1.5 sm:mb-4 sm:gap-2">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-primary sm:h-5 sm:w-5" />
                        <h3 className="font-serif text-[0.8rem] font-semibold leading-tight text-foreground sm:text-lg">
                          Benefits
                        </h3>
                      </div>
                      <ul className="space-y-1.5 sm:space-y-2.5">
                        {service.benefits.map((b) => (
                          <li key={b} className="flex gap-1.5 text-[0.7rem] text-muted-foreground leading-snug sm:gap-2.5 sm:text-sm md:leading-relaxed">
                            <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-salon-rose sm:h-4 sm:w-4" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                    <Card className="border-border/70 p-2.5 shadow-none sm:p-4 lg:p-5">
                      <div className="mb-2 flex items-center gap-1.5 sm:mb-4 sm:gap-2">
                        <User className="h-4 w-4 shrink-0 text-primary sm:h-5 sm:w-5" />
                        <h3 className="font-serif text-[0.8rem] font-semibold leading-tight text-foreground sm:text-lg">
                          Suitable for
                        </h3>
                      </div>
                      <ul className="space-y-1.5 sm:space-y-2.5">
                        {service.suitableFor.map((b) => (
                          <li key={b} className="flex gap-1.5 text-[0.7rem] text-muted-foreground leading-snug sm:gap-2.5 sm:text-sm md:leading-relaxed">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-salon-gold" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                      {service.notSuitableFor && service.notSuitableFor.length > 0 && (
                        <div className="mt-3 rounded-xl border border-amber-200/60 bg-amber-50/60 p-2 dark:border-amber-900/40 dark:bg-amber-950/20 sm:mt-5 sm:p-3.5">
                          <div className="flex items-center gap-1.5 text-[0.7rem] font-semibold text-amber-700 dark:text-amber-400 sm:gap-2 sm:text-sm">
                            <Info className="h-3 w-3 shrink-0 sm:h-4 sm:w-4" />
                            Not suitable for
                          </div>
                          <ul className="mt-1.5 space-y-1 sm:mt-2 sm:space-y-1.5">
                            {service.notSuitableFor.map((b) => (
                              <li key={b} className="text-[0.7rem] text-amber-800/90 dark:text-amber-300/80 leading-snug sm:text-sm md:leading-relaxed">
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </Card>
                  </div>
                </div>
              </Reveal>

              {/* Preparation & aftercare */}
              <Reveal>
                <div className="space-y-6">
                  <SectionTitle icon={Heart}>Preparation &amp; aftercare</SectionTitle>
                  <div className="grid grid-cols-2 gap-3 sm:gap-5">
                    <Card className="border-border/70 p-2.5 shadow-none sm:p-4 lg:p-5">
                      <div className="mb-2 flex items-center gap-1.5 sm:mb-4 sm:gap-2">
                        <Info className="h-4 w-4 shrink-0 text-primary sm:h-5 sm:w-5" />
                        <h3 className="font-serif text-[0.8rem] font-semibold leading-tight text-foreground sm:text-lg">
                          Before your visit
                        </h3>
                      </div>
                      <ul className="space-y-1.5 sm:space-y-2.5">
                        {service.preparation.map((p) => (
                          <li key={p} className="flex gap-1.5 text-[0.7rem] text-muted-foreground leading-snug sm:gap-2.5 sm:text-sm md:leading-relaxed">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                    <Card className="border-border/70 p-2.5 shadow-none sm:p-4 lg:p-5">
                      <div className="mb-2 flex items-center gap-1.5 sm:mb-4 sm:gap-2">
                        <Heart className="h-4 w-4 shrink-0 text-primary sm:h-5 sm:w-5" />
                        <h3 className="font-serif text-[0.8rem] font-semibold leading-tight text-foreground sm:text-lg">
                          After-care
                        </h3>
                      </div>
                      <ul className="space-y-1.5 sm:space-y-2.5">
                        {service.aftercare.map((p) => (
                          <li key={p} className="flex gap-1.5 text-[0.7rem] text-muted-foreground leading-snug sm:gap-2.5 sm:text-sm md:leading-relaxed">
                            <Heart className="mt-0.5 h-3 w-3 shrink-0 text-salon-rose sm:h-3.5 sm:w-3.5" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </div>
                </div>
              </Reveal>

              {/* Products */}
              <Reveal>
                <div className="space-y-6">
                  <SectionTitle icon={Wrench}>Products we use</SectionTitle>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {service.products.map((p) => (
                      <div
                        key={p.name}
                        className="flex flex-col gap-1.5 rounded-2xl border border-border/70 bg-card p-2.5 transition-colors hover:border-primary/30 sm:gap-2 sm:p-4"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="min-w-0 text-[0.75rem] font-medium leading-tight text-foreground sm:text-base">{p.name}</h3>
                          <Badge
                            variant="secondary"
                            className="hidden shrink-0 rounded-full text-[0.65rem] uppercase tracking-wide sm:inline-flex"
                          >
                            Salon-grade
                          </Badge>
                        </div>
                        <p className="text-[0.7rem] text-muted-foreground leading-snug sm:text-sm md:leading-relaxed">
                          {p.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Add-ons */}
              {service.addOns && service.addOns.length > 0 && (
                <Reveal>
                  <div className="space-y-6">
                    <SectionTitle icon={Sparkles}>Enhance your service</SectionTitle>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      {service.addOns.map((a) => (
                        <div
                          key={a.name}
                          className="flex flex-col gap-1 rounded-2xl border border-border/70 bg-card p-2.5 transition-colors hover:border-primary/30 sm:gap-1.5 sm:p-4"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="min-w-0 text-[0.75rem] font-medium leading-tight text-foreground sm:text-base">{a.name}</h3>
                            <span className="shrink-0 font-serif text-[0.75rem] font-semibold text-primary sm:text-sm">
                              +${a.price}
                            </span>
                          </div>
                          <p className="text-[0.7rem] text-muted-foreground leading-snug sm:text-sm md:leading-relaxed">
                            {a.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}

              {/* Price tiers */}
              <Reveal>
                <div className="space-y-6">
                  <SectionTitle icon={Tag}>Pricing by stylist</SectionTitle>
                  <div className="overflow-hidden rounded-2xl border border-border/70 bg-card">
                    <div className="grid grid-cols-2 gap-px bg-border/60 sm:grid-cols-4">
                      {service.priceTiers.map((tier, i) => (
                        <div
                          key={tier.tier}
                          className={cn(
                            "flex flex-col gap-0.5 bg-card p-2 text-center sm:gap-1 sm:p-4 lg:p-5",
                            i === 0 && "bg-primary/5"
                          )}
                        >
                          <span className="text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:text-xs sm:tracking-[0.18em]">
                            {tier.tier}
                          </span>
                          <span className="font-serif font-semibold text-foreground text-[0.9rem] sm:text-lg md:text-xl lg:text-2xl">
                            ${tier.price}
                          </span>
                          {i === 0 && (
                            <span className="text-[0.5rem] font-medium uppercase tracking-wide text-salon-rose sm:text-[0.65rem]">
                              Starting
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-border/60 bg-secondary/30 p-2 text-center text-[0.65rem] text-muted-foreground sm:p-4 sm:text-xs">
                      Prices vary by stylist seniority — Junior, Senior, Master &amp; Director. All
                      prices in USD, inclusive of consultation.
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl bg-blush p-2.5 sm:gap-3 sm:p-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10 bg-primary text-primary-foreground">
                      <Sparkles className="h-4 w-4" />
                    </span>
                    <p className="text-[0.7rem] leading-snug text-foreground sm:text-sm">
                      <span className="font-semibold">Starting at ${service.startingPrice}</span> for
                      this service with a Junior stylist. Book a Master or Director for our most
                      experienced artists.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Gallery */}
              {galleryImages.length > 0 && (
                <Reveal>
                  <div className="space-y-6">
                    <SectionTitle icon={Sparkles}>Gallery</SectionTitle>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {galleryImages.map((src, i) => (
                        <Link
                          key={i}
                          href="/gallery"
                          className="group relative aspect-square overflow-hidden rounded-xl border border-border/70"
                        >
                          <Image
                            src={src}
                            alt={`${service.name} — example ${i + 1}`}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            fill
                            sizes="(max-width: 640px) 50vw, 25vw"
                          />
                          <div className="absolute inset-0 bg-foreground/0 transition-colors group-hover:bg-foreground/15" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}

              {/* FAQ */}
              <Reveal>
                <div className="space-y-6">
                  <SectionTitle icon={Info}>Frequently asked</SectionTitle>
                  <Card className="border-border/70 p-2.5 shadow-none sm:p-4 lg:p-5">
                    <Accordion type="single" collapsible className="w-full">
                      {service.faqs.map((f, i) => (
                        <AccordionItem key={f.q} value={`faq-${i}`} className="border-border/60">
                          <AccordionTrigger className="text-left text-[0.75rem] font-medium leading-tight text-foreground hover:no-underline sm:text-base">
                            {f.q}
                          </AccordionTrigger>
                          <AccordionContent className="text-[0.7rem] text-muted-foreground leading-snug sm:text-sm md:leading-relaxed">
                            {f.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </Card>
                </div>
              </Reveal>

              {/* Results */}
              <Reveal>
                <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/8 via-blush to-background p-3 sm:p-9">
                  <span className="inline-flex items-center gap-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-salon-rose sm:gap-2 sm:text-xs sm:tracking-[0.2em]">
                    <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    The result
                  </span>
                  <p className="mt-2 font-serif text-[0.85rem] font-medium leading-snug text-foreground sm:mt-3 sm:text-2xl">
                    “{service.results}”
                  </p>
                  <div className="mt-3 grid grid-cols-2 items-center gap-2 sm:mt-5 sm:flex sm:flex-wrap sm:gap-3">
                    <BookButton service={service.slug}
                      className="h-8 w-full rounded-full bg-primary px-2 text-[0.7rem] sm:h-9 sm:w-auto sm:px-5 sm:text-sm"
                    >
                      <CalendarHeart className="mr-1 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
                      Book this service
                    </BookButton>
                    <Button asChild variant="outline" className="h-8 w-full rounded-full px-2 text-[0.7rem] sm:h-9 sm:w-auto sm:px-5 sm:text-sm">
                      <Link href="/team">
                        Meet our stylists
                        <ArrowRight className="ml-1 h-3.5 w-3.5 sm:ml-2 sm:h-4 sm:w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* ---------- SIDEBAR ---------- */}
            <aside className="lg:col-span-1">
              <div className="space-y-3 sm:space-y-6 lg:sticky lg:top-24">
                {/* Pricing card */}
                <Card className="border-border/70 p-3 shadow-sm sm:p-5 lg:p-6">
                  <p className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:text-xs sm:tracking-[0.18em]">
                    Starting price
                  </p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-serif font-semibold text-primary text-xl sm:text-2xl md:text-3xl">
                      ${service.startingPrice}
                    </span>
                    <span className="text-[0.7rem] text-muted-foreground sm:text-sm">USD</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5 sm:mt-3 sm:gap-2">
                    <Badge variant="secondary" className="gap-1 rounded-full px-1.5 py-0 text-[0.6rem] sm:px-2 sm:py-0.5 sm:text-xs">
                      <Clock className="h-2.5 w-2.5 text-primary sm:h-3 sm:w-3" />
                      {service.duration}
                    </Badge>
                    <Badge variant="secondary" className="gap-1 rounded-full px-1.5 py-0 text-[0.6rem] sm:px-2 sm:py-0.5 sm:text-xs">
                      <Sparkles className="h-2.5 w-2.5 text-primary sm:h-3 sm:w-3" />
                      {service.longevity}
                    </Badge>
                  </div>
                  <BookButton service={service.slug}
                    className="mt-3 h-9 w-full rounded-full bg-primary text-xs shadow-sm transition-all hover:bg-primary/90 hover:shadow-md sm:mt-5 sm:h-11 sm:text-base"
                  >
                    <CalendarHeart className="mr-2 h-4 w-4" />
                    Book appointment
                  </BookButton>
                  <p className="mt-2 flex items-center gap-1.5 text-[0.65rem] text-muted-foreground leading-snug sm:mt-3 sm:gap-2 sm:text-xs md:leading-relaxed">
                    <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-salon-rose sm:h-4 sm:w-4" />
                    Free cancellation up to 24 hours before your appointment.
                  </p>
                </Card>

                {/* Recommended stylist */}
                <Card className="border-border/70 p-3 shadow-sm sm:p-5 lg:p-6">
                  <p className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:text-xs sm:tracking-[0.18em]">
                    Recommended stylist
                  </p>
                  <Link
                    href={`/team/${stylist.slug}`}
                    className="group mt-2 flex items-center gap-2.5 sm:mt-3 sm:gap-4"
                  >
                    <Image
                      src={getImage(stylist.imageKey, stylist.imageIndex)}
                      alt={stylist.name}
                      className="h-10 w-10 shrink-0 rounded-full border-2 border-background object-cover shadow-sm ring-1 ring-border/60 transition-transform group-hover:scale-105 sm:h-14 sm:w-14"
                      width={56}
                      height={56}
                    />
                    <div className="min-w-0">
                      <p className="truncate font-serif text-[0.8rem] font-semibold text-foreground sm:text-base">
                        {stylist.name}
                      </p>
                      <p className="truncate text-[0.65rem] text-muted-foreground sm:text-xs">
                        {stylist.position}
                      </p>
                      <div className="mt-1 flex items-center gap-1.5">
                        <Stars rating={stylist.rating} size={13} />
                        <span className="text-[0.65rem] text-muted-foreground sm:text-xs">
                          {stylist.rating.toFixed(1)} · {stylist.reviews}
                        </span>
                      </div>
                    </div>
                  </Link>
                  <BookButton service={service.slug} stylist={stylist.slug}
                    variant="outline"
                    className="mt-3 h-8 w-full rounded-full text-xs sm:mt-4 sm:h-9 sm:text-sm"
                  >
                    <CalendarHeart className="mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Book with {stylistFirstName}
                  </BookButton>
                </Card>

                {/* Price tier quick-reference */}
                <Card className="border-border/70 p-3 shadow-sm sm:p-5 lg:p-6">
                  <p className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:text-xs sm:tracking-[0.18em]">
                    Price by stylist tier
                  </p>
                  <ul className="mt-2 divide-y divide-border/60 sm:mt-3">
                    {service.priceTiers.map((tier) => (
                      <li
                        key={tier.tier}
                        className="flex items-center justify-between py-1.5 sm:py-2.5"
                      >
                        <span className="text-[0.7rem] font-medium text-foreground sm:text-sm">
                          {tier.tier}
                        </span>
                        <span className="font-serif text-[0.8rem] font-semibold text-primary sm:text-base">
                          ${tier.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-[0.65rem] text-muted-foreground leading-snug sm:mt-3 sm:text-xs md:leading-relaxed">
                    Tiers reflect experience: Junior (1–3 yrs) → Director (13+ yrs).
                  </p>
                </Card>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ============== RELATED ============== */}
      {related.length > 0 && (
        <section className="border-t border-border/60 bg-secondary/30 py-5 sm:py-6 md:py-10 lg:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-5 sm:mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <Reveal>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-salon-rose">
                  <span className="h-px w-6 bg-salon-rose/50" />
                  You may also like
                </span>
                <h2 className="mt-2 font-serif font-semibold tracking-tight text-foreground text-base sm:text-lg md:text-xl lg:text-2xl">
                  Related services
                </h2>
              </Reveal>
              <Button
                asChild
                variant="outline"
                className="h-8 w-fit rounded-full px-4 text-xs sm:h-9 sm:text-sm"
              >
                <Link href="/services">
                  View all
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5 sm:ml-2 sm:h-4 sm:w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
              {related.map((s, i) => (
                <Reveal key={s.slug} delay={Math.min(i * 80, 240)}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-2xl"
                  >
                    <Card className="h-full overflow-hidden p-0 gap-0 border-border/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={getImage(s.imageKey, 0)}
                          alt={s.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-transparent to-transparent" />
                        <Badge className="absolute left-1.5 top-1.5 rounded-full border border-background/20 bg-background/85 px-1.5 py-0 text-[0.55rem] text-foreground backdrop-blur-sm hover:bg-background/85 sm:left-3 sm:top-3 sm:px-2 sm:py-0.5 sm:text-xs">
                          {s.category}
                        </Badge>
                      </div>
                      <CardContent className="p-2.5 sm:p-4 lg:p-5">
                        <h3 className="font-serif text-[0.8rem] font-semibold leading-tight text-foreground sm:text-lg">
                          {s.name}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-[0.7rem] text-muted-foreground leading-snug sm:mt-2 sm:text-sm md:leading-relaxed">
                          {s.shortDescription}
                        </p>
                        <div className="mt-2 flex items-end justify-between gap-1 sm:mt-4">
                          <p className="font-serif text-[0.8rem] font-semibold text-primary sm:text-lg">
                            from ${s.startingPrice}
                          </p>
                          <span className="inline-flex shrink-0 items-center gap-0.5 text-[0.65rem] font-medium text-foreground transition-transform duration-300 group-hover:translate-x-0.5 sm:gap-1 sm:text-sm">
                            Details
                            <ArrowRight className="h-3 w-3 text-primary sm:h-4 sm:w-4" />
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
      )}
    </div>
  );
}
