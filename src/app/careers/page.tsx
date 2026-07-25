import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { careers, salonInfo } from "@/lib/salon-data";
import { getImage } from "@/lib/salon-images";
import { BookButton } from "@/components/site/book-button";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Heart,
  Sparkles,
  GraduationCap,
  Send,
  CheckCircle2,
} from "lucide-react";

interface Perk {
  icon: typeof GraduationCap;
  title: string;
  description: string;
}

const perks: Perk[] = [
  {
    icon: GraduationCap,
    title: "Continuous training",
    description:
      "Quarterly masterclasses with L'Oréal, Wella and Kérastase educators, plus sponsored trips to industry events.",
  },
  {
    icon: Heart,
    title: "Real work-life balance",
    description:
      "Five-day weeks, set schedules, paid time off and no late-night closing shifts back-to-back.",
  },
  {
    icon: Sparkles,
    title: "Best commission in town",
    description:
      "A tiered commission structure that rewards seniority, repeat clients and retail — transparently paid monthly.",
  },
  {
    icon: CheckCircle2,
    title: "Health & wellness",
    description:
      "Full medical, dental and vision coverage, plus complimentary monthly treatments and access to our spa suite.",
  },
];

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the Lumière Beauty Lounge team in Hayes Valley, San Francisco. Open roles for stylists, colourists, estheticians and front-of-house.",
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {

  return (
    <div className="flex flex-col">
      <PageHero
        eyebrow="Careers"
        title="Build your craft with us"
        description="Lumière is where certified stylists, colourists, therapists and artists grow. We invest in your training, pay the city's best commission and create space for work you'll be proud of."
        imageKey="team"
        imageIndex={1}
      />

      {/* WHY WORK WITH US */}
      <section className="bg-background py-6 md:py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why Lumière"
            title="A place to grow"
            description="We're a small, tight-knit team that treats every artist like family. Here's what you can count on when you join us."
          />
          <div className="mt-6 md:mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map((p, i) => (
              <Reveal key={p.title} delay={i * 70}>
                <Card className="h-full border-border/70 shadow-sm transition-shadow hover:shadow-md p-4 md:p-5 lg:p-6">
                  <CardContent className="flex h-full flex-col gap-4 p-0">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <p.icon className="h-6 w-6" />
                    </span>
                    <div className="flex flex-col gap-2">
                      <h3 className="font-serif text-lg font-semibold text-foreground">
                        {p.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-snug md:leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OPEN ROLES */}
      <section className="bg-blush py-6 md:py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Open positions"
            title="Current openings"
            description="If one of these feels like a fit, send us your portfolio and a short note. We review every application personally."
          />
          <div className="mx-auto mt-6 md:mt-10 flex max-w-4xl flex-col gap-4">
            {careers.map((r, i) => (
              <Reveal key={r.title} delay={i * 50}>
                <Card className="border-border/70 shadow-sm transition-shadow hover:shadow-md p-4 md:p-5 lg:p-6">
                  <CardContent className="flex flex-col gap-5 p-0 md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-serif text-xl font-semibold text-foreground">
                          {r.title}
                        </h3>
                        <Badge
                          variant="secondary"
                          className="rounded-full text-xs font-semibold uppercase tracking-wide"
                        >
                          {r.type}
                        </Badge>
                      </div>
                      <p className="mt-2 max-w-2xl text-sm text-muted-foreground leading-snug md:leading-relaxed">
                        {r.description}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-primary" />
                          {r.location}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Briefcase className="h-3.5 w-3.5 text-primary" />
                          {r.experience}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-primary" />
                          {r.type}
                        </span>
                      </div>
                    </div>
                    <div className="md:ml-6 md:shrink-0">
                      <Button
                        asChild
                        className="w-full rounded-full bg-primary px-6 text-sm transition-colors hover:bg-primary/90 md:w-auto"
                      >
                        <a
                          href={`mailto:${salonInfo.email}?subject=Application: ${encodeURIComponent(r.title)}`}
                        >
                          Apply
                          <Send className="ml-1.5 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>

          {/* GENERAL APPLICATION */}
          <Reveal delay={120}>
            <section className="mt-6 md:mt-10 flex flex-col gap-6 rounded-3xl bg-foreground text-background md:flex-row md:items-center md:justify-between p-4 md:p-6 lg:p-8">
              <div className="flex flex-1 flex-col gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-salon-gold text-foreground">
                  <Heart className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="font-serif font-semibold text-lg md:text-xl lg:text-2xl">
                    Don&apos;t see your role?
                  </h2>
                  <p className="mt-2 max-w-xl text-pretty text-sm text-background/80 sm:text-base leading-snug md:leading-relaxed">
                    We&apos;re always looking for kind, talented artists. Send
                    us your portfolio and tell us how you&apos;d love to
                    contribute — we read every application.
                  </p>
                </div>
              </div>
              <div className="md:ml-6 md:shrink-0">
                <Button
                  asChild
                  className="w-full rounded-full bg-background px-6 text-sm text-foreground transition-colors hover:bg-background/90 md:w-auto"
                >
                  <a
                    href={`mailto:${salonInfo.email}?subject=General application`}
                  >
                    Get in touch
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </section>
          </Reveal>
        </div>
      </section>

      {/* VISIT / TOUR CTA */}
      <section className="bg-background py-6 md:py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm md:grid-cols-2 md:items-center p-4 md:p-5 lg:p-6 gap-4 md:gap-6 lg:gap-8">
              <div className="order-2 md:order-1">
                <SectionHeading
                  eyebrow="Visit Lumière"
                  title="Come see us in person"
                  description="Book a tour of the salon, meet the team and feel the space. Tours take about 20 minutes — coffee's on us."
                  align="left"
                />
                <div className="mt-6 flex flex-wrap gap-3">
                  <BookButton
                    className="rounded-full bg-primary px-6 text-sm transition-colors hover:bg-primary/90"
                  >
                    Book a tour
                  </BookButton>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full px-6 text-sm"
                  >
                    <Link href="/team">
                      Meet the team
                      <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="order-1 overflow-hidden rounded-2xl md:order-2">
                <Image
                  src={getImage("salonInterior2", 3)}
                  alt="Inside Lumière Beauty Lounge"
                  className="h-48 md:h-64 w-full object-cover sm:h-72"
                  width={800}
                  height={600}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
