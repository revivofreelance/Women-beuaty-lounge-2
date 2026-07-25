"use client";

import { useState } from "react";
import { salonInfo } from "@/lib/salon-data";
import { useSalonStore } from "@/lib/store";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  MapPin,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CalendarHeart,
  Instagram,
  Facebook,
  Youtube,
  Navigation,
  CheckCircle2,
  Car,
} from "lucide-react";

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  subject: "General enquiry",
  message: "",
};

interface ContactCard {
  icon: typeof MapPin;
  title: string;
  lines: string[];
  href: string;
}

const contactCards: ContactCard[] = [
  {
    icon: MapPin,
    title: "Visit the salon",
    lines: [salonInfo.address.line1, salonInfo.address.line2],
    href: `https://www.google.com/maps?q=${encodeURIComponent(salonInfo.mapQuery)}`,
  },
  {
    icon: CalendarHeart,
    title: "Book online",
    lines: ["Real-time availability", "Instant confirmation"],
    href: "/book",
  },
  {
    icon: Mail,
    title: "Email us",
    lines: [salonInfo.email, salonInfo.bookingEmail],
    href: `mailto:${salonInfo.email}`,
  },
  {
    icon: MessageCircle,
    title: "Message us",
    lines: ["@lumierebeauty on Instagram", "Replies 9 AM – 9 PM"],
    href: salonInfo.social.instagram,
  },
];

interface SocialLink {
  icon: typeof Instagram;
  label: string;
  href: string;
}

const socials: SocialLink[] = [
  { icon: Instagram, label: "Instagram", href: salonInfo.social.instagram },
  { icon: Facebook, label: "Facebook", href: salonInfo.social.facebook },
  { icon: Youtube, label: "YouTube", href: salonInfo.social.youtube },
];

