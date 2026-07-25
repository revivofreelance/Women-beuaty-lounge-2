import type { Metadata } from "next";
import { membershipTiers } from "@/lib/salon-data";
import { BookButton } from "@/components/site/book-button";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  Crown,
  Sparkles,
  ArrowRight,
  CalendarHeart,
  ShieldCheck,
} from "lucide-react";

const memberLove = [
  {
    icon: Sparkles,
    title: "Consistent glow",
    desc: "Monthly facials, hair spas and touch-ups keep you looking your best — no more boom-and-bust beauty cycles.",
  },
  {
    icon: ShieldCheck,
    title: "No lock-in",
    desc: "Cancel anytime, no questions asked. Pause your membership when life gets busy and pick up where you left off.",
  },
  {
    icon: CalendarHeart,
    title: "Priority everything",
    desc: "Jump the queue on bookings, get first access to new services and reserve weekend prime slots before anyone else.",
  },
];

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Lumière Beauty Lounge membership plans — monthly salon and spa credits, member pricing and priority booking in Hayes Valley, San Francisco.",
  alternates: { canonical: "/membership" },
};

export default function MembershipPage() {

  return (
    <div className="flex flex-col">
      <PageHero
        eyebrow="Lumière membership"
        title="Beauty that pays you back"
        description="Up to 35% off every service, complimentary monthly treatments, priority booking and member-only perks. Cancel anytime — no lock-in, no surprises."
        imageKey="ambiance"
        imageIndex={2}
      >
        <BookButton
          className="rounded-full bg-primary px-6 text-sm shadow-sm hover:bg-primary/90 hover:shadow-md"
        >
          <CalendarHeart className="mr-1.5 h-4 w-4" />
          Join now
        </BookButton>
      </PageHero>

      {/* ============== TIERS GRID ============== */}
      <section className="bg-background py-6 md:py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {membershipTiers.map((tier, i) => {
              const isElite = tier.name.toLowerCase().includes("é");
              const isPopular = Boolean(tier.popular);
              const Icon = isElite ? Crown : Sparkles;
              return (
                <Reveal key={tier.name} delay={i * 90}>
                  <Card
                    className={cn(
                      "group relative h-full overflow-hidden border-border/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
                      isPopular && "ring-2 ring-primary"
                    )}
                  >
                    {isPopular && (
                      <div className="absolute right-0 top-0 z-10">
                        <div className="rounded-bl-2xl bg-primary px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-primary-foreground shadow-sm">
                          Most popular
                        </div>
                      </div>
                    )}
                    <CardContent className="flex h-full flex-col p-7">
                      {/* Icon + name */}
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "flex h-12 w-12 items-center justify-center rounded-full",
                            isElite
                              ? "bg-salon-gold text-salon-espresso"
                              : "bg-secondary text-primary"
                          )}
                        >
                          <Icon className="h-6 w-6" />
                        </span>
                        <h3 className="font-serif font-semibold tracking-tight text-foreground text-lg md:text-xl lg:text-2xl">
                          {tier.name}
                        </h3>
                      </div>

                      <p className="mt-3 text-sm text-muted-foreground leading-snug md:leading-relaxed">
                        {tier.tagline}
                      </p>

                      {/* Price */}
                      <div className="mt-5 flex items-baseline gap-1">
                        <span className="font-serif font-bold text-foreground text-lg md:text-xl lg:text-2xl">
                          ${tier.price}
                        </span>
                        <span className="text-sm font-medium text-muted-foreground">
                          /{tier.period}
                        </span>
                      </div>

                      {/* CTA */}
                      <BookButton
                        className={cn(
                          "mt-5 w-full rounded-full px-5 text-sm shadow-sm",
                          isPopular
                            ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md"
                            : "border border-border bg-background text-foreground hover:bg-secondary"
                        )}
                      >
                        Choose {tier.name}
                        <ArrowRight className="ml-1.5 h-4 w-4" />
                      </BookButton>

                      {/* Benefits */}
                      <ul className="mt-6 flex flex-col gap-2.5 border-t border-border/60 pt-5">
                        {tier.benefits.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-2 text-sm text-foreground/90"
                          >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============== WHY MEMBERS LOVE LUMIÈRE ============== */}
      <section className="bg-background pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-3xl bg-secondary/40 p-4 md:p-6 lg:p-8">
              <SectionHeading
                eyebrow="Member love"
                title="Why members love Lumière"
                description="Membership isn't just about discounts — it's a year-round beauty ritual designed around you."
              />
              <div className="mt-6 md:mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
                {memberLove.map((item, i) => (
                  <Reveal key={item.title} delay={i * 90}>
                    <div className="flex h-full flex-col gap-3 rounded-2xl bg-background p-3 md:p-4 lg:p-5">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-primary">
                        <item.icon className="h-5 w-5" />
                      </span>
                      <h4 className="font-serif text-lg font-semibold text-foreground">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-snug md:leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============== CONSULT CTA ============== */}
      <section className="bg-background pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col items-start gap-6 rounded-3xl bg-foreground text-background md:flex-row md:items-center md:justify-between p-4 md:p-6 lg:p-8">
              <div>
                <h2 className="font-serif font-semibold tracking-tight text-background text-lg md:text-xl lg:text-2xl">
                  Not sure which plan?
                </h2>
                <p className="mt-2 max-w-xl text-sm text-background/80 leading-snug md:leading-relaxed">
                  Book a complimentary 15-minute consult and our front-desk team
                  will help you pick the tier that matches your beauty routine,
                  goals and budget.
                </p>
              </div>
              <BookButton
                className="shrink-0 rounded-full bg-background px-7 text-sm font-semibold text-foreground shadow-sm hover:bg-background/90 hover:shadow-md"
              >
                <CalendarHeart className="mr-1.5 h-4 w-4" />
                Book a consult
              </BookButton>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
