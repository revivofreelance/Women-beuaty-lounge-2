"use client";

import { useSalonStore } from "@/lib/store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { BookingWizard } from "@/components/site/booking-wizard";
import { CalendarHeart } from "lucide-react";

export function BookingModal() {
  const {
    bookingOpen,
    closeBooking,
    bookingPresetService,
    bookingPresetStylist,
  } = useSalonStore();

  return (
    <Dialog open={bookingOpen} onOpenChange={(o) => !o && closeBooking()}>
      <DialogContent className="max-h-[92vh] w-[95vw] max-w-2xl overflow-y-auto scroll-elegant p-0 sm:rounded-3xl">
        <DialogHeader className="border-b border-border/60 bg-cream-gradient px-6 py-5">
          <DialogTitle className="flex items-center gap-2 font-serif text-base sm:text-lg md:text-xl lg:text-2xl">
            <CalendarHeart className="h-5 w-5 text-primary" />
            Book an Appointment
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Choose your service, stylist and a time that suits you.
          </DialogDescription>
        </DialogHeader>

        {/* Radix unmounts closed dialog content, so a fresh mount resets the wizard. */}
        <BookingWizard
          presetService={bookingPresetService}
          presetStylist={bookingPresetStylist}
          onCancel={closeBooking}
          onFinish={closeBooking}
          className="px-6 py-4 sm:py-6"
        />
      </DialogContent>
    </Dialog>
  );
}
