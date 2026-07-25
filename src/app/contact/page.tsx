import type { Metadata } from "next";
import { ContactClient } from "./contact-client";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Visit or call Lumière Beauty Lounge at 248 Hayes Street, San Francisco. Opening hours, directions, parking and enquiry form.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactClient />;
}
