"use client";

import { create } from "zustand";

interface SalonState {
  // booking modal
  bookingOpen: boolean;
  bookingPresetService: string | null;
  bookingPresetStylist: string | null;
  openBooking: (preset?: { service?: string; stylist?: string }) => void;
  closeBooking: () => void;
  // mobile nav
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
}

export const useSalonStore = create<SalonState>((set) => ({
  bookingOpen: false,
  bookingPresetService: null,
  bookingPresetStylist: null,
  mobileNavOpen: false,
  openBooking: (preset) =>
    set({
      bookingOpen: true,
      bookingPresetService: preset?.service ?? null,
      bookingPresetStylist: preset?.stylist ?? null,
    }),
  closeBooking: () => set({ bookingOpen: false }),
  setMobileNavOpen: (open) => set({ mobileNavOpen: open }),
}));
