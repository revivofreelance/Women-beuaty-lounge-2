import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./reveal";
import { getImage, type SalonImageKey } from "@/lib/salon-images";
import { ArrowRight } from "lucide-react";

const CATEGORIES: { name: string; img: SalonImageKey; idx: number; count: number; desc: string }[] = [
  { name: "Hair", img: "galleryHaircut", idx: 4, count: 6, desc: "Cuts, styling & blow-dries" },
  { name: "Hair Coloring", img: "galleryColor", idx: 8, count: 4, desc: "Global, highlights & balayage" },
  { name: "Hair Treatments", img: "hairTreatment", idx: 7, count: 3, desc: "Keratin, spa & repair" },
  { name: "Skin & Facial", img: "facial", idx: 7, count: 3, desc: "Facials & advanced skincare" },
  { name: "Spa & Massage", img: "spa", idx: 7, count: 3, desc: "Relaxing body therapies" },
  { name: "Makeup", img: "makeup", idx: 3, count: 2, desc: "Party, HD & editorial" },
  { name: "Bridal", img: "bridal", idx: 7, count: 3, desc: "Complete bridal looks" },
  { name: "Nails", img: "galleryNails", idx: 4, count: 3, desc: "Manicure, pedicure & nail art" },
];

/**
 * Category grid. Every tile shows its photo from the start — hover is only
 * polish, so touch and in-app webviews get the identical card.
 */
export function CategoryExplorer() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-4">
      {CATEGORIES.map((cat, i) => (
        <Reveal key={cat.name} delay={i * 60}>
          <Link
            href="/services"
            className="group relative block aspect-[5/4] overflow-hidden rounded-xl sm:aspect-square sm:rounded-2xl shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.98]"
          >
            <Image
              src={getImage(cat.img, cat.idx)}
              alt={cat.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/35 to-foreground/5 transition-opacity duration-300 group-hover:from-foreground/95" />

            {/* Count pill */}
            <span className="absolute right-1.5 top-1.5 rounded-full bg-background/90 px-1.5 py-0.5 text-[0.55rem] sm:right-2.5 sm:top-2.5 sm:px-2 sm:text-[0.6rem] font-bold uppercase tracking-wider text-foreground backdrop-blur-sm">
              {cat.count} services
            </span>

            <div className="absolute inset-x-0 bottom-0 flex flex-col p-2 text-background sm:p-3">
              <span className="font-serif text-sm font-semibold leading-tight sm:text-base md:text-lg">
                {cat.name}
              </span>
              <span className="mt-0.5 line-clamp-1 text-[0.6rem] text-background/85 sm:text-[0.65rem]">
                {cat.desc}
              </span>
              <span className="mt-1 hidden items-center gap-1 text-[0.65rem] font-semibold sm:mt-1.5 sm:flex uppercase tracking-wider text-salon-gold">
                Explore
                <ArrowRight className="h-2.5 w-2.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