export function ContactClient() {
  const { openBooking } = useSalonStore();
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const update = (k: keyof FormState, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.ok) {
        toast.success("Message sent!", {
          description: "We'll get back to you within 24 hours.",
        });
        setDone(true);
      } else {
        toast.error("Could not send message", {
          description: data.error || "Please try again in a moment.",
        });
      }
    } catch {
      toast.error("Network error", {
        description: "Please check your connection and try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setDone(false);
  };

  return (
    <div className="flex flex-col">
      <PageHero
        eyebrow="Get in touch"
        title="We'd love to hear from you"
        description="Questions, feedback or just saying hello — drop us a line and our team will respond within 24 hours. For appointment requests, use the booking button below."
        imageKey="salonReception"
        imageIndex={1}
      >
        <Button
          onClick={() => openBooking()}
          className="h-8 rounded-full bg-primary px-4 text-xs sm:h-9 sm:px-6 sm:text-sm shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
        >
          <CalendarHeart className="mr-1.5 h-4 w-4" />
          Book appointment
        </Button>
      </PageHero>

      <main className="bg-background py-4 sm:py-6 md:py-8 lg:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
            {/* LEFT — info */}
            <Reveal>
              <section className="flex flex-col">
                <h2 className="font-serif font-semibold tracking-tight text-foreground text-base sm:text-lg md:text-xl lg:text-2xl">
                  Visit, book or message
                </h2>
                <p className="mt-2 max-w-md text-pretty text-xs text-muted-foreground sm:mt-3 sm:text-base leading-snug md:leading-relaxed">
                  However you like to reach us, we're here. Drop by the salon, book
                  online, or send a quick message — whatever's easiest for you.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-2.5 sm:gap-4">
                  {contactCards.map((c) => (
                    <Card
                      key={c.title}
                      className="gap-0 border-border/70 py-2.5 shadow-sm sm:py-5"
                    >
                      <CardContent className="flex flex-col gap-1.5 sm:gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full sm:h-10 sm:w-10 bg-primary/10 text-primary">
                          <c.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                        </span>
                        <div>
                          <p className="text-[0.7rem] font-semibold leading-tight text-foreground sm:text-sm">
                            {c.title}
                          </p>
                          <div className="mt-1 flex flex-col gap-0.5">
                            {c.lines.map((line) => (
                              <span
                                key={line}
                                className="text-[0.65rem] text-muted-foreground sm:text-sm"
                              >
                                {line}
                              </span>
                            ))}
                          </div>
                        </div>
                        <a
                          href={c.href}
                          target={c.href.startsWith("http") ? "_blank" : undefined}
                          rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="mt-0.5 inline-flex items-center gap-1 text-[0.6rem] font-medium text-primary hover:underline sm:mt-1 sm:text-xs"
                        >
                          {c.href.startsWith("mailto:")
                            ? "Send email"
                            : c.href.startsWith("/book")
                              ? "Start booking"
                              : c.href.includes("instagram")
                                ? "Open Instagram"
                                : "Get directions"}
                          {" →"}
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Opening hours */}
                <Card className="mt-2.5 border-border/70 py-2.5 shadow-sm sm:mt-4 sm:py-5">
                  <CardContent className="flex flex-col gap-1.5 sm:gap-3">
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary sm:h-9 sm:w-9">
                        <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                      </span>
                      <p className="text-[0.7rem] font-semibold leading-tight text-foreground sm:text-sm">
                        Opening hours
                      </p>
                    </div>
                    <ul className="divide-y divide-border/60 text-[0.7rem] sm:text-sm">
                      {salonInfo.hours.map((h) => (
                        <li
                          key={h.day}
                          className="flex items-center justify-between gap-2 py-1.5 sm:gap-3 sm:py-2"
                        >
                          <span className="font-medium text-foreground">
                            {h.day}
                          </span>
                          <span className="flex items-center gap-1.5 text-muted-foreground sm:gap-2">
                            <span>
                              {h.open} – {h.close}
                            </span>
                            {h.note && (
                              <span className="rounded-full bg-secondary px-1.5 py-0 text-[0.55rem] font-semibold uppercase tracking-wide text-secondary-foreground sm:px-2 sm:py-0.5 sm:text-[0.65rem]">
                                {h.note}
                              </span>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Getting here */}
                <Card className="mt-2.5 border-border/70 py-2.5 shadow-sm sm:mt-4 sm:py-5">
                  <CardContent className="flex flex-col gap-1.5 sm:gap-3">
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary sm:h-9 sm:w-9">
                        <Car className="h-4 w-4 sm:h-5 sm:w-5" />
                      </span>
                      <p className="text-[0.7rem] font-semibold leading-tight text-foreground sm:text-sm">
                        Getting here
                      </p>
                    </div>
                    <ul className="flex flex-col gap-1.5 sm:gap-2">
                      {salonInfo.landmarks.map((lm) => (
                        <li
                          key={lm}
                          className="flex items-start gap-1.5 text-[0.7rem] text-muted-foreground sm:gap-2 sm:text-sm"
                        >
                          <Navigation className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                          <span>{lm}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Social */}
                <div className="mt-4 flex flex-wrap items-center gap-2 sm:mt-6 sm:gap-3">
                  <span className="text-xs font-medium text-foreground sm:text-sm">
                    Follow us:
                  </span>
                  <div className="flex items-center gap-2">
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-card text-foreground/70 transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        <s.icon className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </section>
            </Reveal>

            {/* RIGHT — form */}
            <Reveal delay={80}>
              <section className="flex flex-col">
                <Card className="border-border/70 p-3 sm:p-6 md:p-7 shadow-sm">
                  <CardContent className="p-0">
                    {done ? (
                      <div className="flex flex-col items-center py-4 sm:py-6 text-center">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 sm:h-16 sm:w-16">
                          <CheckCircle2 className="h-6 w-6 sm:h-9 sm:w-9" />
                        </span>
                        <h3 className="mt-3 font-serif font-semibold text-foreground text-sm sm:mt-5 sm:text-lg md:text-xl lg:text-2xl">
                          Message sent!
                        </h3>
                        <p className="mx-auto mt-1.5 max-w-sm text-xs text-muted-foreground sm:mt-2 sm:text-sm">
                          Thanks for reaching out, {form.name.split(" ")[0] || "friend"}.
                          A member of our team will respond within 24 hours.
                        </p>
                        <Button
                          onClick={resetForm}
                          variant="outline"
                          className="mt-4 h-8 rounded-full text-xs sm:mt-6 sm:h-9 sm:text-sm"
                        >
                          Send another
                        </Button>
                      </div>
                    ) : (
                      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:gap-4">
                        <div className="flex flex-col gap-1">
                          <h3 className="font-serif text-sm font-semibold leading-tight text-foreground sm:text-xl">
                            Send us a message
                          </h3>
                          <p className="text-[0.7rem] text-muted-foreground sm:text-sm">
                            Fields marked with * are required.
                          </p>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                          <div className="flex flex-col gap-1.5">
                            <Label htmlFor="c-name" className="text-xs font-medium sm:text-sm">
                              Name *
                            </Label>
                            <Input
                              id="c-name"
                              value={form.name}
                              onChange={(e) => update("name", e.target.value)}
                              required
                              placeholder="Your full name"
                              className="h-10 rounded-xl text-sm sm:h-11"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <Label htmlFor="c-phone" className="text-xs font-medium sm:text-sm">
                              Phone
                            </Label>
                            <Input
                              id="c-phone"
                              value={form.phone}
                              onChange={(e) => update("phone", e.target.value)}
                              placeholder="Your mobile number"
                              className="h-10 rounded-xl text-sm sm:h-11"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <Label htmlFor="c-email" className="text-xs font-medium sm:text-sm">
                            Email *
                          </Label>
                          <Input
                            id="c-email"
                            type="email"
                            value={form.email}
                            onChange={(e) => update("email", e.target.value)}
                            required
                            placeholder="you@email.com"
                            className="h-10 rounded-xl text-sm sm:h-11"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <Label htmlFor="c-subject" className="text-xs font-medium sm:text-sm">
                            Subject
                          </Label>
                          <Input
                            id="c-subject"
                            value={form.subject}
                            onChange={(e) => update("subject", e.target.value)}
                            placeholder="General enquiry"
                            className="h-10 rounded-xl text-sm sm:h-11"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <Label htmlFor="c-message" className="text-xs font-medium sm:text-sm">
                            Message *
                          </Label>
                          <Textarea
                            id="c-message"
                            value={form.message}
                            onChange={(e) => update("message", e.target.value)}
                            required
                            placeholder="Tell us how we can help…"
                            className="min-h-[90px] rounded-xl text-sm sm:min-h-[120px]"
                          />
                        </div>

                        <Button
                          type="submit"
                          disabled={submitting}
                          className="mt-1 h-10 w-full rounded-full bg-primary text-xs transition-colors hover:bg-primary/90 sm:h-11 sm:text-sm"
                        >
                          {submitting ? "Sending…" : "Send message"}
                          {!submitting && <Send className="ml-1.5 h-4 w-4" />}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>

                {/* Map */}
                <div className="mt-4 overflow-hidden rounded-2xl border border-border/70 sm:mt-5">
                  <iframe
                    title="Lumière Beauty Lounge location"
                    src={salonInfo.mapEmbed}
                    className="h-44 w-full sm:h-60 md:h-72"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </section>
            </Reveal>
          </div>
        </div>
      </main>
    </div>
  );
}
