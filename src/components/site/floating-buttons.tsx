"use client";

import { useSalonStore } from "@/lib/store";
import { salonInfo } from "@/lib/salon-data";
import { CalendarHeart, MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function FloatingButtons() {
  const { openBooking } = useSalonStore();
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const waText = encodeURIComponent(
    "Hi Lumière Beauty Lounge! I'd like to book an appointment."
  );

  return (
    <>
      {/* WhatsApp — always visible bottom-right */}
      <a
        href={`https://wa.me/${salonInfo.whatsappRaw}?text=${waText}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-[5.25rem] right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-110 md:bottom-5 sm:h-14 sm:w-14"
      >
        <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-20" />
      </a>

      {/* Sticky Book bar — appears after scroll, above WhatsApp */}
      <div
        className={cn(
          // Hidden on phones (<768): the mobile bottom nav already has a Book action,
          // so this full-width bar would collide with it. Desktop pill unchanged.
          "max-md:hidden fixed bottom-0 left-0 right-0 z-40 transition-all duration-300 sm:bottom-5 sm:left-5 sm:right-auto sm:rounded-full",
          show && !dismissed
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-full opacity-0 sm:translate-y-0"
        )}
      >
        <div className="flex items-center gap-3 bg-primary px-4 py-3 text-primary-foreground shadow-xl shadow-black/20 sm:rounded-full sm:pr-2">
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="text-xs font-medium uppercase tracking-wider text-primary-foreground/80">
              Ready to glow?
            </span>
            <span className="text-sm font-semibold">Book your appointment</span>
          </div>
          <button
            onClick={() => openBooking()}
            className="flex items-center gap-1.5 rounded-full bg-primary-foreground px-4 py-2 text-sm font-semibold text-primary transition-transform hover:scale-105"
          >
            <CalendarHeart className="h-4 w-4" />
            Book Now
          </button>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss"
            className="ml-1 hidden h-7 w-7 items-center justify-center rounded-full text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground sm:flex"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
}
