import type { Metadata } from "next";
import { Reveal } from "@/components/site/reveal";
import { Badge } from "@/components/ui/badge";
import { BookingPanel } from "./booking-panel";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Book your appointment at Lumière Beauty Lounge in Hayes Valley, San Francisco. Choose your service, stylist and time in under two minutes.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <div className="flex flex-col bg-blush">
      {/* LIGHT HERO */}
      <section className="bg-blush text-center py-5 sm:py-6 md:py-10 lg:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Badge
              variant="secondary"
              className="rounded-full bg-background/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary shadow-sm"
            >
              Booking
            </Badge>
            <h1 className="mt-4 font-serif font-semibold tracking-tight text-foreground text-base sm:text-lg md:text-xl lg:text-2xl">
              Book your appointment
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-pretty text-xs text-muted-foreground sm:text-lg leading-snug md:leading-relaxed">
              Choose your service, stylist and time. Takes under two minutes.
            </p>
          </Reveal>
        </div>
      </section>

      {/* MAIN BOOKING CARD */}
      <section className="bg-blush pb-10 sm:pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <BookingPanel />
        </div>
      </section>
    </div>
  );
}
