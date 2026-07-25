"use client";

import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface StarsProps {
  rating: number;
  size?: number;
  className?: string;
  showValue?: boolean;
}

export function Stars({ rating, size = 16, className, showValue = false }: StarsProps) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.4 && rating - full < 0.9;
  const empty = 5 - full - (hasHalf ? 1 : 0);
  return (
    <div className={cn("flex items-center gap-0.5", className)} aria-label={`Rating: ${rating} out of 5`}>
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f-${i}`} size={size} className="fill-amber-400 text-amber-400" />
      ))}
      {hasHalf && (
        <span className="relative inline-block" style={{ width: size, height: size }}>
          <Star size={size} className="text-amber-400" />
          <span className="absolute inset-0 overflow-hidden" style={{ width: size / 2 }}>
            <Star size={size} className="fill-amber-400 text-amber-400" />
          </span>
        </span>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e-${i}`} size={size} className="text-amber-400/35" />
      ))}
      {showValue && (
        <span className="ml-1.5 text-sm font-medium text-foreground/70">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
