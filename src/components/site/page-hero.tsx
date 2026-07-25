"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { getImage, type SalonImageKey } from "@/lib/salon-images";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  imageKey: SalonImageKey;
  imageIndex?: number;
  align?: "left" | "center";
  children?: React.ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  description,
  imageKey,
  imageIndex = 0,
  align = "left",
  children,
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-border/60">
      <div className="absolute inset-0 -z-10">
        <Image
          src={getImage(imageKey, imageIndex)}
          alt=""
          className="h-full w-full object-cover"
          priority
          fetchPriority="high"
          fill
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
      </div>
      <div
        className={cn(
          "mx-auto flex min-h-[32vh] max-w-7xl flex-col justify-center px-4 sm:min-h-[44vh] sm:px-6 lg:min-h-[50vh] lg:px-8 py-5 sm:py-6 md:py-10 lg:py-16",
          align === "center" && "items-center text-center"
        )}
      >
        <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto")}>
          {eyebrow && (
            <span className="inline-flex items-center gap-2 rounded-full bg-background/15 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-background backdrop-blur-sm ring-1 ring-background/20 sm:px-4 sm:py-1.5 sm:text-xs">
              {eyebrow}
            </span>
          )}
          <h1 className="mt-2.5 font-serif font-semibold leading-tight tracking-tight text-background text-lg sm:mt-4 sm:text-xl md:text-2xl lg:text-3xl">
            {title}
          </h1>
          {description && (
            <p className="mt-2 max-w-xl text-pretty text-xs text-background/85 sm:mt-4 sm:text-lg leading-snug md:leading-relaxed">
              {description}
            </p>
          )}
          {children && <div className="mt-4 sm:mt-7">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}
