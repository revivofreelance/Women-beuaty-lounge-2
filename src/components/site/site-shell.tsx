"use client";

import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { FloatingButtons } from "@/components/site/floating-buttons";
import { BookingModal } from "@/components/site/booking-modal";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning silences the Radix UI aria-controls ID mismatch
    // (server-generated IDs differ from client — harmless, components work fine)
    <div className="flex min-h-screen flex-col" suppressHydrationWarning>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <BookingModal />
      <FloatingButtons />
    </div>
  );
}
