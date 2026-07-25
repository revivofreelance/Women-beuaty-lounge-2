"use client";

import Image from "next/image";
import { testimonials } from "@/lib/salon-data";
import { getImage } from "@/lib/salon-images";
import { Stars } from "./stars";
import { Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function Row({ items, direction, duration }: { items: typeof testimonials; direction: "left" | "right"; duration: string }) {
  const cards = (
    <div className="flex shrink-0 gap-3 pr-3 sm:gap-5 sm:pr-5">
      {items.map((t) => (
        <figure
          key={t.id}
          className="flex w-[260px] shrink-0 flex-col rounded-2xl border border-border/70 bg-card shadow-sm transition-shadow hover:shadow-lg sm:w-[360px] p-3 md:p-4 lg:p-5"
        >
          <div className="flex items-center justify-between">
            <Quote className="h-6 w-6 text-primary/35" />
            <Badge variant="secondary" className="text-xs">{t.source}</Badge>
          </div>
          <blockquote className="mt-3 flex-1 text-pretty text-sm text-foreground/85 leading-snug md:leading-relaxed">
            “{t.text}”
          </blockquote>
          <figcaption className="mt-4 flex items-center gap-3 border-t border-border/60 pt-3.5">
            <Image
              src={getImage(t.imageKey, t.imageIndex)}
              alt={t.name}
              className="h-8 w-8 md:h-10 md:w-10 rounded-full object-cover"
              width={40}
              height={40}
            />
            <div className="flex-1">
              <p className="text-sm font-semibold">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.service} · {t.date}</p>
            </div>
            <Stars rating={t.rating} size={12} />
          </figcaption>
        </figure>
      ))}
    </div>
  );

  return (
    <div
      className="marquee-paused flex overflow-hidden"
      style={{ "--marquee-duration": duration } as React.CSSProperties}
    >
      <div className={`flex w-max ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}>
        {cards}
        {cards}
      </div>
    </div>
  );
}

/** Two counter-scrolling rows of client love — pauses on hover. */
export function TestimonialMarquee() {
  const top = testimonials.slice(0, 6);
  const bottom = testimonials.slice(6, 12);

  return (
    <div className="relative flex flex-col gap-3 sm:gap-5">
      {/* Edge fade so cards dissolve at the sides */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-28" />
      <Row items={top} direction="left" duration="55s" />
      <Row items={bottom} direction="right" duration="65s" />
    </div>
  );
}
