"use client";

import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface MarqueeRibbonProps {
  words: string[];
  /** rose = solid brand band, gold = soft gold band, dark = espresso band */
  variant?: "rose" | "gold" | "dark";
  /** small tilt gives the band an editorial, sticker-like feel */
  tilt?: boolean;
  className?: string;
}

/** Infinite scrolling editorial ribbon — the signature band between sections. */
export function MarqueeRibbon({ words, variant = "rose", tilt = false, className }: MarqueeRibbonProps) {
  const palette =
    variant === "rose"
      ? "bg-primary text-primary-foreground"
      : variant === "gold"
        ? "bg-salon-gold text-foreground"
        : "bg-foreground text-background";

  const row = (
    <div className="flex shrink-0 items-center">
      {words.map((w) => (
        <span key={w} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-serif text-lg font-semibold uppercase tracking-[0.22em] sm:text-xl">
            {w}
          </span>
          <Sparkles className="h-4 w-4 shrink-0 opacity-70" />
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn("relative", tilt && "z-10 -my-5 overflow-x-clip py-5", className)}>
      <div
        className={cn(
          "marquee-paused flex overflow-hidden py-3.5",
          palette,
          tilt && "-mx-2 rotate-[-1.2deg] shadow-lg shadow-foreground/10"
        )}
        style={{ "--marquee-duration": "36s" } as React.CSSProperties}
      >
        <div className="flex w-max animate-marquee-left">
          {row}
          {row}
        </div>
      </div>
    </div>
  );
}
