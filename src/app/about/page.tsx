import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import {
  salonInfo, salonValues, salonTimeline, certifications, awards,
  brandsUsed, stylists, sustainabilityInitiatives, communityWork,
} from "@/lib/salon-data";
import { getImage } from "@/lib/salon-images";
import { BookButton } from "@/components/site/book-button";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart, ShieldCheck, Sparkles, Leaf, Award, Target, Eye, Quote,
  ArrowRight, CalendarHeart, Users, CheckCircle2, HandHeart, Star, Recycle,
} from "lucide-react";

const valueIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  heart: Heart,
  shield: ShieldCheck,
  sparkles: Sparkles,
  award: Award,
};

const hygienePoints = [
  { icon: ShieldCheck, title: "UV-sterilised tools", description: "Every metal tool is sanitised and sterilised in a clinical UV chamber between clients." },
  { icon: Leaf, title: "Single-use applicators", description: "Mascara wands, lip brushes and applicators are single-use only — never double-dipped." },
  { icon: Sparkles, title: "90°C-laundered towels", description: "All towels, capes and linens are laundered at 90°C and stored sealed until use." },
  { icon: HandHeart, title: "Gloved therapists", description: "Therapists wear fresh gloves for every waxing, facial and nail service." },
  { icon: CheckCircle2, title: "Sealed products", description: "Products are dispensed from sealed, single-use pumps — no shared jars or pots." },
  { icon: Heart, title: "Daily deep clean", description: "The salon is deep-cleaned every morning and evening, with high-touch surfaces sanitised hourly." },
];

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the team behind Lumière Beauty Lounge — a Hayes Valley, San Francisco salon serving expert hair, skin, bridal and spa care since 2014.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const founder = stylists[0];

  const stats = [
    { icon: Star, value: `${salonInfo.stats.years}`, label: "Years" },
    { icon: Users, value: salonInfo.stats.clients, label: "Happy clients" },
    { icon: Sparkles, value: `${salonInfo.stats.stylists}`, label: "Expert stylists" },
    { icon: Heart, value: `${salonInfo.stats.rating}`, label: "Average rating" },
  ];

  return (
    <div className="flex flex-col">
      {/* ============== HERO ============== */}
      <PageHero
        eyebrow="Our story"
        title="Beauty with a beating heart"
        description={`Founded in ${salonInfo.established} in the heart of Hayes Valley, Lumière began with a single chair and a simple belief — listen first, then style. Eleven years on, that philosophy still shapes every appointment.`}
        imageKey="salonInterior2"
        imageIndex={1}
      >
        <div className="flex flex-wrap items-center gap-3">
          <BookButton
            size="lg"
            className="rounded-full bg-primary px-7 text-base shadow-lg shadow-primary/25 hover:bg-primary/90"
          >
            <CalendarHeart className="mr-2 h-5 w-5" /> Visit us
          </BookButton>
          <Link href="/team">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-background/30 bg-background/10 px-7 text-base text-background backdrop-blur-sm hover:bg-background/20 hover:text-background"
            >
              Meet the team <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </PageHero>

      {/* ============== STATS ============== */}
      <section className="bg-background py-6 md:py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 80} className="flex flex-col items-center text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-primary">
                  <stat.icon className="h-6 w-6" />
                </span>
                <span className="mt-3 font-serif font-bold text-foreground text-lg md:text-xl lg:text-2xl">
                  {stat.value}
                </span>
                <span className="mt-1 text-sm text-muted-foreground">{stat.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============== STORY + IMAGE ============== */}
      <section className="bg-blush py-6 md:py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
            <Reveal className="grid grid-cols-2 gap-4">
              <div className="rounded-arch relative aspect-[3/4] overflow-hidden shadow-lg">
                <Image
                  src={getImage("hero", 1)}
                  alt="Lumière salon interior"
                  className="h-full w-full object-cover"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-lg mt-6 md:mt-10">
                <Image
                  src={getImage("ambiance", 1)}
                  alt="Salon ambiance"
                  className="h-full w-full object-cover"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </Reveal>

            <Reveal delay={120}>
              <SectionHeading
                align="left"
                eyebrow="How it began"
                title="From a single chair to a beloved lounge"
              />
              <div className="mt-6 space-y-4 text-pretty text-muted-foreground leading-snug md:leading-relaxed">
                <p>
                  In {salonInfo.established}, Ananya Rao returned to San Francisco after a decade training with Vidal Sassoon in London, and opened Lumière with three chairs, a borrowed kettle and a notebook full of names. The first client walked in on day one — by month six, every chair was booked.
                </p>
                <p>
                  Over the next decade, Lumière grew into a full beauty lounge — adding colour, skin, spa, nails and a bridal division that has styled over {salonInfo.stats.brides} brides. We moved to our flagship Hayes Valley location on {salonInfo.address.line1}, expanded the team to {salonInfo.stats.stylists} certified stylists, and earned a reputation for honest advice, premium products and an unwavering commitment to hygiene.
                </p>
                <p>
                  Today, Lumière is one of San Francisco&apos;s most-loved women&apos;s salons — but we still take the same care with every appointment that Ananya took on day one. We listen. We consult. We never oversell. And we treat every client like the only one in the room.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============== MISSION & VISION ============== */}
      <section className="bg-background py-6 md:py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <Card className="h-full border-border/70 p-7">
                <CardContent className="flex h-full flex-col gap-4 p-0">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-primary">
                    <Target className="h-6 w-6" />
                  </span>
                  <h3 className="font-serif font-semibold text-foreground text-lg md:text-xl lg:text-2xl">Our mission</h3>
                  <p className="text-pretty text-muted-foreground leading-snug md:leading-relaxed">
                    To make expert beauty care accessible, transparent and genuinely caring — so every client leaves feeling more like herself, not less.
                  </p>
                </CardContent>
              </Card>
            </Reveal>
            <Reveal delay={120}>
              <Card className="h-full border-border/70 p-7">
                <CardContent className="flex h-full flex-col gap-4 p-0">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-primary">
                    <Eye className="h-6 w-6" />
                  </span>
                  <h3 className="font-serif font-semibold text-foreground text-lg md:text-xl lg:text-2xl">Our vision</h3>
                  <p className="text-pretty text-muted-foreground leading-snug md:leading-relaxed">
                    To be San Francisco&apos;s most trusted salon — known for our craft, our care, and the calm, hygienic space we offer every client who walks through our doors.
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============== VALUES ============== */}
      <section className="bg-blush py-6 md:py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What we stand for"
            title="Our core values"
            description="Four principles that shape every consultation, every service and every interaction at Lumière."
          />
          <div className="mt-8 md:mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {salonValues.map((v, i) => {
              const Icon = valueIcons[v.icon] ?? Heart;
              return (
                <Reveal key={v.title} delay={i * 80}>
                  <Card className="h-full border-border/70 p-4 md:p-5 lg:p-6">
                    <CardContent className="flex h-full flex-col gap-4 p-0">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-primary">
                        <Icon className="h-6 w-6" />
                      </span>
                      <h3 className="font-serif text-lg font-semibold text-foreground">{v.title}</h3>
                      <p className="text-sm text-muted-foreground leading-snug md:leading-relaxed">{v.description}</p>
                    </CardContent>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============== TIMELINE ============== */}
      <section className="bg-background py-6 md:py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our journey"
            title="Eleven years of Lumière"
            description="A few of the moments that have shaped us, from a single chair to a beloved Hayes Valley lounge."
          />
          <div className="mt-8 md:mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {salonTimeline.map((entry, i) => (
              <Reveal key={entry.year} delay={i * 70}>
                <Card className="h-full border-border/70 p-4 md:p-5 lg:p-6">
                  <CardContent className="flex h-full flex-col gap-2 p-0">
                    <span className="font-serif font-semibold text-primary text-lg md:text-xl lg:text-2xl">{entry.year}</span>
                    <h3 className="font-serif text-lg font-semibold text-foreground">{entry.title}</h3>
                    <p className="text-sm text-muted-foreground leading-snug md:leading-relaxed">{entry.description}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============== FOUNDER'S MESSAGE ============== */}
      {founder && (
        <section className="bg-foreground text-background py-6 md:py-10 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
              <Reveal className="mx-auto w-full max-w-xs">
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl">
                  <Image
                    src={getImage(founder.imageKey, founder.imageIndex)}
                    alt={founder.name}
                    className="h-full w-full object-cover"
                    fill
                    sizes="(max-width: 640px) 100vw, 320px"
                  />
                </div>
              </Reveal>
              <Reveal delay={120} className="lg:col-span-2">
                <Quote className="h-10 w-10 text-salon-gold" />
                <blockquote className="mt-5 font-serif font-medium leading-snug text-lg md:text-xl lg:text-2xl">
                  “Beauty isn&apos;t about trends or transformations — it&apos;s about listening. Every great cut, every flawless colour, every radiant bride begins with a conversation. We listen first. Then we craft the kind of standard our clients come back for, year after year.”
                </blockquote>
                <div className="mt-6 flex flex-col gap-1">
                  <p className="font-serif text-lg font-semibold">{founder.name}</p>
                  <p className="text-sm text-background/70">{founder.position} · Founder, Lumière Beauty Lounge</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ============== CERTIFICATIONS & AWARDS ============== */}
      <section className="bg-background py-6 md:py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
            <Reveal>
              <h2 className="font-serif font-semibold text-foreground text-lg md:text-xl lg:text-2xl">Certifications</h2>
              <ul className="mt-6 space-y-3">
                {certifications.map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-foreground/85">{c}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-serif font-semibold text-foreground text-lg md:text-xl lg:text-2xl">Awards &amp; press</h2>
              <ul className="mt-6 space-y-3">
                {awards.map((a) => (
                  <li key={a.title} className="flex items-start gap-3">
                    <Award className="mt-0.5 h-5 w-5 flex-shrink-0 text-salon-gold" />
                    <span className="text-foreground/85">
                      <span className="font-semibold text-foreground">{a.year}</span> — {a.title}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============== BRANDS ============== */}
      <section className="bg-blush py-6 md:py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Premium products"
            title="Brands we trust"
            description="We work only with professional, salon-grade products chosen for their results, safety and ethical standards."
          />
          <Reveal className="mt-6 md:mt-10 flex flex-wrap justify-center gap-3">
            {brandsUsed.map((brand) => (
              <span
                key={brand}
                className="rounded-full border border-border/70 bg-card px-5 py-2.5 font-serif text-lg text-foreground shadow-sm"
              >
                {brand}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ============== HYGIENE ============== */}
      <section className="bg-background py-6 md:py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Non-negotiable"
            title="Hygiene standards"
            description="Your safety is the one thing we never compromise on. Here is what that looks like in practice, every single day."
          />
          <div className="mt-8 md:mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {hygienePoints.map((h, i) => (
              <Reveal key={h.title} delay={i * 70}>
                <Card className="h-full border-border/70 p-3 md:p-4 lg:p-5">
                  <CardContent className="flex h-full flex-col gap-3 p-0">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-primary">
                      <h.icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-serif text-base font-semibold text-foreground">{h.title}</h3>
                    <p className="text-sm text-muted-foreground leading-snug md:leading-relaxed">{h.description}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============== SUSTAINABILITY ============== */}
      <section className="bg-blush py-6 md:py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Gentle on the planet"
            title="Our sustainability commitments"
            description="Beauty should never come at the planet&apos;s expense. Here&apos;s how we lighten our footprint, one small step at a time."
          />
          <div className="mt-8 md:mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {sustainabilityInitiatives.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <Card className="h-full border-border/70 p-4 md:p-5 lg:p-6">
                  <CardContent className="flex h-full flex-col gap-3 p-0">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-primary">
                      <Recycle className="h-5 w-5" />
                    </span>
                    <h3 className="font-serif text-base font-semibold text-foreground">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-snug md:leading-relaxed">{s.description}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============== COMMUNITY ============== */}
      <section className="bg-background text-center py-6 md:py-10 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col items-center gap-5">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-primary">
              <HandHeart className="h-7 w-7" />
            </span>
            <h2 className="font-serif font-semibold text-foreground text-xl md:text-2xl lg:text-3xl">
              Giving back to San Francisco
            </h2>
            <p className="text-pretty text-muted-foreground leading-snug md:leading-relaxed">
              We partner with local women&apos;s shelters, fund vocational training for women re-entering the workforce, mentor cosmetology students, and host monthly free haircut days for seniors and those experiencing financial hardship. A portion of every bridal package funds this work.
            </p>
            <div className="mt-2 grid w-full gap-4 text-left sm:grid-cols-2">
              {communityWork.map((c) => (
                <div key={c.title} className="rounded-2xl border border-border/70 bg-card p-3 md:p-4 lg:p-5">
                  <h3 className="font-serif text-base font-semibold text-foreground">{c.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-snug md:leading-relaxed">{c.description}</p>
                </div>
              ))}
            </div>
            <Link href="/contact">
              <Button className="mt-4 rounded-full bg-primary px-6 hover:bg-primary/90">
                Learn about our community work <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
