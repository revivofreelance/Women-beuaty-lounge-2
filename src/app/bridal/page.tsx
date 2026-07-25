import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { packages, testimonials, stylists, services, salonInfo } from "@/lib/salon-data";
import { getImage } from "@/lib/salon-images";
import { BookButton } from "@/components/site/book-button";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { Stars } from "@/components/site/stars";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarHeart, CheckCircle2, ArrowRight, Heart, Sparkles, Camera,
  MapPin, Clock, Mail, Gem, Quote,
} from "lucide-react";

const processSteps = [
  { num: "01", title: "Consultation", description: "We meet to understand your wedding timeline, outfits, jewellery and the vision you have for your big day." },
  { num: "02", title: "Pre-bridal prep", description: "A month of skin and hair care — facials, hair spas and treatments that build your glow from within." },
  { num: "03", title: "Trial session", description: "A full trial 4–6 weeks before the wedding to finalise your look, so the day itself is calm and stress-free." },
  { num: "04", title: "Wedding day", description: "On-location artistry, skin prep, HD or airbrush makeup, hair styling and on-call touch-ups for 14+ hours." },
];

export const metadata: Metadata = {
  title: "Bridal Hair & Makeup",
  description:
    "Bridal hair, makeup and pre-wedding packages at Lumière Beauty Lounge, San Francisco. Trials, on-location artistry and party looks by certified bridal specialists.",
  alternates: { canonical: "/bridal" },
};

