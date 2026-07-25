import type { Metadata } from "next";
import { ServicesClient } from "./services-client";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Browse every service at Lumière Beauty Lounge, San Francisco — hair, colouring, skin, nails, makeup, bridal and spa, with pricing and duration.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
