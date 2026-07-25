"use client";

import Link from "next/link";
import { salonInfo, services } from "@/lib/salon-data";
import {
  MapPin, Mail, Clock, Instagram, Facebook, Youtube,
  Sparkles, ArrowRight, Heart,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useSalonStore } from "@/lib/store";

const quickLinks: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Team", href: "/team" },
  { label: "Gallery", href: "/gallery" },
  { label: "Pricing", href: "/pricing" },
  { label: "Packages", href: "/packages" },
  { label: "Offers", href: "/offers" },
  { label: "Blog & Tips", href: "/blog" },
  { label: "FAQs", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const { openBooking } = useSalonStore();
  const [email, setEmail] = useState("");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Thanks for subscribing!", {
      description: "Beauty tips & exclusive offers are on their way.",
    });
    setEmail("");
  };

  return (
    <footer className="mt-auto border-t border-border/60 bg-foreground text-background">
      {/* pb-24 on mobile clears the fixed bottom navigation bar (lg:hidden) */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 md:pt-8 lg:pt-10 pb-24 md:pb-8 lg:pb-10">
        {/* Newsletter */}
        <div className="mb-8 md:mb-12 grid gap-5 md:gap-6 rounded-3xl bg-background/5 ring-1 ring-background/10 lg:grid-cols-2 lg:items-center lg:gap-10 p-4 md:p-5 lg:p-6">
          <div>
            <h3 className="font-serif font-semibold text-background text-lg md:text-xl lg:text-2xl">
              Beauty in your inbox
            </h3>
            <p className="mt-2 text-sm text-background/70 sm:text-base">
              Monthly beauty tips, member-only offers and seasonal inspiration. No spam, ever.
            </p>
          </div>
          <form onSubmit={subscribe} className="flex flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 border-background/20 bg-background/10 text-background placeholder:text-background/50 focus-visible:ring-background/40"
              aria-label="Email address"
            />
            <Button type="submit" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
              Subscribe
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </form>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
          {/* Brand */}
          <div className="lg:pr-6">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Sparkles className="h-5 w-5" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-serif text-lg font-semibold">Lumière</span>
                <span className="text-[0.6rem] font-medium uppercase tracking-[0.25em] text-background/60">Beauty Lounge</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-background/70 leading-snug md:leading-relaxed">
              {salonInfo.tagline}. San Francisco's home for expert hair, skin, bridal, spa & nail services since {salonInfo.established}.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a href={salonInfo.social.instagram} aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full bg-background/10 text-background/80 transition-colors hover:bg-primary hover:text-primary-foreground">
                <Instagram className="h-4 w-4" />
              </a>
              <a href={salonInfo.social.facebook} aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full bg-background/10 text-background/80 transition-colors hover:bg-primary hover:text-primary-foreground">
                <Facebook className="h-4 w-4" />
              </a>
              <a href={salonInfo.social.youtube} aria-label="YouTube" className="flex h-9 w-9 items-center justify-center rounded-full bg-background/10 text-background/80 transition-colors hover:bg-primary hover:text-primary-foreground">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-serif text-base font-semibold text-background">Explore</h4>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-background/70 transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-base font-semibold text-background">Top Services</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.filter((s) => s.popular).slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-background/70 transition-colors hover:text-primary">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-base font-semibold text-background">Visit Us</h4>
            <ul className="mt-4 space-y-3 text-sm text-background/70">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <span>{salonInfo.address.line1}, {salonInfo.address.line2}</span>
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <a href={`mailto:${salonInfo.email}`} className="hover:text-primary">{salonInfo.email}</a>
              </li>
              <li className="flex gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <span>Mon–Sat: 9 AM – 9 PM<br />Sun: 10 AM – 5 PM</span>
              </li>
            </ul>
            <Button onClick={() => openBooking()} size="sm" className="mt-5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
              Book Appointment
            </Button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 md:mt-12 flex flex-col items-center justify-between gap-4 border-t border-background/10 pt-6 text-xs text-background/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Lumière Beauty Lounge. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/faq" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/faq" className="hover:text-primary">Terms & Conditions</Link>
            <span className="flex items-center gap-1">
              Made with <Heart className="h-3 w-3 fill-primary text-primary" /> in San Francisco
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
