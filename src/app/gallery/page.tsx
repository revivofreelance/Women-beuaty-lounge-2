import type { Metadata } from "next";
import { GalleryClient } from "./gallery-client";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Before-and-after work from Lumière Beauty Lounge, San Francisco — hair, colour, bridal, nails and skin transformations by our stylists.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