export default function BridalPage() {

  const bridalPackages = packages.filter(
    (p) =>
      p.name.toLowerCase().includes("bridal") ||
      p.name.toLowerCase().includes("pre-bridal")
  );
  const bridalServices = services.filter(
    (s) => s.category === "Bridal" || s.category === "Makeup"
  );
  const kavya = stylists.find((s) => s.slug === "kavya-reddy");

  const introStats = [
    { icon: Heart, value: "640+", label: "Brides styled" },
    { icon: Clock, value: "14 hrs", label: "Wear time" },
    { icon: MapPin, value: "On-location", label: "Across Bay Area" },
    { icon: Sparkles, value: "5.0", label: "Bridal rating", isStars: true },
  ];

  return (
    <div className="flex flex-col">
      {/* ============== HERO ============== */}
      <PageHero
        eyebrow="Bridal at Lumière"
        title="Your most beautiful day, beautifully you"
        description="Wedding-day artistry crafted to last tears, hugs and 14+ hours of celebration — with on-location service across the Bay Area, a pre-wedding trial, and a lead artist who has styled over 640 brides."
        imageKey="bridal"
        imageIndex={5}
      >
        {/* two-up on phone so the pair never stacks */}
        <div className="grid grid-cols-2 items-center gap-2 sm:flex sm:flex-wrap sm:gap-3">
          <BookButton service="bridal-makeup"
            size="lg"
            className="h-9 w-full rounded-full bg-primary px-2 text-[0.7rem] sm:h-11 sm:w-auto sm:px-7 sm:text-base shadow-lg shadow-primary/25 hover:bg-primary/90"
          >
            <CalendarHeart className="mr-1 h-3.5 w-3.5" /> Book bridal trial
          </BookButton>
          <Link href="/gallery" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="h-9 w-full rounded-full border-background/30 bg-background/10 px-2 text-[0.7rem] sm:h-11 sm:w-auto sm:px-7 sm:text-base text-background backdrop-blur-sm hover:bg-background/20 hover:text-background"
            >
              See bridal gallery <ArrowRight className="ml-1 h-3 w-3 sm:ml-2 sm:h-4 sm:w-4" />
            </Button>
          </Link>
        </div>
      </PageHero>

      {/* ============== INTRO STATS ============== */}
      <section className="bg-background py-5 sm:py-6 md:py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-2.5 sm:gap-6 lg:grid-cols-4">
            {introStats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 80} className="flex flex-col items-center text-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full sm:h-14 sm:w-14 bg-secondary text-primary">
                  <stat.icon className="h-4 w-4 sm:h-6 sm:w-6" />
                </span>
                {stat.isStars ? (
                  <Stars rating={5} size={14} className="mt-2 sm:mt-4" />
                ) : null}
                <span className="mt-1.5 font-serif font-bold leading-tight text-foreground text-sm sm:mt-3 sm:text-lg md:text-xl lg:text-2xl">
                  {stat.value}
                </span>
                <span className="mt-0.5 text-[0.65rem] leading-tight text-muted-foreground sm:mt-1 sm:text-sm">{stat.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============== BRIDAL SERVICES ============== */}
      <section className="bg-blush py-5 sm:py-6 md:py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Bridal services"
            title="Looks for every function"
            description="From your engagement to the wedding morning, each look is tailored to your outfit, your features and your story — and crafted to photograph beautifully."
          />
          <div className="mt-5 md:mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {bridalServices.map((s, i) => (
              <Reveal key={s.slug} delay={i * 80}>
                <Link href={`/services/${s.slug}`} className="group block h-full">
                  <Card className="h-full overflow-hidden border-border/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={getImage(s.imageKey, 0)}
                        alt={s.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
                      <Badge className="absolute left-1.5 top-1.5 px-1.5 py-0 text-[0.55rem] bg-background/90 text-foreground backdrop-blur-sm sm:left-3 sm:top-3 sm:px-2 sm:py-0.5 sm:text-xs">
                        {s.category}
                      </Badge>
                    </div>
                    <CardContent className="flex flex-1 flex-col gap-1 pt-0 sm:gap-2">
                      <h3 className="font-serif text-sm font-semibold sm:text-lg leading-snug text-foreground">
                        {s.name}
                      </h3>
                      <p className="line-clamp-2 text-xs text-muted-foreground sm:text-sm">
                        {s.shortDescription}
                      </p>
                      <p className="mt-auto text-[0.7rem] font-medium text-primary sm:text-sm">
                        from ${s.startingPrice}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============== PROCESS ============== */}
      <section className="bg-background py-5 sm:py-6 md:py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="The journey"
            title="Your bridal journey, step by step"
            description="A calm, considered process that begins months before your wedding — so the only thing you feel on the day is beautiful."
          />
          <div className="mt-5 md:mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <Reveal key={step.num} delay={i * 80}>
                <div className="relative h-full rounded-2xl border border-border/70 bg-secondary/30 p-2.5 sm:p-4 md:p-5 lg:p-6">
                  <span className="font-serif font-semibold text-primary/30 text-sm sm:text-lg md:text-xl lg:text-2xl">
                    {step.num}
                  </span>
                  <h3 className="mt-1.5 font-serif text-[0.8rem] font-semibold leading-tight text-foreground sm:mt-3 sm:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-[0.7rem] text-muted-foreground leading-snug sm:mt-2 sm:text-sm md:leading-relaxed">
                    {step.description}
                  </p>
                  {i < processSteps.length - 1 && (
                    <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-primary/40 lg:block" />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============== LEAD ARTIST ============== */}
      {kavya && (
        <section className="border-y border-border/60 bg-foreground text-background py-5 sm:py-6 md:py-10 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
              <Reveal className="relative mx-auto w-full max-w-sm">
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl">
                  <Image
                    src={getImage(kavya.imageKey, kavya.imageIndex)}
                    alt={kavya.name}
                    className="h-full w-full object-cover"
                    fill
                    sizes="(max-width: 640px) 100vw, 384px"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 rounded-2xl bg-salon-gold px-3 py-2 text-center shadow-xl sm:-bottom-5 sm:-right-5 sm:px-5 sm:py-3">
                  <p className="font-serif font-bold leading-tight text-foreground text-sm sm:text-lg md:text-xl lg:text-2xl">
                    {kavya.reviews}+
                  </p>
                  <p className="text-[0.55rem] font-medium uppercase tracking-wider text-foreground/80 sm:text-xs">
                    Brides styled
                  </p>
                </div>
              </Reveal>

              <Reveal delay={120}>
                <Badge className="bg-salon-gold text-foreground">Lead bridal artist</Badge>
                <h2 className="mt-2.5 font-serif font-semibold leading-tight text-base sm:mt-4 sm:text-xl md:text-2xl lg:text-3xl">
                  {kavya.name}
                </h2>
                <p className="mt-0.5 text-[0.7rem] text-background/70 sm:text-sm">{kavya.position}</p>
                <Stars rating={kavya.rating} size={14} className="mt-2 sm:mt-3" />
                <p className="mt-2.5 text-pretty text-xs text-background/80 leading-snug sm:mt-5 sm:text-base md:leading-relaxed">
                  {kavya.longBio}
                </p>
                <div className="mt-3 flex flex-wrap gap-1 sm:mt-6 sm:gap-2">
                  {kavya.expertise.map((e) => (
                    <Badge
                      key={e}
                      variant="outline"
                      className="border-background/30 px-1.5 py-0 text-[0.6rem] text-background/85 sm:px-2 sm:py-0.5 sm:text-xs"
                    >
                      {e}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2 sm:mt-7 sm:gap-3">
                  <BookButton stylist={kavya.slug} service="bridal-makeup"
                    className="h-8 rounded-full bg-background px-3 text-xs text-foreground hover:bg-background/90 sm:h-9 sm:px-6 sm:text-sm"
                  >
                    <CalendarHeart className="mr-2 h-4 w-4" /> Book with {kavya.name.split(" ")[0]}
                  </BookButton>
                  <Link href={`/team/${kavya.slug}`}>
                    <Button
                      variant="outline"
                      className="h-8 rounded-full border-background/30 bg-transparent px-3 text-xs text-background hover:bg-background/10 hover:text-background sm:h-9 sm:px-6 sm:text-sm"
                    >
                      View profile <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ============== BRIDAL PACKAGES ============== */}
      <section className="bg-background py-5 sm:py-6 md:py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Bridal packages"
            title="Complete bridal bundles"
            description="Curated bundles that bring prep, trial and wedding-day artistry together — with savings and on-location service included."
          />
          <div className="mt-5 md:mt-12 grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-2">
            {bridalPackages.map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <Card className="flex h-full flex-col overflow-hidden border-border/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={getImage(p.imageKey, p.imageIndex)}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/40 to-transparent" />
                    {/* one badge stack — badges and the title can never collide */}
                    <div className="absolute left-1.5 top-1.5 flex flex-col items-start gap-1 sm:left-4 sm:top-4 sm:flex-row sm:flex-wrap sm:gap-2">
                      {p.popular && (
                        <Badge className="bg-salon-gold px-1.5 py-0 text-[0.55rem] text-foreground sm:px-2 sm:py-0.5 sm:text-xs">Most popular</Badge>
                      )}
                      <Badge className="bg-primary px-1.5 py-0 text-[0.55rem] text-primary-foreground sm:px-2 sm:py-0.5 sm:text-xs">Save {p.save}%</Badge>
                    </div>
                  </div>
                  <CardContent className="flex flex-1 flex-col gap-2 sm:gap-4">
                    <h3 className="font-serif font-semibold leading-tight text-foreground text-[0.8rem] sm:text-lg md:text-xl lg:text-2xl">
                      {p.name}
                    </h3>
                    <p className="line-clamp-2 text-[0.7rem] text-muted-foreground leading-snug sm:line-clamp-none sm:text-sm md:leading-relaxed">{p.description}</p>
                    <ul className="space-y-1 sm:space-y-2">
                      {p.services.map((svc) => (
                        <li key={svc} className="flex items-start gap-1.5 text-[0.7rem] text-foreground/85 sm:gap-2 sm:text-sm">
                          <CheckCircle2 className="mt-0.5 h-3 w-3 flex-shrink-0 text-primary sm:h-4 sm:w-4" />
                          <span className="line-clamp-1 sm:line-clamp-none">{svc}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex flex-col items-stretch gap-2 border-t border-border/60 pt-2.5 sm:flex-row sm:items-end sm:justify-between sm:pt-4">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-[0.7rem] text-muted-foreground line-through sm:text-sm">
                          ${p.originalPrice}
                        </span>
                        <span className="font-serif font-semibold text-primary text-sm sm:text-xl md:text-2xl lg:text-3xl">
                          ${p.price}
                        </span>
                      </div>
                      <BookButton service={p.slug}
                        className="h-8 w-full rounded-full bg-primary px-3 text-xs hover:bg-primary/90 sm:h-9 sm:w-auto sm:px-5 sm:text-sm"
                      >
                        Enquire <ArrowRight className="ml-1.5 h-3 w-3 sm:h-4 sm:w-4" />
                      </BookButton>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============== TESTIMONIALS ============== */}
      <section className="bg-blush py-5 sm:py-6 md:py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Bride stories"
            title="Loved by our brides"
            description="Real words from real weddings — the moments that make everything we do worth it."
          />
          <div className="mt-5 md:mt-12 grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3">
            {testimonials.slice(0, 3).map((t, i) => (
              <Reveal key={t.id} delay={i * 90}>
                <Card className="h-full border-border/70 bg-card">
                  <CardContent className="flex h-full flex-col gap-2 sm:gap-4">
                    <Quote className="h-5 w-5 text-salon-gold sm:h-8 sm:w-8" />
                    <p className="line-clamp-5 flex-1 text-pretty text-[0.7rem] text-foreground/85 leading-snug sm:line-clamp-none sm:text-sm md:leading-relaxed">
                      “{t.text}”
                    </p>
                    <div className="mt-1 flex items-center gap-2 border-t border-border/60 pt-2 sm:mt-2 sm:gap-3 sm:pt-4">
                      <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full ring-2 ring-secondary sm:h-11 sm:w-11">
                        <Image
                          src={getImage(t.imageKey, t.imageIndex)}
                          alt={t.name}
                          className="h-full w-full object-cover"
                          fill
                          sizes="44px"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[0.7rem] font-semibold text-foreground sm:text-sm">{t.name}</p>
                        <p className="truncate text-[0.6rem] text-muted-foreground sm:text-xs">{t.service}</p>
                      </div>
                      <Stars rating={t.rating} size={14} />
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============== FINAL CTA ============== */}
      <section className="relative isolate overflow-hidden bg-primary text-primary-foreground py-5 sm:py-8 md:py-12 lg:py-20">
        <div className="absolute inset-0 -z-10">
          <Image
            src={getImage("bridal2", 1)}
            alt=""
            className="h-full w-full object-cover opacity-15"
            fill
            sizes="100vw"
          />
        </div>
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal className="flex flex-col items-center gap-2.5 sm:gap-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-full sm:h-14 sm:w-14 bg-background/15 text-salon-gold ring-1 ring-background/20">
              <Gem className="h-5 w-5 sm:h-7 sm:w-7" />
            </span>
            <h2 className="font-serif font-semibold leading-tight text-lg sm:text-xl md:text-2xl lg:text-3xl">
              Let&apos;s plan your wedding-day look
            </h2>
            <p className="max-w-xl text-pretty text-xs text-primary-foreground/85 sm:text-lg leading-snug md:leading-relaxed">
              From the first consultation to your final touch-up, our bridal team is here to make your wedding morning calm, joyful and unforgettable. Book a trial with Kavya and begin your journey.
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
              <BookButton service="bridal-makeup" stylist="kavya-reddy"
                size="lg"
                className="h-9 rounded-full bg-background px-4 text-xs text-primary shadow-lg hover:bg-background/90 sm:h-11 sm:px-7 sm:text-base"
              >
                <CalendarHeart className="mr-1.5 h-4 w-4" /> Book bridal trial
              </BookButton>
              <Link href={`mailto:${salonInfo.bookingEmail}`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-9 rounded-full border-background/30 bg-transparent px-4 text-xs text-primary-foreground hover:bg-background/10 hover:text-primary-foreground sm:h-11 sm:px-7 sm:text-base"
                >
                  <Mail className="mr-1.5 h-4 w-4" /> Email us
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
