"use client";

import { useEffect, useRef, useState } from "react";

interface StatCounterProps {
  value: number;
  /** rendered after the number, e.g. "+", "★" */
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

/** Counts up from 0 when scrolled into view. */
export function StatCounter({ value, suffix = "", decimals = 0, duration = 1600, className }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || startedRef.current) return;
        startedRef.current = true;
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min((t - t0) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(value * eased);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  const formatted = display.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {formatted}
      {suffix}
    </span>
  );
}
