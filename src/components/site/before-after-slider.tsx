"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { MoveHorizontal } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  alt?: string;
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = "Before",
  afterLabel = "After",
  className,
  alt = "Before and after transformation",
}: BeforeAfterSliderProps) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!draggingRef.current) return;
      updateFromClientX(e.clientX);
    };
    const onTouch = (e: TouchEvent) => {
      if (!draggingRef.current) return;
      if (e.touches[0]) updateFromClientX(e.touches[0].clientX);
    };
    const onUp = () => {
      draggingRef.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouch, { passive: false });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onUp);
    };
  }, [updateFromClientX]);

  const startDrag = (clientX: number) => {
    draggingRef.current = true;
    updateFromClientX(clientX);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative aspect-[4/3] w-full select-none overflow-hidden rounded-2xl bg-muted",
        className
      )}
      onMouseDown={(e) => startDrag(e.clientX)}
      onTouchStart={(e) => e.touches[0] && startDrag(e.touches[0].clientX)}
      role="slider"
      aria-label="Before and after comparison slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
        if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
      }}
    >
      {/* After image (base layer, full width) */}
      <Image
        src={afterSrc}
        alt={`${alt} — after`}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <span className="absolute right-3 top-3 z-10 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-sm">
        {afterLabel}
      </span>

      {/* Before image (clipped via clip-path — no ref access during render) */}
      <Image
        src={beforeSrc}
        alt={`${alt} — before`}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        draggable={false}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <span
        className="absolute left-3 top-3 z-10 rounded-full bg-foreground/80 px-3 py-1 text-xs font-semibold text-background shadow-sm"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        {beforeLabel}
      </span>

      {/* Divider + handle */}
      <div
        className="absolute inset-y-0 z-20 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)]"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-lg ring-1 ring-black/5">
          <MoveHorizontal className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
