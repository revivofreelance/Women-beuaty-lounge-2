"use client";

import { Button } from "@/components/ui/button";
import { useSalonStore } from "@/lib/store";

type BookButtonProps = React.ComponentProps<typeof Button> & {
  /** Service slug to preselect in the booking modal. */
  service?: string;
  /** Stylist slug to preselect in the booking modal. */
  stylist?: string;
};

/**
 * Opens the booking modal. Exists so pages that only needed the store for a
 * "Book Now" button can stay server components.
 */
export function BookButton({ service, stylist, ...props }: BookButtonProps) {
  const openBooking = useSalonStore((s) => s.openBooking);
  return <Button {...props} onClick={() => openBooking({ service, stylist })} />;
}
