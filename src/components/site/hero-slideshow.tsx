"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface HeroSlideshowProps {
  images: string[];
  alt: string;
  /** ms between crossfades */
  interval?: number;
}

/**
 * Full-bleed crossfading slideshow with a slow Ken Burns zoom.
 * First frame is eager (LCP); the rest are lazy and only the slides adjacent
 * to the active one stay mounted.
 */
export function HeroSlideshow({ images, alt, interval = 6500 }: HeroSlideshowProps) {
  const [active, setActive] = useState(0);
  const count = images.length;

  useEffect(() => {
    if (count < 2) return;
    const id = setInterval(() => setActive((i) => (i + 1) % count), interval);
    return () => clearInterval(id);
  }, [count, interval]);

  // Keep the outgoing and incoming slides mounted so the crossfade has
  // something to fade between; slide 0 stays for the eager LCP frame.
  const mounted = (i: number) =>
    i === 0 ||
    i === active ||
    i === (active + 1) % count ||
    i === (active - 1 + count) % count;

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {images.map((src, i) => {
        if (!mounted(i)) return null;
        const isActive = i === active;
        return (
          <Image
            key={src}
            src={src}
            alt={i === 0 ? alt : ""}
            aria-hidden={i !== 0}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-[1800ms] ease-in-out",
              isActive ? "animate-kenburns opacity-100" : "opacity-0"
            )}
            priority={i === 0}
            fetchPriority={i === 0 ? "high" : "auto"}
            fill
            sizes="100vw"
          />
        );
      })}
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/55 to-foreground/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
      <div className="grain-overlay" />
    </div>
  );
}
