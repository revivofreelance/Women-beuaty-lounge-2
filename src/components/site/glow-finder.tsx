"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { services, packages } from "@/lib/salon-data";
import { getImage } from "@/lib/salon-images";
import { useSalonStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import {
  Gem, Scissors, Flower2, LifeBuoy, Droplets, Wand2, Leaf, Palette,
  CalendarHeart, ArrowRight, RotateCcw, Sparkles, Clock, Tag,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Occasion = "wedding" | "everyday" | "treat" | "rescue";
type Focus = "hair" | "skin" | "glam" | "relax";

const OCCASIONS: { id: Occasion; label: string; hint: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "wedding", label: "Wedding or big event", hint: "The big day is coming", icon: Gem },
  { id: "everyday", label: "Everyday refresh", hint: "Keep me looking sharp", icon: Scissors },
  { id: "treat", label: "Treating myself", hint: "Because I deserve it", icon: Flower2 },
  { id: "rescue", label: "A little rescue", hint: "Fix damage, frizz or dullness", icon: LifeBuoy },
];

const FOCUSES: { id: Focus; label: string; hint: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "hair", label: "My hair", hint: "Cut, colour or shine", icon: Palette },
  { id: "skin", label: "My skin", hint: "Glow, clarity, care", icon: Droplets },
  { id: "glam", label: "The full look", hint: "Makeup, nails, styling", icon: Wand2 },
  { id: "relax", label: "Pure relaxation", hint: "Unwind head to toe", icon: Leaf },
];

const MATRIX: Record<Occasion, Record<Focus, { type: "service" | "package"; slug: string }>> = {
  wedding: {
    hair: { type: "package", slug: "complete-hair-makeover" },
    skin: { type: "package", slug: "pre-bridal-glow" },
    glam: { type: "service", slug: "bridal-makeup" },
    relax: { type: "package", slug: "spa-day-for-two" },
  },
  everyday: {
    hair: { type: "service", slug: "womens-haircut-styling" },
    skin: { type: "service", slug: "signature-facial" },
    glam: { type: "service", slug: "manicure-pedicure" },
    relax: { type: "service", slug: "hair-spa-treatment" },
  },
  treat: {
    hair: { type: "service", slug: "balayage-highlights" },
    skin: { type: "service", slug: "hydra-glow-facial" },
    glam: { type: "service", slug: "party-makeup-hd" },
    relax: { type: "service", slug: "spa-relaxation" },
  },
  rescue: {
    hair: { type: "service", slug: "keratin-smoothing" },
    skin: { type: "service", slug: "de-tan-facial" },
    glam: { type: "service", slug: "hair-extensions" },
    relax: { type: "service", slug: "spa-deep-tissue" },
  },
};

const stepVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

/** 20-second interactive quiz that matches a visitor with their ideal service. */
export function GlowFinder() {
  const { openBooking } = useSalonStore();
  const [occasion, setOccasion] = useState<Occasion | null>(null);
  const [focus, setFocus] = useState<Focus | null>(null);

  const step = occasion === null ? 0 : focus === null ? 1 : 2;

  const pick = occasion && focus ? MATRIX[occasion][focus] : null;
  const service = pick?.type === "service" ? services.find((s) => s.slug === pick.slug) : undefined;
  const pkg = pick?.type === "package" ? packages.find((p) => p.slug === pick.slug) : undefined;

  const result = service
    ? {
        name: service.name,
        description: service.shortDescription,
        price: service.startingPrice,
        duration: service.duration,
        image: getImage(service.imageKey, 0),
        href: `/services/${service.slug}`,
        bookSlug: service.slug,
        tag: service.category,
      }
    : pkg
      ? {
          name: pkg.name,
          description: pkg.description,
          price: pkg.price,
          duration: pkg.duration,
          image: getImage(pkg.imageKey, pkg.imageIndex),
          href: "/packages",
          bookSlug: undefined,
          tag: `Package · save ${pkg.save}%`,
        }
      : null;

  const reset = () => {
    setOccasion(null);
    setFocus(null);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-xl shadow-primary/5">
      {/* soft ambient blobs */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-salon-gold/20 blur-3xl" />

      <div className="relative p-3 md:p-4 lg:p-5">
        {/* Progress */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Glow finder
          </span>
          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  i <= step ? "w-7 bg-primary" : "w-3 bg-border"
                )}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="q1" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.35 }}>
              <h3 className="mt-5 font-serif font-semibold text-lg md:text-xl lg:text-2xl">What brings you in?</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">Two quick questions — we'll match you with your perfect appointment.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {OCCASIONS.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => setOccasion(o.id)}
                    className="group flex items-center gap-4 rounded-2xl border border-border/70 bg-background p-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <o.icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-semibold">{o.label}</span>
                      <span className="block text-xs text-muted-foreground">{o.hint}</span>
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="q2" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.35 }}>
              <h3 className="mt-5 font-serif font-semibold text-lg md:text-xl lg:text-2xl">Lovely. What's the focus?</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">Pick what matters most today.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {FOCUSES.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFocus(f.id)}
                    className="group flex items-center gap-4 rounded-2xl border border-border/70 bg-background p-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <f.icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-semibold">{f.label}</span>
                      <span className="block text-xs text-muted-foreground">{f.hint}</span>
                    </span>
                  </button>
                ))}
              </div>
              <button type="button" onClick={reset} className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-primary">
                <RotateCcw className="h-3 w-3" /> Start over
              </button>
            </motion.div>
          )}

          {step === 2 && result && (
            <motion.div key="result" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.35 }}>
              <p className="mt-5 text-sm font-medium text-primary">Your perfect match ✨</p>
              <div className="mt-3 grid gap-6 sm:grid-cols-[220px_1fr] sm:items-center">
                <Image
                  src={result.image}
                  alt={result.name}
                  className="rounded-arch-tight aspect-[4/5] w-full max-w-[220px] object-cover shadow-lg"
                  width={440}
                  height={550}
                  sizes="220px"
                />
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                    {result.tag}
                  </span>
                  <h3 className="mt-3 font-serif font-semibold text-lg md:text-xl lg:text-2xl">{result.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-snug md:leading-relaxed">{result.description}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                    <span className="inline-flex items-center gap-1.5 text-muted-foreground"><Tag className="h-4 w-4 text-salon-gold" /> from <span className="font-serif text-lg font-semibold text-primary">${result.price}</span></span>
                    <span className="inline-flex items-center gap-1.5 text-muted-foreground"><Clock className="h-4 w-4 text-salon-gold" /> {result.duration}</span>
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <Button
                      onClick={() => openBooking(result.bookSlug ? { service: result.bookSlug } : undefined)}
                      className="rounded-full bg-primary px-6 shadow-md shadow-primary/25 hover:bg-primary/90"
                    >
                      <CalendarHeart className="mr-2 h-4 w-4" /> Book this
                    </Button>
                    <Link href={result.href} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                      See details <ArrowRight className="h-4 w-4" />
                    </Link>
                    <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-primary">
                      <RotateCcw className="h-3 w-3" /> Try again
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
