import type { Metadata } from "next";
import { OffersClient } from "./offers-client";

export const metadata: Metadata = {
  title: "Offers & Deals",
  description:
    "Current offers, seasonal deals and first-visit discounts at Lumière Beauty Lounge in Hayes Valley, San Francisco.",
  alternates: { canonical: "/offers" },
};

export default function OffersPage() {
  return <OffersClient />;
}
