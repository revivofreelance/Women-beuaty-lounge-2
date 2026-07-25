"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { offers } from "@/lib/salon-data";
import { getImage } from "@/lib/salon-images";
import { useSalonStore } from "@/lib/store";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  CalendarHeart,
  Copy,
  Check,
  Tag,
  ArrowRight,
} from "lucide-react";

export function OffersClient() {
  const { openBooking } = useSalonStore();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      toast.success("Promo code copied", {
        description: `${code} is ready to use at checkout or on the phone.`,
      });
      window.setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast.error("Could not copy", {
        description: "Please copy the code manually.",
      });
    }
  };

  return (
    <div className="flex flex-col">
      <PageHero
        eyebrow="Offers & promotions"
        title="Save on your next visit"
        description="Current promotions across hair, skin, spa and bridal. Stack select offers with a Lumière membership for even bigger savings on the services you love."
        imageKey="hero"
        imageIndex={3}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={() => openBooking()}
            className="rounded-full bg-primary px-6 text-sm shadow-sm hover:bg-primary/90 hover:shadow-md"
          >
            <CalendarHeart className="mr-1.5 h-4 w-4" />
            Book now
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-background/40 bg-background/10 px-6 text-sm text-background backdrop-blur-sm hover:bg-background/20 hover:text-background"
          >
            <Link href="/membership">
              Membership perks
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </PageHero>

      {/* ============== OFFERS GRID ============== */}
      <section className="bg-background py-6 md:py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {offers.map((offer, i) => {
              const isCopied = copiedId === offer.id;
              return (
                <Reveal key={offer.id} delay={(i % 2) * 80}>
                  <Card className="group h-full overflow-hidden border-border/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    {/* Image */}
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={getImage(offer.imageKey, offer.imageIndex)}
                        alt={offer.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/40 to-foreground/10" />
                      <Badge className="absolute left-3 top-3 rounded-full bg-salon-gold px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-salon-espresso">
                        <Tag className="mr-1 h-3 w-3" />
                        {offer.badge}
                      </Badge>
                      <div className="absolute bottom-3 left-4 right-4">
                        <p className="font-serif font-bold text-background text-xl md:text-2xl lg:text-3xl">
                          {offer.discount}
                        </p>
                        <h3 className="mt-1 font-serif text-xl font-semibold text-background">
                          {offer.title}
                        </h3>
                      </div>
                    </div>

                    <CardContent className="flex flex-1 flex-col gap-4 p-4 md:p-5 lg:p-6">
                      <p className="text-sm text-muted-foreground leading-snug md:leading-relaxed">
                        {offer.description}
                      </p>
                      <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                        Valid:{" "}
                        <span className="text-foreground/80">
                          {offer.validUntil}
                        </span>
                      </p>

                      {/* Code box */}
                      <div className="flex items-center gap-3 rounded-xl border border-dashed border-primary/40 bg-primary/5 p-3">
                        <div className="flex-1">
                          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                            Code
                          </p>
                          <code className="font-mono text-sm font-bold uppercase tracking-wider text-primary">
                            {offer.code}
                          </code>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopy(offer.code, offer.id)}
                          className="rounded-full border-primary/40 px-3 text-xs hover:bg-primary/10 hover:text-primary"
                          aria-label={`Copy promo code ${offer.code}`}
                        >
                          {isCopied ? (
                            <>
                              <Check className="mr-1 h-3.5 w-3.5 text-emerald-600" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="mr-1 h-3.5 w-3.5" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>

                      <Button
                        onClick={() => openBooking()}
                        className="mt-1 rounded-full bg-primary px-5 text-sm shadow-sm hover:bg-primary/90 hover:shadow-md"
                      >
                        <CalendarHeart className="mr-1.5 h-4 w-4" />
                        Book with this offer
                      </Button>
                    </CardContent>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============== TERMS NOTE ============== */}
      <section className="bg-background pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-2xl border border-dashed border-border bg-secondary/30 p-4 md:p-5 lg:p-6">
              <h3 className="font-serif text-xl font-semibold text-foreground">
                Offer terms
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-snug md:leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                  Offers cannot be combined with other promotions unless
                  explicitly stated.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                  Discounts apply to the service total only and exclude
                  take-home products and gift card purchases.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                  Student offers require a valid student ID presented at
                  check-in.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                  New-client offers are valid on your first visit only.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                  Lumière Beauty Lounge reserves the right to modify or
                  withdraw offers at any time without prior notice.
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
