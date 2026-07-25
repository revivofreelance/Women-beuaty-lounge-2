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

        <div className="mx-auto flex min-h-[75vh] md:min-h-[88vh] max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8 lg:min-h-[92vh] py-6 md:py-10 lg:py-12">
          <div className="max-w-2xl">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-background/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-background backdrop-blur-sm ring-1 ring-background/20">
                <Sparkles className="h-3.5 w-3.5 text-salon-gold" />
                San Francisco's home for beauty since {salonInfo.established}
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-5 font-serif font-semibold leading-[1.05] tracking-tight text-background text-xl md:text-2xl lg:text-3xl">
                Where modern beauty meets <span className="text-shimmer-gold">timeless care</span>
              </h1>
              <p className="mt-3 font-serif text-lg font-medium text-background/90 sm:text-2xl">
                Loved for <RotatingHeadline />
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 max-w-xl text-pretty text-sm text-background/85 sm:text-lg leading-snug md:leading-relaxed">
                Expert hair, skin, makeup, bridal, spa and nail services — delivered by certified stylists in a calm, hygienic space in the heart of Hayes Valley. Discover a salon that listens, then styles.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <BookButton size="lg" className="rounded-full bg-primary px-7 text-base shadow-lg shadow-primary/25 hover:bg-primary/90">
                  <CalendarHeart className="mr-2 h-5 w-5" /> Book Appointment
                </BookButton>
                <Link href="/services">
                  <Button size="lg" variant="outline" className="rounded-full border-background/30 bg-background/10 px-7 text-base text-background backdrop-blur-sm hover:bg-background/20 hover:text-background">
                    Explore Services <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </Reveal>

            {/* Trust stats */}
            <Reveal delay={400}>
              <div className="mt-6 md:mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <div className="flex items-center gap-2">
                  <Stars rating={salonInfo.stats.rating} size={16} />
                  <span className="text-sm font-medium text-background">{salonInfo.stats.rating} <span className="text-background/70">({salonInfo.stats.reviews}+ reviews)</span></span>
                </div>
                <div className="hidden h-5 w-px bg-background/30 sm:block" />
                <div className="text-sm text-background/85"><span className="font-semibold text-background">{salonInfo.stats.clients}</span> happy clients</div>
                <div className="hidden h-5 w-px bg-background/30 sm:block" />
                <div className="text-sm text-background/85"><span className="font-semibold text-background">{salonInfo.stats.years}</span> years of care</div>
              </div>
            </Reveal>
          </div>

          {/* Popular-right-now rail — fills the hero's dead band and gets people
              one tap from a real service page. Scrolls sideways on mobile. */}
          <Reveal delay={500} className="mt-8 md:mt-12 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-background/70">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-salon-gold opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-salon-gold" />
              </span>
              Booking fast this week
            </div>
            <div className="mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {popularServices.slice(0, 4).map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group flex shrink-0 snap-start items-center gap-3 rounded-2xl border border-background/20 bg-background/10 p-2 pr-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-salon-gold/50 hover:bg-background/20"
                >
                  <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl ring-1 ring-background/20">
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
          <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-background/10 px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-6 lg:px-8">
            {[
              { icon: MapPin, label: "Visit us", value: salonInfo.address.line1 },
              { icon: Clock, label: "Open today", value: "9 AM – 9 PM" },
              { icon: Mail, label: "Email us", value: salonInfo.email },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 px-2 py-4 sm:px-6">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-background/15 text-background"><item.icon className="h-4 w-4" /></span>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-background/60">{item.label}</p>
                  <p className="truncate text-sm font-medium text-background">{item.value}</p>
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
      <section className="bg-background py-6 md:py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Explore by category"
            title="What are you in the mood for?"
            description="Tap any category to browse every service inside it."
          />
          <div className="mt-8 md:mt-12">
            <CategoryExplorer />
          </div>
        </div>
      </section>

      {/* ============== FEATURED SERVICES ============== */}
      <section className="bg-blush py-6 md:py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="What we do" title="Services crafted around you" description="From precision haircuts to bridal artistry, every service begins with a consultation and ends with you feeling completely yourself. Over 120 services across 12 categories." />
          <div className="mt-8 md:mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {popularServices.map((s, i) => (
              <Reveal key={s.slug} delay={i * 70}>
                <Link href={`/services/${s.slug}`}>
                  <Card className="group h-full cursor-pointer overflow-hidden border-border/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={getImage(s.imageKey, 0)} alt={s.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                      <Badge className="absolute left-3 top-3 bg-background/90 text-foreground hover:bg-background">{s.category}</Badge>
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-background"><Clock className="h-3.5 w-3.5" /><span className="text-xs font-medium">{s.duration}</span></div>
                    </div>
                    <CardContent className="p-4 sm:p-5">
                      <h3 className="font-serif text-lg font-semibold leading-snug">{s.name}</h3>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{s.shortDescription}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <div><span className="text-xs text-muted-foreground">from </span><span className="font-serif text-xl font-semibold text-primary">${s.startingPrice}</span></div>
                        <span className="flex items-center gap-1 text-sm font-medium text-primary">Details <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
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
      <section className="bg-blush py-6 md:py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            <div>
              <SectionHeading eyebrow="Why Lumière" title="A salon you can trust" description="We've built Lumière around what real customers want — expertise, hygiene, honest pricing and a genuinely caring team." align="left" />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  { icon: Award, title: "Certified stylists", desc: "L'Oréal, Wella & CIDESCO trained team, learning every quarter." },
                  { icon: ShieldCheck, title: "Hygiene-first", desc: "Single-use tools, UV-sterilised equipment, 90°C-laundered towels." },
                  { icon: Heart, title: "Honest pricing", desc: "Transparent rates approved upfront — never a surprise at checkout." },
                  { icon: Leaf, title: "Premium products", desc: "L'Oréal, Kérastase, MAC & Dermalogica across every service." },
                ].map((f, i) => (
                  <Reveal key={f.title} delay={i * 80}>
                    <div className="flex gap-3.5 rounded-2xl bg-background p-4 shadow-sm ring-1 ring-border/40">
                      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><f.icon className="h-5 w-5" /></span>
                      <div><h4 className="font-semibold">{f.title}</h4><p className="mt-1 text-sm text-muted-foreground">{f.desc}</p></div>
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
      <section className="border-y border-border/60 bg-background py-6 md:py-8 lg:py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
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
      <section className="bg-background py-6 md:py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Meet the team" title="Stylists who genuinely care" description="Each of our stylists brings years of training and a personal touch. Find the one who's right for your next look." />
          <div className="mt-8 md:mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                    <div className="absolute right-4 top-6 flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-xs font-bold text-foreground backdrop-blur-sm">
                      <Star className="h-3 w-3 fill-salon-gold text-salon-gold" />
                      {st.rating}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 text-center text-background p-3 md:p-4 lg:p-5">
                      <p className="text-[0.65rem] uppercase tracking-[0.18em] text-background/70">{st.position}</p>
                      <h3 className="mt-0.5 font-serif text-lg font-semibold">{st.name}</h3>
                      <div className="mt-1.5 flex items-center justify-center gap-1.5"><Stars rating={st.rating} size={12} /><span className="text-xs text-background/80">{st.rating} · {st.reviews}</span></div>
                      <div className="mt-2 flex items-center justify-center gap-1 text-xs font-medium text-salon-gold">
                        View profile <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                    {st.expertise.slice(0, 2).map((e) => (<Badge key={e} variant="secondary" className="text-xs transition-colors group-hover:bg-primary/10 group-hover:text-primary">{e}</Badge>))}
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
      <section className="bg-foreground text-background py-6 md:py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Real transformations" title="Before & after" description="Drag the slider to see the difference a Lumière appointment makes. Real clients, real results — no filters." light />
          <div className="mt-8 md:mt-12 grid gap-6 lg:grid-cols-3">
            {beforeAfter.slice(0, 3).map((ba, i) => (
              <Reveal key={ba.id} delay={i * 100}>
                <div>
                  <BeforeAfterSlider beforeSrc={getImage(ba.beforeKey, ba.beforeIndex)} afterSrc={getImage(ba.afterKey, ba.afterIndex)} alt={ba.title} />
                  <div className="mt-4"><h3 className="font-serif text-lg font-semibold">{ba.title}</h3><p className="text-sm text-background/70">{ba.service}</p></div>
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
      <section className="bg-background py-6 md:py-10 lg:py-12">
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
        <div className="mt-8 md:mt-12">
          <TestimonialMarquee />
        </div>
      </section>

      {/* ============== PACKAGES ============== */}
      <section className="bg-blush py-6 md:py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Curated bundles" title="Popular beauty packages" description="Combine your favourite services and save. Perfect for brides, party prep and monthly self-care." />
          <div className="mt-8 md:mt-12 grid gap-5 md:grid-cols-3">
            {featuredPackages.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <Card className={`group relative h-full overflow-hidden border-border/70 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/10 ${p.popular ? "ring-2 ring-primary" : ""}`}>
                  {p.popular && (<div className="absolute right-4 top-4 z-10"><Badge className="bg-primary text-primary-foreground">Most popular</Badge></div>)}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={getImage(p.imageKey, p.imageIndex)} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent transition-opacity duration-500 group-hover:from-foreground/85" />
                    {/* Shine sweep */}
                    <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                    <div className="absolute bottom-3 left-4 text-background"><span className="text-xs uppercase tracking-wider text-background/80">{p.duration}</span></div>
                    {/* Savings badge */}
                    <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-salon-gold px-2.5 py-1 text-xs font-bold text-foreground shadow-sm" style={{ marginTop: p.popular ? "2rem" : "0" }}>
                      <Sparkles className="h-3 w-3" /> Save {p.save}%
                    </div>
                  </div>
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="font-serif text-xl font-semibold">{p.name}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{p.description}</p>
                    <ul className="mt-4 space-y-2">{p.services.slice(0, 4).map((s) => (<li key={s} className="flex items-start gap-2 text-sm"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary transition-transform duration-300 group-hover:scale-110" /><span className="text-foreground/80">{s}</span></li>))}</ul>
                    <div className="mt-5 flex items-end justify-between border-t border-border/60 pt-4">
                      <div><span className="text-xs text-muted-foreground line-through">${p.originalPrice}</span><p className="font-serif font-bold text-primary text-lg md:text-xl lg:text-2xl">${p.price}</p><span className="text-xs font-medium text-green-600">Save {p.save}%</span></div>
                      <BookButton size="sm" service={p.slug} className="rounded-full bg-primary transition-transform duration-300 group-hover:scale-105">Book</BookButton>
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
      <section className="bg-background py-6 md:py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Save more" title="Current offers" description="Promotions running right now — for new clients, students, brides and referrals." />
          <div className="mt-8 md:mt-12 grid gap-5 md:grid-cols-3">
            {featuredOffers.map((o, i) => (
              <Reveal key={o.id} delay={i * 80}>
                <Card className="group h-full overflow-hidden border-border/70 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/10">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={getImage(o.imageKey, o.imageIndex)} alt={o.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-foreground/80 to-foreground/20 transition-opacity duration-500 group-hover:from-foreground/90" />
                    {/* Shine sweep */}
                    <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                    <div className="absolute left-4 top-4"><Badge className="bg-salon-gold text-foreground transition-transform duration-300 group-hover:scale-110">{o.badge}</Badge></div>
                    <div className="absolute bottom-4 left-4 right-4"><p className="font-serif font-bold text-background text-lg md:text-xl lg:text-2xl">{o.discount}</p><p className="text-sm text-background/85">{o.title}</p></div>
                  </div>
                  <CardContent className="p-4 sm:p-5">
                    <p className="text-sm text-muted-foreground">{o.description}</p>
                    <div className="mt-4 flex items-center justify-between rounded-lg bg-secondary/60 px-3 py-2 transition-colors group-hover:bg-primary/5"><span className="text-xs text-muted-foreground">Code</span><code className="font-mono text-sm font-semibold text-primary transition-transform duration-300 group-hover:scale-105">{o.code}</code></div>
                    <p className="mt-2 text-xs text-muted-foreground">{o.validUntil}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
          <div className="mt-6 md:mt-10 flex justify-center"><Link href="/offers"><Button variant="outline" className="group rounded-full">See all offers <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></Button></Link></div>
        </div>
      </section>

      {/* ============== PRODUCTS USED ============== */}
      <section className="border-y border-border/60 bg-secondary/40 py-6 md:py-8 lg:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Premium brands we trust</p></Reveal>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {brandsUsed.map((b, i) => (<Reveal key={b} delay={i * 40}><span className="font-serif text-lg font-medium text-foreground/70 transition-all duration-300 hover:scale-110 hover:text-primary sm:text-xl">{b}</span></Reveal>))}
          </div>
        </div>
      </section>

      {/* ============== INSTAGRAM GALLERY ============== */}
      <section className="bg-background py-6 md:py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Follow us @lumierebeauty" title="From our Instagram" description="A peek at our latest work. Tap any image to see more on our feed." />
          <div className="mt-8 md:mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
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
      <section className="bg-blush py-6 md:py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Beauty tips & blog" title="Expert guides for everyday glow" description="Hair care, skincare, bridal prep and seasonal routines — written by our stylists and therapists." />
          <div className="mt-8 md:mt-12 grid gap-5 md:grid-cols-3">
            {blogPosts.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <Link href={`/blog/${p.slug}`}>
                  <Card className="group h-full cursor-pointer overflow-hidden border-border/70 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/10">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={getImage(p.imageKey, p.imageIndex)} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                      {/* Shine sweep */}
                      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                      <Badge className="absolute left-3 top-3 bg-background/90 text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">{p.category}</Badge>
                    </div>
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground"><span>{p.date}</span><span>·</span><span className="flex items-center gap-1"><Clock className="h-3 w-3" />{p.readTime}</span></div>
                      <h3 className="mt-2 font-serif text-lg font-semibold leading-snug transition-colors group-hover:text-primary">{p.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.excerpt}</p>
                      <p className="mt-4 text-xs text-muted-foreground">By {p.author}</p>
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
      <section className="bg-background py-6 md:py-10 lg:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Good to know" title="Frequently asked questions" description="Everything you need to know before your visit. Can't find your answer? Just drop us a message." />
          <Accordion type="single" collapsible className="mt-6 md:mt-10 space-y-3">
            {faqs.slice(0, 6).map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="overflow-hidden rounded-xl border border-border/70 bg-background px-5">
                <AccordionTrigger className="text-left text-base font-medium hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-pretty text-sm text-muted-foreground leading-snug md:leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-8 flex justify-center"><Link href="/faq"><Button variant="outline" className="group rounded-full">View all FAQs <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></Button></Link></div>
        </div>
      </section>

      {/* ============== LOCATION / HOURS / CONTACT ============== */}
      <section className="bg-blush py-6 md:py-10 lg:py-12">
        <div className="mx-auto grid max-w-7xl px-4 sm:px-6 lg:grid-cols-2 lg:px-8 gap-6 md:gap-8 lg:gap-10">
          <div>
            <SectionHeading eyebrow="Find us" title="Visit Lumière" align="left" />
            <div className="mt-8 space-y-5">
              <div className="flex gap-4"><span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><MapPin className="h-5 w-5" /></span><div><h4 className="font-semibold">Address</h4><p className="mt-1 text-sm text-muted-foreground">{salonInfo.address.line1}<br />{salonInfo.address.line2}</p></div></div>
              <div className="flex gap-4"><span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><Clock className="h-5 w-5" /></span><div className="flex-1"><h4 className="font-semibold">Opening hours</h4><ul className="mt-2 space-y-1 text-sm text-muted-foreground">{salonInfo.hours.map((h) => (<li key={h.day} className="flex justify-between border-b border-border/40 pb-1"><span>{h.day}</span><span className="font-medium text-foreground/80">{h.open} – {h.close}</span></li>))}</ul></div></div>
              <div className="flex gap-4"><span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><Mail className="h-5 w-5" /></span><div><h4 className="font-semibold">Contact</h4><p className="mt-1 text-sm text-muted-foreground"><a href={`mailto:${salonInfo.email}`} className="hover:text-primary">{salonInfo.email}</a></p></div></div>
              <div className="flex gap-4"><span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><MapPin className="h-5 w-5" /></span><div><h4 className="font-semibold">Nearby landmarks</h4><ul className="mt-1 space-y-1 text-sm text-muted-foreground">{salonInfo.landmarks.map((l) => <li key={l}>· {l}</li>)}</ul></div></div>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <BookButton className="rounded-full bg-primary"><CalendarHeart className="mr-2 h-4 w-4" /> Book Appointment</BookButton>
              <Link href="/contact"><Button variant="outline" className="rounded-full">Get directions <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
            </div>
          </div>
          <Reveal delay={150}>
            <div className="overflow-hidden rounded-3xl border border-border/70 shadow-lg">
              <iframe title="Lumière Beauty Lounge location" src={salonInfo.mapEmbed} className="h-[300px] md:h-[420px] w-full border-0 lg:h-full lg:min-h-[520px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
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
      <section className="relative isolate overflow-hidden bg-primary text-primary-foreground py-6 md:py-10 lg:py-12">
        <div className="absolute inset-0 -z-10 opacity-20"><Image src={getImage("ambiance", 0)} alt="" className="h-full w-full object-cover" fill sizes="100vw" /></div>
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <Wand2 className="mx-auto h-10 w-10 text-salon-gold" />
            <h2 className="mt-5 font-serif font-semibold leading-tight text-xl md:text-2xl lg:text-3xl">Ready for your Lumière moment?</h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-primary-foreground/85">Book online in under two minutes, or drop us an email — we'll find a time and stylist that's perfect for you.</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <BookButton size="lg" className="rounded-full bg-background px-7 text-base text-primary hover:bg-background/90"><CalendarHeart className="mr-2 h-5 w-5" /> Book Appointment</BookButton>
              <Link href={`mailto:${salonInfo.bookingEmail}`}>
                <Button size="lg" variant="outline" className="rounded-full border-primary-foreground/40 bg-primary-foreground/10 px-7 text-base text-primary-foreground backdrop-blur-sm hover:bg-primary-foreground/20"><Mail className="mr-2 h-5 w-5" /> {salonInfo.bookingEmail}</Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
