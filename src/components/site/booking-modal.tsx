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
      <DialogContent className="max-h-[92vh] w-[95vw] max-w-2xl overflow-y-auto scroll-elegant rounded-2xl p-0 sm:rounded-3xl">
        <DialogHeader className="border-b border-border/60 bg-cream-gradient px-4 py-3 sm:px-6 sm:py-5">
          <DialogTitle className="flex items-center gap-2 font-serif text-sm sm:text-lg md:text-xl lg:text-2xl">
            <CalendarHeart className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
            Book an Appointment
          </DialogTitle>
          <DialogDescription className="text-[0.65rem] leading-snug text-muted-foreground sm:text-sm">
            Choose your service, stylist and a time that suits you.
          </DialogDescription>
        </DialogHeader>

        {/* Radix unmounts closed dialog content, so a fresh mount resets the wizard. */}
        <BookingWizard
          presetService={bookingPresetService}
          presetStylist={bookingPresetStylist}
          onCancel={closeBooking}
          onFinish={closeBooking}
          className="px-3 py-3 sm:px-6 sm:py-6"
        />
      </DialogContent>
    </Dialog>
  );
}
