import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import {
  packages,
  stylistTiers,
  membershipTiers,
  membershipTerms,
  prepaidSeries,
} from "@/lib/salon-data";
import { getImage } from "@/lib/salon-images";
import { BookButton } from "@/components/site/book-button";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  CalendarHeart,
  ArrowRight,
  ShieldCheck,
  Gift,
  Tag,
  Sparkles,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "No lock-in",
    desc: "Month-to-month plans. Cancel or pause with 7 days' notice.",
  },
  {
    icon: RefreshCw,
    title: "Credits roll over",
    desc: "Unused monthly credits stay valid for a further 90 days.",
  },
  {
    icon: Tag,
    title: "Series save 20%",
    desc: "Prepay for four sessions and the fifth is on us.",
  },
  {
    icon: Sparkles,
    title: "Members save 35%",
    desc: "Top-tier members take up to 35% off every service.",
  },
];

export const metadata: Metadata = {
  title: "Plans & Pricing",
  description:
    "Memberships, prepaid service series and packages at Lumière Beauty Lounge, Hayes Valley, San Francisco. Monthly credits from $39, five-session series from $80, no lock-in.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  const teaserPackages = packages.slice(0, 3);

  return (
    <div className="flex flex-col">
      <PageHero
        eyebrow="Plans & pricing"
        title="Pick the plan, not the price list"
        description="Monthly memberships, prepaid service series and curated packages — three ways to pay less for the salon routine you already keep. Per-service prices live on the services pages."
        imageKey="salonReception"
        imageIndex={3}
      >
        <div className="flex flex-wrap items-center gap-3">
          <BookButton
            className="h-8 rounded-full bg-primary px-4 text-xs sm:h-9 sm:px-6 sm:text-sm shadow-sm hover:bg-primary/90 hover:shadow-md"
          >
            <CalendarHeart className="mr-1.5 h-4 w-4" />
            Book now
          </BookButton>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-background/40 bg-background/10 px-6 text-sm text-background backdrop-blur-sm hover:bg-background/20 hover:text-background"
          >
            <Link href="/services">
              See service prices
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </PageHero>

      {/* ============== TRUST STRIP ============== */}
      <section className="border-b border-border/60 bg-background py-4 sm:py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {trustItems.map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10 bg-secondary text-primary">
                  <item.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground leading-snug md:leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== STYLIST TIER EXPLAINER ============== */}
      <section className="bg-background py-4 sm:py-6 md:py-8 lg:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-5 sm:mb-8 text-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-salon-rose">
              <span className="h-px w-6 bg-salon-rose/50" />
              Stylist seniority
              <span className="h-px w-6 bg-salon-rose/50" />
            </span>
            <h2 className="mt-3 font-serif font-semibold tracking-tight text-foreground text-lg sm:text-xl md:text-2xl lg:text-3xl">
              Pricing by stylist seniority
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm text-muted-foreground sm:text-base leading-snug md:leading-relaxed">
              Each service has a starting price with a Junior stylist. As you
              move up the tiers, you&apos;re paying for experience, specialism
              and artistry. Pick the tier that suits the service and your
              budget.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
            {stylistTiers.map((tier, i) => (
              <Reveal key={tier.tier} delay={i * 80}>
                <Card className="h-full border-border/70 bg-card hover:-translate-y-1 hover:shadow-md">
                  <CardContent className="flex h-full flex-col p-3 md:p-4 lg:p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-xs font-bold text-primary">
                        {i + 1}
                      </span>
                      <Badge
                        variant="secondary"
                        className="rounded-full bg-secondary text-secondary-foreground"
                      >
                        Tier {i + 1}
                      </Badge>
                    </div>
                    <h3 className="font-serif text-base font-semibold sm:text-xl text-foreground">
                      {tier.tier}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-snug sm:text-sm md:leading-relaxed">
                      {tier.description}
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============== MEMBERSHIP PLANS ============== */}
      <section className="bg-background py-5 sm:py-6 md:py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Monthly plans"
            title="Memberships that pay for themselves"
            description="Every plan drops service credits into your account each month and takes a flat percentage off everything else. Most members break even on their second visit."
          />

          <div className="mt-6 md:mt-10 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
            {membershipTiers.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 90}>
                <Card
                  className={cn(
                    "relative flex h-full flex-col overflow-hidden border-border/70 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
                    tier.popular && "ring-2 ring-primary"
                  )}
                >
                  {tier.popular && (
                    <div className="absolute right-0 top-0 rounded-bl-2xl bg-primary px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-primary-foreground">
                      Most popular
                    </div>
                  )}
                  <CardContent className="flex h-full flex-col p-3 sm:p-5 md:p-6">
                    <h3 className="font-serif text-base font-semibold sm:text-xl text-foreground md:text-2xl">
                      {tier.name}
                    </h3>
                    <p className="mt-1.5 text-xs text-muted-foreground leading-snug sm:text-sm md:leading-relaxed">
                      {tier.tagline}
                    </p>

                    <div className="mt-5 flex items-baseline gap-1">
                      <span className="font-serif text-lg font-bold text-foreground sm:text-2xl md:text-3xl">
                        ${tier.price}
                      </span>
                      <span className="text-sm font-medium text-muted-foreground">
                        /{tier.period}
                      </span>
                    </div>
                    {tier.annualPrice && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        or ${tier.annualPrice}/year — two months free
                      </p>
                    )}

                    <dl className="mt-5 space-y-2 rounded-2xl bg-secondary/40 p-4 text-sm">
                      {tier.credits && (
                        <div className="flex items-start justify-between gap-3">
                          <dt className="text-muted-foreground">Includes</dt>
                          <dd className="text-right font-medium text-foreground">
                            {tier.credits}
                          </dd>
                        </div>
                      )}
                      {tier.monthlyValue && (
                        <div className="flex items-start justify-between gap-3">
                          <dt className="text-muted-foreground">Typical value</dt>
                          <dd className="text-right font-medium text-primary">
                            ~${tier.monthlyValue}/month
                          </dd>
                        </div>
                      )}
                      {tier.bestFor && (
                        <div className="flex items-start justify-between gap-3">
                          <dt className="text-muted-foreground">Best for</dt>
                          <dd className="text-right font-medium text-foreground">
                            {tier.bestFor}
                          </dd>
                        </div>
                      )}
                    </dl>

                    <ul className="mt-5 flex flex-col gap-2.5">
                      {tier.benefits.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-1.5 text-[0.7rem] text-foreground/90 sm:gap-2 sm:text-sm"
                        >
                          <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-primary sm:h-4 sm:w-4" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <BookButton
                      className={cn(
                        "mt-6 w-full rounded-full px-5 text-sm shadow-sm",
                        tier.popular
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "border border-border bg-background text-foreground hover:bg-secondary"
                      )}
                    >
                      Join {tier.name}
                      <ArrowRight className="ml-1.5 h-4 w-4" />
                    </BookButton>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>

          {/* Plan fine print */}
          <Reveal delay={120} className="mt-8">
            <div className="rounded-2xl border border-border/70 bg-secondary/30 p-3 sm:p-5 md:p-6">
              <h3 className="font-serif text-sm font-semibold sm:text-lg text-foreground">
                How the plans work
              </h3>
              <ul className="mt-3 grid grid-cols-2 gap-2 sm:gap-2.5">
                {membershipTerms.map((term) => (
                  <li
                    key={term}
                    className="flex items-start gap-2 text-xs text-muted-foreground leading-snug sm:text-sm md:leading-relaxed"
                  >
                    <ShieldCheck className="mt-0.5 h-3 w-3 shrink-0 text-primary sm:h-4 sm:w-4" />
                    <span>{term}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/membership"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
              >
                Full membership details
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============== PREPAID SERIES ============== */}
      <section className="border-t border-border/60 bg-background py-5 sm:py-6 md:py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Prepaid series"
            title="Buy four, the fifth is on us"
            description="Not ready for a monthly plan? Prepay for a course of the same treatment and pay nothing for the last session. Credits last a full year and are transferable."
          />

          <div className="mt-6 md:mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {prepaidSeries.map((s, i) => (
              <Reveal key={s.slug} delay={i * 70}>
                <Card
                  className={cn(
                    "flex h-full flex-col border-border/70 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
                    s.popular && "ring-2 ring-primary"
                  )}
                >
                  <CardContent className="flex h-full flex-col p-3 sm:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-serif text-sm font-semibold sm:text-lg text-foreground">
                        {s.name}
                      </h3>
                      <Badge className="shrink-0 rounded-full bg-salon-gold px-1.5 py-0 text-[0.55rem] sm:px-2.5 sm:py-1 sm:text-[0.65rem] font-bold uppercase tracking-wide text-salon-espresso">
                        {s.sessions - s.paidSessions} free
                      </Badge>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground leading-snug sm:text-sm md:leading-relaxed">
                      {s.description}
                    </p>

                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="font-serif text-lg font-bold text-primary sm:text-2xl">
                        ${s.price}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        ${s.value}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {s.sessions} sessions · ${Math.round(s.price / s.sessions)}{" "}
                      each instead of ${s.sessionPrice} · valid {s.validFor}
                    </p>

                    <BookButton className="mt-5 w-full rounded-full border border-border bg-background px-5 text-sm text-foreground hover:bg-secondary">
                      Buy series
                    </BookButton>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============== PRICING NOTE ============== */}
      <section className="bg-background pb-10 sm:pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-2xl border border-dashed border-border bg-secondary/30 p-4 md:p-5 lg:p-6">
              <h3 className="font-serif text-base font-semibold sm:text-xl text-foreground">
                A note on pricing
              </h3>
              <p className="mt-3 text-xs text-muted-foreground leading-snug sm:text-sm md:leading-relaxed">
                Plan and series prices are based on a Junior stylist and
                standard hair length. What you pay for a single visit varies
                with hair length and density, the stylist seniority you select,
                and any add-ons chosen during your consultation — every service
                page lists its own starting price. Your stylist will always
                confirm the exact total before beginning any service.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
                <span className="font-medium uppercase tracking-[0.14em] text-foreground/70">
                  We accept
                </span>
                <span>Cash</span>
                <span aria-hidden="true">
                  &bull;
                </span>
                <span>All major cards</span>
                <span aria-hidden="true">
                  &bull;
                </span>
                <span>Apple Pay</span>
                <span aria-hidden="true">
                  &bull;
                </span>
                <span>Google Pay</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============== PACKAGES TEASER ============== */}
      <section className="border-t border-border/60 bg-blush py-5 sm:py-6 md:py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Save more"
            title="Bundle & save with packages"
            description="Our most popular services, thoughtfully bundled at member pricing — perfect for self-care or gifting."
          />

          <div className="mt-6 md:mt-10 grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3">
            {teaserPackages.map((p, i) => (
              <Reveal key={p.slug} delay={i * 90}>
                <Card className="group h-full overflow-hidden border-border/70 bg-card hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={getImage(p.imageKey, p.imageIndex)}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-foreground/10 to-transparent" />
                    {p.popular && (
                      <Badge className="absolute left-3 top-3 rounded-full bg-primary px-1.5 py-0 text-[0.55rem] sm:px-2.5 sm:py-1 sm:text-[0.65rem] font-semibold uppercase tracking-wide text-primary-foreground">
                        Most popular
                      </Badge>
                    )}
                    <Badge className="absolute right-3 top-3 rounded-full bg-salon-gold px-1.5 py-0 text-[0.55rem] sm:px-2.5 sm:py-1 sm:text-[0.65rem] font-bold uppercase tracking-wide text-salon-espresso">
                      Save {p.save}%
                    </Badge>
                  </div>
                  <CardContent className="flex flex-col gap-3 p-3 md:p-4 lg:p-5">
                    <h4 className="font-serif text-base font-semibold sm:text-xl text-foreground">
                      {p.name}
                    </h4>
                    <p className="line-clamp-2 text-xs text-muted-foreground sm:text-sm leading-snug md:leading-relaxed">
                      {p.description}
                    </p>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-sm text-muted-foreground line-through">
                        ${p.originalPrice}
                      </span>
                      <span className="font-serif font-bold text-primary text-base sm:text-lg md:text-xl lg:text-2xl">
                        ${p.price}
                      </span>
                      <Badge
                        variant="secondary"
                        className="ml-auto rounded-full bg-secondary text-secondary-foreground"
                      >
                        Save {p.save}%
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>

          <div className="mt-6 md:mt-10 flex justify-center">
            <Button
              asChild
              className="rounded-full bg-primary px-7 text-sm shadow-sm hover:bg-primary/90 hover:shadow-md"
            >
              <Link href="/packages">
                All packages
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
