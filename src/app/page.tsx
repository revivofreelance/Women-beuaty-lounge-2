import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { BookButton } from "@/components/site/book-button";
import { services, stylists, packages, offers, faqs, salonInfo, beforeAfter, blogPosts, brandsUsed } from "@/lib/salon-data";
import { getImage } from "@/lib/salon-images";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Stars } from "@/components/site/stars";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { BeforeAfterSlider } from "@/components/site/before-after-slider";
import { RotatingHeadline } from "@/components/site/rotating-headline";
import { LiveTicker } from "@/components/site/live-ticker";
import { FloatingServiceChips } from "@/components/site/floating-service-chips";
import { CategoryExplorer } from "@/components/site/category-explorer";
import { HeroSlideshow } from "@/components/site/hero-slideshow";
import { MarqueeRibbon } from "@/components/site/marquee-ribbon";
import { StatCounter } from "@/components/site/stat-counter";
import { TestimonialMarquee } from "@/components/site/testimonial-marquee";
import { GlowFinder } from "@/components/site/glow-finder";
import { cn } from "@/lib/utils";
import {
  CalendarHeart, Mail, MapPin, Clock, ArrowRight, Sparkles,
  Heart, ShieldCheck, Leaf, Award, Users, CheckCircle2,
  ArrowUpRight, Wand2, Instagram, Scissors, Star,
} from "lucide-react";

