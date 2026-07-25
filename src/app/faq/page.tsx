import type { Metadata } from "next";
import Link from "next/link";
import { faqs, salonInfo } from "@/lib/salon-data";
import { BookButton } from "@/components/site/book-button";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CalendarHeart,
  Mail,
  HelpCircle,
  MessageCircle,
} from "lucide-react";

const categories = Array.from(new Set(faqs.map((f) => f.category)));

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about appointments, pricing, cancellations and services at Lumière Beauty Lounge, San Francisco.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {

  return (
    <div className="flex flex-col">
      <PageHero
        eyebrow="Good to know"
        title="Frequently asked questions"
        description="Everything you need to know about booking, pricing, our services and what to expect at Lumière Beauty Lounge. Can't find what you're looking for? We're a quick call away."
        imageKey="salonReception"
        imageIndex={2}
      >
        <div className="flex flex-wrap items-center gap-3">
          <BookButton
            className="rounded-full bg-primary px-6 text-sm shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
          >
            <CalendarHeart className="mr-1.5 h-4 w-4" />
            Book now
          </BookButton>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-background/40 bg-background/10 px-6 text-sm text-background backdrop-blur-sm transition-colors hover:bg-background/20 hover:text-background"
          >
            <Link href="/contact">
              <Mail className="mr-1.5 h-4 w-4" />
              Contact us
            </Link>
          </Button>
        </div>
      </PageHero>

      <main className="bg-background py-6 md:py-10 lg:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {categories.map((category, cIdx) => {
            const items = faqs.filter((f) => f.category === category);
            return (
              <Reveal
                key={category}
                delay={cIdx * 60}
                as="section"
                className="mb-12 last:mb-0"
              >
                <div className="mb-5 flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <HelpCircle className="h-5 w-5" />
                  </span>
                  <h2 className="font-serif font-semibold tracking-tight text-foreground text-lg md:text-xl lg:text-2xl">
                    {category}
                  </h2>
                </div>
                <Accordion
                  type="single"
                  collapsible
                  className="flex flex-col gap-3"
                >
                  {items.map((f, i) => (
                    <AccordionItem
                      key={`${category}-${i}`}
                      value={`${category}-${i}`}
                      className="rounded-xl border border-border/70 bg-card px-5 shadow-sm last:border-b"
                    >
                      <AccordionTrigger className="text-left text-base font-medium text-foreground hover:no-underline">
                        {f.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground sm:text-base leading-snug md:leading-relaxed">
                        {f.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Reveal>
            );
          })}

          {/* Still have questions? */}
          <Reveal delay={120}>
            <section className="mt-8 md:mt-12 rounded-3xl bg-foreground text-center text-background p-4 md:p-6 lg:p-8">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-background/10">
                <MessageCircle className="h-6 w-6 text-salon-gold" />
              </span>
              <h2 className="mt-4 font-serif font-semibold text-lg md:text-xl lg:text-2xl">
                Still have questions?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-pretty text-sm text-background/80 sm:text-base leading-snug md:leading-relaxed">
                Our team is happy to help with anything you need — from service
                advice to booking the perfect stylist. Reach out and we'll get
                you sorted.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Button
                  asChild
                  className="rounded-full bg-background px-6 text-sm text-foreground transition-colors hover:bg-background/90"
                >
                  <Link href="/contact">Contact us</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-background/40 bg-transparent px-6 text-sm text-background transition-colors hover:bg-background/10 hover:text-background"
                >
                  <a href={`mailto:${salonInfo.email}`}>
                    <MessageCircle className="mr-1.5 h-4 w-4" />
                    Email us
                  </a>
                </Button>
              </div>
            </section>
          </Reveal>
        </div>
      </main>
    </div>
  );
}
