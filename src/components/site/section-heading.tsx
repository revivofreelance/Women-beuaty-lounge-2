"use client";

import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  light = false,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]",
            light ? "text-primary-foreground/80" : "text-salon-rose"
          )}
        >
          <span className={cn("h-px w-6", light ? "bg-primary-foreground/50" : "bg-salon-rose/50")} />
          {eyebrow}
          <span className={cn("h-px w-6", light ? "bg-primary-foreground/50" : "bg-salon-rose/50")} />
        </span>
      )}
      <h2
        className={cn(
          "font-serif font-semibold leading-tight tracking-tight text-xl md:text-2xl lg:text-3xl",
          light ? "text-primary-foreground" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-pretty text-base sm:text-lg leading-snug md:leading-relaxed",
            light ? "text-primary-foreground/80" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