export const metadata: Metadata = {
  // absolute: skip the "%s — Lumière Lounge" template on the landing page.
  title: {
    absolute: "Lumière Beauty Lounge — Women's Salon & Spa in San Francisco",
  },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const popularServices = services.filter((s) => s.popular).slice(0, 6);
  const featuredStylists = stylists.slice(0, 4);
  const featuredPackages = packages.filter((p) => p.popular).concat(packages.filter((p) => !p.popular)).slice(0, 3);
  const featuredOffers = offers.slice(0, 3);
  const instagramShots = [
    getImage("galleryHaircut", 0), getImage("galleryColor", 1), getImage("galleryBridal", 0),
    getImage("galleryMakeup", 0), getImage("galleryNails", 0), getImage("galleryUpdo", 0),
  ];

  return (
    <div className="flex flex-col">
      {/* ============== HERO ============== */}
      <section className="relative isolate overflow-hidden">
        <HeroSlideshow
          images={[getImage("hero", 0), getImage("hero", 4), getImage("hero", 5)]}
          alt="Lumière Beauty Lounge salon interior"
        />

        <div className="mx-auto flex min-h-[62vh] sm:min-h-[75vh] md:min-h-[88vh] max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8 lg:min-h-[92vh] py-5 sm:py-6 md:py-10 lg:py-12">
          <div className="max-w-2xl">
            <Reveal>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-background/15 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-background backdrop-blur-sm ring-1 ring-background/20 sm:gap-2 sm:px-4 sm:py-1.5 sm:text-xs sm:tracking-[0.18em]">
                <Sparkles className="h-3 w-3 text-salon-gold sm:h-3.5 sm:w-3.5" />
                San Francisco's home for beauty since {salonInfo.established}
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-3 font-serif font-semibold leading-[1.05] tracking-tight text-background text-xl sm:mt-5 md:text-2xl lg:text-3xl">
                Where modern beauty meets <span className="text-shimmer-gold">timeless care</span>
              </h1>
              <p className="mt-2 font-serif text-base font-medium text-background/90 sm:mt-3 sm:text-2xl">
                Loved for <RotatingHeadline />
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-3 line-clamp-3 max-w-xl text-pretty text-xs text-background/85 sm:mt-5 sm:line-clamp-none sm:text-lg leading-snug md:leading-relaxed">
                Expert hair, skin, makeup, bridal, spa and nail services — delivered by certified stylists in a calm, hygienic space in the heart of Hayes Valley. Discover a salon that listens, then styles.
              </p>
            </Reveal>
            <Reveal delay={300}>
              {/* two-up on phone so the pair never stacks */}
              <div className="mt-4 grid grid-cols-2 items-center gap-2 sm:mt-7 sm:flex sm:flex-wrap sm:gap-3">
                <BookButton className="w-full rounded-full bg-primary px-2 text-[0.7rem] shadow-lg shadow-primary/25 hover:bg-primary/90 sm:w-auto sm:px-7 sm:text-base sm:h-11">
                  <CalendarHeart className="mr-1 h-3.5 w-3.5 sm:mr-2 sm:h-5 sm:w-5" /> Book Appointment
                </BookButton>
                <Link href="/services" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full rounded-full border-background/30 bg-background/10 px-2 text-[0.7rem] text-background backdrop-blur-sm hover:bg-background/20 hover:text-background sm:w-auto sm:px-7 sm:text-base sm:h-11">
                    Explore Services <ArrowRight className="ml-1 h-3 w-3 sm:ml-2 sm:h-4 sm:w-4" />
                  </Button>
                </Link>
              </div>
            </Reveal>

            {/* Trust stats */}
            <Reveal delay={400}>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 sm:mt-6 sm:gap-x-8 sm:gap-y-4 md:mt-10">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Stars rating={salonInfo.stats.rating} size={13} />
                  <span className="text-xs font-medium text-background sm:text-sm">{salonInfo.stats.rating} <span className="text-background/70">({salonInfo.stats.reviews}+ reviews)</span></span>
                </div>
                <div className="hidden h-5 w-px bg-background/30 sm:block" />
                <div className="text-xs text-background/85 sm:text-sm"><span className="font-semibold text-background">{salonInfo.stats.clients}</span> happy clients</div>
                <div className="hidden h-5 w-px bg-background/30 sm:block" />
                <div className="text-xs text-background/85 sm:text-sm"><span className="font-semibold text-background">{salonInfo.stats.years}</span> years of care</div>
              </div>
            </Reveal>
          </div>

          {/* Popular-right-now rail — fills the hero's dead band and gets people
              one tap from a real service page. Scrolls sideways on mobile. */}
          <Reveal delay={500} className="mt-4 sm:mt-5 md:mt-12 max-w-3xl">
            <div className="flex items-center gap-2 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-background/70 sm:text-xs sm:tracking-[0.18em]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-salon-gold opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-salon-gold" />
              </span>
              Booking fast this week
            </div>
            <div className="mt-2 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2 sm:mt-3 sm:gap-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {popularServices.slice(0, 4).map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group flex shrink-0 snap-start items-center gap-3 rounded-2xl border border-background/20 bg-background/10 p-2 pr-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-salon-gold/50 hover:bg-background/20"
                >
                  <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg ring-1 ring-background/20 sm:h-11 sm:w-11 sm:rounded-xl">
                    <Image src={getImage(s.imageKey, 0)} alt={s.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" fill sizes="44px" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-background">{s.name}</span>
                    <span className="mt-0.5 block text-xs text-background/70">
                      from <span className="font-semibold text-salon-gold">${s.startingPrice}</span> · {s.duration}
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-background/50 transition-all duration-300 group-hover:text-salon-gold group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Floating service chips (desktop only) */}
        <FloatingServiceChips />

        {/* Scroll cue */}
        <div className="pointer-events-none absolute bottom-28 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 lg:flex">
          <span className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-background/50">Scroll</span>
          <span className="flex h-9 w-5 items-start justify-center rounded-full border border-background/30 p-1">
            <span className="h-1.5 w-1 animate-bounce rounded-full bg-salon-gold" />
          </span>
        </div>

        {/* Bottom info strip */}
        <div className="relative border-t border-background/15 bg-foreground/40 backdrop-blur-sm">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-background/10 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
            {[
              { icon: MapPin, label: "Visit us", value: salonInfo.address.line1 },
              { icon: Clock, label: "Open today", value: "9 AM – 9 PM" },
              // third card is desk-only — three of these never fit a phone row
              { icon: Mail, label: "Email us", value: salonInfo.email, desktopOnly: true },
            ].map((item) => (
              <div key={item.label} className={cn("flex items-center gap-1.5 px-2 py-2 sm:gap-3 sm:px-6 sm:py-4", item.desktopOnly && "hidden sm:flex")}>
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-background/15 text-background sm:h-10 sm:w-10"><item.icon className="h-3 w-3 sm:h-4 sm:w-4" /></span>
                <div className="min-w-0">
                  <p className="text-[0.55rem] uppercase tracking-wider text-background/60 sm:text-xs">{item.label}</p>
                  <p className="truncate text-[0.7rem] font-medium leading-tight text-background sm:text-sm">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== EDITORIAL RIBBON ============== */}
      <MarqueeRibbon
        tilt
        words={["Hair", "Skin", "Bridal", "Spa", "Nails", "Makeup", "Balayage", "Keratin"]}
      />

      {/* ============== LIVE ACTIVITY TICKER ============== */}
      <LiveTicker />

      {/* ============== INTERACTIVE CATEGORY EXPLORER ============== */}
      <section className="bg-background py-5 sm:py-6 md:py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Explore by category"
            title="What are you in the mood for?"
            description="Tap any category to browse every service inside it."
          />
          <div className="mt-5 md:mt-12">
            <CategoryExplorer />
          </div>
        </div>
      </section>

      {/* ============== FEATURED SERVICES ============== */}
      <section className="bg-blush py-5 sm:py-6 md:py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="What we do" title="Services crafted around you" description="From precision haircuts to bridal artistry, every service begins with a consultation and ends with you feeling completely yourself. Over 120 services across 12 categories." />
          <div className="mt-5 md:mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {popularServices.map((s, i) => (
              <Reveal key={s.slug} delay={i * 70}>
                <Link href={`/services/${s.slug}`}>
                  <Card className="group h-full cursor-pointer overflow-hidden border-border/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={getImage(s.imageKey, 0)} alt={s.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                      <Badge className="absolute left-2 top-2 max-w-[calc(100%-1rem)] truncate bg-background/90 text-[0.6rem] text-foreground hover:bg-background sm:left-3 sm:top-3 sm:text-xs">{s.category}</Badge>
                      <div className="absolute bottom-2 left-2 flex items-center gap-1 text-background sm:bottom-3 sm:left-3 sm:gap-1.5"><Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" /><span className="text-[0.65rem] font-medium sm:text-xs">{s.duration}</span></div>
                    </div>
                    <CardContent className="p-3 sm:p-5">
                      <h3 className="font-serif text-sm font-semibold leading-snug sm:text-lg">{s.name}</h3>
                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground sm:mt-2 sm:text-sm">{s.shortDescription}</p>
                      <div className="mt-2.5 flex items-center justify-between sm:mt-4">
                        <div><span className="text-[0.65rem] text-muted-foreground sm:text-xs">from </span><span className="font-serif text-base font-semibold text-primary sm:text-xl">${s.startingPrice}</span></div>
                        <span className="flex items-center gap-1 text-xs font-medium text-primary sm:text-sm">Details <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-6 md:mt-10 flex justify-center">
            <Link href="/services"><Button variant="outline" className="group rounded-full">View all services <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></Button></Link>
          </div>
        </div>
      </section>

      {/* ============== WHY CHOOSE US ============== */}
      <section className="bg-blush py-5 sm:py-6 md:py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            <div>
              <SectionHeading eyebrow="Why Lumière" title="A salon you can trust" description="We've built Lumière around what real customers want — expertise, hygiene, honest pricing and a genuinely caring team." align="left" />
              <div className="mt-5 grid grid-cols-2 gap-2.5 sm:mt-8 sm:gap-4">
                {[
                  { icon: Award, title: "Certified stylists", desc: "L'Oréal, Wella & CIDESCO trained team, learning every quarter." },
                  { icon: ShieldCheck, title: "Hygiene-first", desc: "Single-use tools, UV-sterilised equipment, 90°C-laundered towels." },
                  { icon: Heart, title: "Honest pricing", desc: "Transparent rates approved upfront — never a surprise at checkout." },
                  { icon: Leaf, title: "Premium products", desc: "L'Oréal, Kérastase, MAC & Dermalogica across every service." },
                ].map((f, i) => (
                  <Reveal key={f.title} delay={i * 80}>
                    <div className="flex h-full flex-col gap-2 rounded-2xl bg-background p-3 shadow-sm ring-1 ring-border/40 sm:flex-row sm:gap-3.5 sm:p-4">
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-11 sm:w-11"><f.icon className="h-4 w-4 sm:h-5 sm:w-5" /></span>
                      <div><h4 className="text-sm font-semibold sm:text-base">{f.title}</h4><p className="mt-1 text-xs text-muted-foreground sm:text-sm">{f.desc}</p></div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal delay={150} className="relative">
              <div className="grid grid-cols-2 gap-4">
                <Image src={getImage("salonInterior2", 0)} alt="Salon styling stations" className="rounded-arch aspect-[3/4] w-full object-cover shadow-lg" width={600} height={800} sizes="(max-width: 768px) 50vw, 25vw" />
                <Image src={getImage("salonReception", 0)} alt="Salon reception" className="mt-6 md:mt-10 aspect-[3/4] w-full rounded-2xl object-cover shadow-lg" width={600} height={800} sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-2xl bg-primary px-6 py-4 text-center text-primary-foreground shadow-xl">
                <p className="font-serif font-bold text-xl md:text-2xl lg:text-3xl">{salonInfo.stats.rating}/5</p>
                <p className="text-xs uppercase tracking-wider text-primary-foreground/80">{salonInfo.stats.reviews}+ Google reviews</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============== NUMBERS BAND ============== */}
      <section className="border-y border-border/60 bg-background py-4 sm:py-6 md:py-8 lg:py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-6 px-4 sm:gap-y-10 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { value: 28000, suffix: "+", label: "Happy clients" },
            { value: 640, suffix: "+", label: "Brides styled" },
            { value: 18, suffix: "", label: "Expert stylists" },
            { value: 11, suffix: "", label: "Years of care" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="relative flex flex-col items-center gap-1 text-center">
              {i > 0 && <span className="absolute left-0 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-border lg:block" />}
              <span className="font-serif font-bold text-primary text-xl md:text-2xl lg:text-3xl">
                <StatCounter value={s.value} suffix={s.suffix} />
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{s.label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============== MEET OUR STYLISTS ============== */}
      <section className="bg-background py-5 sm:py-6 md:py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Meet the team" title="Stylists who genuinely care" description="Each of our stylists brings years of training and a personal touch. Find the one who's right for your next look." />
          <div className="mt-5 md:mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {featuredStylists.map((st, i) => (
              <Reveal key={st.slug} delay={i * 80}>
                <Link href={`/team/${st.slug}`} className="group block">
                  {/* Arch portrait — the boutique-salon signature */}
                  <div className="rounded-arch relative aspect-[3/4] overflow-hidden shadow-md transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-primary/15">
                    <Image src={getImage(st.imageKey, st.imageIndex)} alt={st.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/15 to-transparent transition-opacity duration-500 group-hover:from-foreground/95" />
                    {/* Shine sweep */}
                    <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                    {/* Rating badge */}
                    <div className="absolute right-2 top-3 flex items-center gap-1 rounded-full bg-background/90 px-2 py-0.5 text-[0.65rem] font-bold text-foreground backdrop-blur-sm sm:right-4 sm:top-6 sm:px-2.5 sm:py-1 sm:text-xs">
                      <Star className="h-3 w-3 fill-salon-gold text-salon-gold" />
                      {st.rating}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 text-center text-background p-2 sm:p-3 md:p-4 lg:p-5">
                      <p className="truncate text-[0.55rem] uppercase tracking-[0.14em] text-background/70 sm:text-[0.65rem] sm:tracking-[0.18em]">{st.position}</p>
                      <h3 className="mt-0.5 truncate font-serif text-sm font-semibold sm:text-lg">{st.name}</h3>
                      <div className="mt-1 flex items-center justify-center gap-1 sm:mt-1.5 sm:gap-1.5"><Stars rating={st.rating} size={11} /><span className="text-[0.65rem] text-background/80 sm:text-xs">{st.rating} · {st.reviews}</span></div>
                      <div className="mt-2 hidden items-center justify-center gap-1 text-xs font-medium text-salon-gold sm:flex">
                        View profile <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap justify-center gap-1 sm:mt-3 sm:gap-1.5">
                    {st.expertise.slice(0, 2).map((e) => (<Badge key={e} variant="secondary" className="text-[0.6rem] transition-colors group-hover:bg-primary/10 group-hover:text-primary sm:text-xs">{e}</Badge>))}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-6 md:mt-10 flex justify-center">
            <Link href="/team"><Button variant="outline" className="rounded-full group">Meet the whole team <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></Button></Link>
          </div>
        </div>
      </section>

      {/* ============== BEFORE & AFTER ============== */}
      <section className="bg-foreground text-background py-5 sm:py-6 md:py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Real transformations" title="Before & after" description="Drag the slider to see the difference a Lumière appointment makes. Real clients, real results — no filters." light />
          <div className="mt-4 md:mt-12 grid gap-4 sm:gap-6 lg:grid-cols-3">
            {beforeAfter.slice(0, 3).map((ba, i) => (
              <Reveal key={ba.id} delay={i * 100}>
                <div>
                  <BeforeAfterSlider beforeSrc={getImage(ba.beforeKey, ba.beforeIndex)} afterSrc={getImage(ba.afterKey, ba.afterIndex)} alt={ba.title} />
                  <div className="mt-2.5 sm:mt-4"><h3 className="font-serif text-sm font-semibold sm:text-lg">{ba.title}</h3><p className="text-xs text-background/70 sm:text-sm">{ba.service}</p></div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-6 md:mt-10 flex justify-center">
            <Link href="/gallery"><Button variant="outline" className="group rounded-full border-background/30 text-background hover:bg-background/10 hover:text-background">See full gallery <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></Button></Link>
          </div>
        </div>
      </section>

      {/* ============== GLOW FINDER QUIZ ============== */}
      <section className="bg-background py-5 sm:py-6 md:py-10 lg:py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Not sure where to start?" title="Find your glow in 20 seconds" description="Answer two quick questions and we'll match you with the perfect service — no scrolling through menus." />
          <Reveal delay={120} className="mt-6 md:mt-10">
            <GlowFinder />
          </Reveal>
        </div>
      </section>

      {/* ============== TESTIMONIALS — WALL OF LOVE ============== */}
      <section className="overflow-hidden bg-background pb-12 pt-4 md:pb-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Loved by clients" title="A wall of love" description={`Over ${salonInfo.stats.reviews} reviews across Google, Yelp and Instagram — drifting by below. Hover to pause and read.`} />
        </div>
        <div className="mt-5 md:mt-12">
          <TestimonialMarquee />
        </div>
      </section>

      {/* ============== PACKAGES ============== */}
      <section className="bg-blush py-5 sm:py-6 md:py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Curated bundles" title="Popular beauty packages" description="Combine your favourite services and save. Perfect for brides, party prep and monthly self-care." />
          <div className="mt-4 md:mt-12 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
            {featuredPackages.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <Card className={`group relative h-full overflow-hidden border-border/70 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/10 ${p.popular ? "ring-2 ring-primary" : ""}`}>
                  {/* Both corner badges share one stack so they can never sit on each other */}
                  <div className="absolute right-1.5 top-1.5 z-10 flex flex-col items-end gap-1 sm:right-3 sm:top-3 sm:gap-2">
                    {p.popular && <Badge className="bg-primary px-1.5 py-0 text-[0.55rem] text-primary-foreground sm:px-2 sm:text-xs">Most popular</Badge>}
                    <span className="flex items-center gap-1 rounded-full bg-salon-gold px-1.5 py-0.5 text-[0.55rem] sm:px-2.5 sm:py-1 sm:text-xs font-bold text-foreground shadow-sm">
                      <Sparkles className="h-3 w-3" /> Save {p.save}%
                    </span>
                  </div>
                  <div className="relative aspect-[3/2] sm:aspect-[16/10] overflow-hidden">
                    <Image src={getImage(p.imageKey, p.imageIndex)} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent transition-opacity duration-500 group-hover:from-foreground/85" />
                    {/* Shine sweep */}
                    <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                    <div className="absolute bottom-2 left-2 text-background sm:bottom-3 sm:left-4"><span className="text-[0.6rem] uppercase tracking-wider text-background/80 sm:text-xs">{p.duration}</span></div>
                  </div>
                  <CardContent className="p-2.5 sm:p-6">
                    <h3 className="font-serif text-sm font-semibold leading-snug sm:text-xl">{p.name}</h3>
                    <p className="mt-1 line-clamp-2 text-[0.7rem] text-muted-foreground sm:mt-1.5 sm:line-clamp-none sm:text-sm">{p.description}</p>
                    <ul className="mt-2 space-y-1 sm:mt-4 sm:space-y-2">{p.services.slice(0, 4).map((s) => (<li key={s} className="flex items-start gap-1.5 text-[0.7rem] sm:gap-2 sm:text-sm"><CheckCircle2 className="mt-0.5 h-3 w-3 flex-shrink-0 text-primary transition-transform duration-300 group-hover:scale-110 sm:h-4 sm:w-4" /><span className="line-clamp-1 text-foreground/80 sm:line-clamp-none">{s}</span></li>))}</ul>
                    <div className="mt-2.5 flex flex-col gap-2 border-t border-border/60 pt-2.5 sm:mt-5 sm:flex-row sm:items-end sm:justify-between sm:pt-4">
                      <div className="flex items-baseline gap-1.5 sm:block"><span className="text-[0.65rem] text-muted-foreground line-through sm:text-xs">${p.originalPrice}</span><p className="font-serif font-bold text-primary text-base sm:text-lg md:text-xl lg:text-2xl">${p.price}</p><span className="text-[0.65rem] font-medium text-green-600 sm:text-xs">Save {p.save}%</span></div>
                      <BookButton size="sm" service={p.slug} className="w-full rounded-full bg-primary text-xs transition-transform duration-300 group-hover:scale-105 sm:w-auto sm:text-sm">Book</BookButton>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
          <div className="mt-6 md:mt-10 flex justify-center"><Link href="/packages"><Button variant="outline" className="group rounded-full">View all packages <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></Button></Link></div>
        </div>
      </section>

      {/* ============== OFFERS ============== */}
      <section className="bg-background py-5 sm:py-6 md:py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Save more" title="Current offers" description="Promotions running right now — for new clients, students, brides and referrals." />
          <div className="mt-5 md:mt-12 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
            {featuredOffers.map((o, i) => (
              <Reveal key={o.id} delay={i * 80}>
                <Card className="group h-full overflow-hidden border-border/70 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/10">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={getImage(o.imageKey, o.imageIndex)} alt={o.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-foreground/80 to-foreground/20 transition-opacity duration-500 group-hover:from-foreground/90" />
                    {/* Shine sweep */}
                    <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                    <div className="absolute left-2 top-2 sm:left-4 sm:top-4"><Badge className="bg-salon-gold text-[0.6rem] text-foreground transition-transform duration-300 group-hover:scale-110 sm:text-xs">{o.badge}</Badge></div>
                    <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4"><p className="font-serif font-bold text-background text-base sm:text-lg md:text-xl lg:text-2xl">{o.discount}</p><p className="truncate text-xs text-background/85 sm:text-sm">{o.title}</p></div>
                  </div>
                  <CardContent className="p-3 sm:p-5">
                    <p className="line-clamp-3 text-xs text-muted-foreground sm:line-clamp-none sm:text-sm">{o.description}</p>
                    <div className="mt-2.5 flex items-center justify-between rounded-lg bg-secondary/60 px-2 py-1.5 transition-colors group-hover:bg-primary/5 sm:mt-4 sm:px-3 sm:py-2"><span className="text-[0.65rem] text-muted-foreground sm:text-xs">Code</span><code className="font-mono text-xs font-semibold text-primary transition-transform duration-300 group-hover:scale-105 sm:text-sm">{o.code}</code></div>
                    <p className="mt-1.5 text-[0.65rem] text-muted-foreground sm:mt-2 sm:text-xs">{o.validUntil}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
          <div className="mt-6 md:mt-10 flex justify-center"><Link href="/offers"><Button variant="outline" className="group rounded-full">See all offers <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></Button></Link></div>
        </div>
      </section>

      {/* ============== PRODUCTS USED ============== */}
      <section className="border-y border-border/60 bg-secondary/40 py-4 sm:py-6 md:py-8 lg:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Premium brands we trust</p></Reveal>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 sm:mt-8 sm:gap-x-8 sm:gap-y-4">
            {brandsUsed.map((b, i) => (<Reveal key={b} delay={i * 40}><span className="font-serif text-sm font-medium text-foreground/70 transition-all duration-300 hover:scale-110 hover:text-primary sm:text-xl">{b}</span></Reveal>))}
          </div>
        </div>
      </section>

      {/* ============== INSTAGRAM GALLERY ============== */}
      <section className="bg-background py-5 sm:py-6 md:py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Follow us @lumierebeauty" title="From our Instagram" description="A peek at our latest work. Tap any image to see more on our feed." />
          <div className="mt-4 md:mt-12 grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-6">
            {instagramShots.map((src, i) => (
              <Reveal key={i} delay={i * 50}>
                <a href={salonInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="group relative block aspect-square overflow-hidden rounded-xl ring-2 ring-transparent transition-all duration-500 hover:ring-primary/40 hover:shadow-xl">
                  <Image src={src} alt={`Instagram post ${i + 1}`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" fill sizes="(max-width: 640px) 33vw, 16vw" />
                  <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/50" />
                  <Instagram className="absolute bottom-2 right-2 h-4 w-4 text-background drop-shadow transition-all duration-300 group-hover:bottom-1/2 group-hover:right-1/2 group-hover:h-6 group-hover:w-6 group-hover:translate-x-1/2 group-hover:translate-y-1/2" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============== BLOG TEASER ============== */}
      <section className="bg-blush py-5 sm:py-6 md:py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Beauty tips & blog" title="Expert guides for everyday glow" description="Hair care, skincare, bridal prep and seasonal routines — written by our stylists and therapists." />
          <div className="mt-5 md:mt-12 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
            {blogPosts.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <Link href={`/blog/${p.slug}`}>
                  <Card className="group h-full cursor-pointer overflow-hidden border-border/70 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/10">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={getImage(p.imageKey, p.imageIndex)} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                      {/* Shine sweep */}
                      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                      <Badge className="absolute left-2 top-2 max-w-[calc(100%-1rem)] truncate bg-background/90 text-[0.6rem] text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground sm:left-3 sm:top-3 sm:text-xs">{p.category}</Badge>
                    </div>
                    <CardContent className="p-3 sm:p-5">
                      <div className="flex items-center gap-1.5 text-[0.65rem] text-muted-foreground sm:gap-2 sm:text-xs"><span>{p.date}</span><span>·</span><span className="flex items-center gap-1"><Clock className="h-3 w-3" />{p.readTime}</span></div>
                      <h3 className="mt-1.5 font-serif text-sm font-semibold leading-snug transition-colors group-hover:text-primary sm:mt-2 sm:text-lg">{p.title}</h3>
                      <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground sm:mt-2 sm:text-sm">{p.excerpt}</p>
                      <p className="mt-2.5 text-[0.65rem] text-muted-foreground sm:mt-4 sm:text-xs">By {p.author}</p>
                    </CardContent>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-6 md:mt-10 flex justify-center"><Link href="/blog"><Button variant="outline" className="group rounded-full">Read the blog <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></Button></Link></div>
        </div>
      </section>

      {/* ============== FAQ ============== */}
      <section className="bg-background py-5 sm:py-6 md:py-10 lg:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Good to know" title="Frequently asked questions" description="Everything you need to know before your visit. Can't find your answer? Just drop us a message." />
          <Accordion type="single" collapsible className="mt-6 md:mt-10 space-y-3">
            {faqs.slice(0, 6).map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="overflow-hidden rounded-xl border border-border/70 bg-background px-4 sm:px-5">
                <AccordionTrigger className="text-left text-sm font-medium hover:no-underline sm:text-base">{f.q}</AccordionTrigger>
                <AccordionContent className="text-pretty text-xs text-muted-foreground leading-snug sm:text-sm md:leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-5 flex justify-center sm:mt-8"><Link href="/faq"><Button variant="outline" className="group rounded-full">View all FAQs <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></Button></Link></div>
        </div>
      </section>

      {/* ============== LOCATION / HOURS / CONTACT ============== */}
      <section className="bg-blush py-5 sm:py-6 md:py-10 lg:py-12">
        <div className="mx-auto grid max-w-7xl px-4 sm:px-6 lg:grid-cols-2 lg:px-8 gap-6 md:gap-8 lg:gap-10">
          <div>
            <SectionHeading eyebrow="Find us" title="Visit Lumière" align="left" />
            <div className="mt-5 space-y-3.5 sm:mt-8 sm:space-y-5">
              <div className="flex gap-3 sm:gap-4"><span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-11 sm:w-11"><MapPin className="h-5 w-5" /></span><div><h4 className="text-sm font-semibold sm:text-base">Address</h4><p className="mt-1 text-xs text-muted-foreground sm:text-sm">{salonInfo.address.line1}<br />{salonInfo.address.line2}</p></div></div>
              <div className="flex gap-3 sm:gap-4"><span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-11 sm:w-11"><Clock className="h-5 w-5" /></span><div className="flex-1"><h4 className="text-sm font-semibold sm:text-base">Opening hours</h4><ul className="mt-2 space-y-1 text-xs text-muted-foreground sm:text-sm">{salonInfo.hours.map((h) => (<li key={h.day} className="flex justify-between border-b border-border/40 pb-1"><span>{h.day}</span><span className="font-medium text-foreground/80">{h.open} – {h.close}</span></li>))}</ul></div></div>
              <div className="flex gap-3 sm:gap-4"><span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-11 sm:w-11"><Mail className="h-5 w-5" /></span><div><h4 className="text-sm font-semibold sm:text-base">Contact</h4><p className="mt-1 text-sm text-muted-foreground"><a href={`mailto:${salonInfo.email}`} className="hover:text-primary">{salonInfo.email}</a></p></div></div>
              <div className="flex gap-3 sm:gap-4"><span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-11 sm:w-11"><MapPin className="h-5 w-5" /></span><div><h4 className="text-sm font-semibold sm:text-base">Nearby landmarks</h4><ul className="mt-1 space-y-1 text-xs text-muted-foreground sm:text-sm">{salonInfo.landmarks.map((l) => <li key={l}>· {l}</li>)}</ul></div></div>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <BookButton className="rounded-full bg-primary"><CalendarHeart className="mr-2 h-4 w-4" /> Book Appointment</BookButton>
              <Link href="/contact"><Button variant="outline" className="rounded-full">Get directions <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
            </div>
          </div>
          <Reveal delay={150}>
            <div className="overflow-hidden rounded-3xl border border-border/70 shadow-lg">
              <iframe title="Lumière Beauty Lounge location" src={salonInfo.mapEmbed} className="h-[210px] sm:h-[300px] md:h-[420px] w-full border-0 lg:h-full lg:min-h-[520px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============== GOLD RIBBON ============== */}
      <MarqueeRibbon
        variant="gold"
        words={["Book today", "Walk-ins welcome", "Open 7 days", "Hayes Valley", "Since 2014"]}
      />

      {/* ============== FINAL CTA ============== */}
      <section className="relative isolate overflow-hidden bg-primary text-primary-foreground py-5 sm:py-6 md:py-10 lg:py-12">
        <div className="absolute inset-0 -z-10 opacity-20"><Image src={getImage("ambiance", 0)} alt="" className="h-full w-full object-cover" fill sizes="100vw" /></div>
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <Wand2 className="mx-auto h-8 w-8 text-salon-gold sm:h-10 sm:w-10" />
            <h2 className="mt-3 font-serif font-semibold leading-tight text-xl sm:mt-5 md:text-2xl lg:text-3xl">Ready for your Lumière moment?</h2>
            <p className="mx-auto mt-2 max-w-xl text-pretty text-xs text-primary-foreground/85 sm:mt-4 sm:text-base">Book online in under two minutes, or drop us an email — we'll find a time and stylist that's perfect for you.</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:mt-8 sm:gap-3">
              <BookButton className="rounded-full bg-background px-4 text-xs text-primary hover:bg-background/90 sm:h-11 sm:px-7 sm:text-base"><CalendarHeart className="mr-1.5 h-4 w-4 sm:mr-2 sm:h-5 sm:w-5" /> Book Appointment</BookButton>
              <Link href={`mailto:${salonInfo.bookingEmail}`}>
                <Button variant="outline" className="max-w-full rounded-full border-primary-foreground/40 bg-primary-foreground/10 px-4 text-xs text-primary-foreground backdrop-blur-sm hover:bg-primary-foreground/20 sm:h-11 sm:px-7 sm:text-base"><Mail className="mr-1.5 h-4 w-4 shrink-0 sm:mr-2 sm:h-5 sm:w-5" /> <span className="truncate">{salonInfo.bookingEmail}</span></Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
