"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Scissors, Palette, Flower, Crown, Hand } from "lucide-react";
import { getImage } from "@/lib/salon-images";

const CHIPS = [
  { label: "Haircuts", slug: "womens-haircut-styling", icon: Scissors, img: "galleryHaircut" as const, idx: 5, pos: "top-[12%] right-[6%]", delay: 0 },
  { label: "Balayage", slug: "balayage-highlights", icon: Palette, img: "galleryColor" as const, idx: 7, pos: "top-[28%] right-[18%]", delay: 0.3 },
  { label: "Facials", slug: "signature-facial", icon: Flower, img: "facial" as const, idx: 6, pos: "top-[46%] right-[5%]", delay: 0.6 },
  { label: "Bridal", slug: "bridal-makeup", icon: Crown, img: "galleryBridal" as const, idx: 2, pos: "top-[62%] right-[16%]", delay: 0.9 },
  { label: "Nails", slug: "nail-art-design", icon: Hand, img: "galleryNails" as const, idx: 3, pos: "top-[78%] right-[7%]", delay: 1.2 },
];

/** Floating service chips that drift gently over the hero — invites exploration. Hidden on mobile. */
export function FloatingServiceChips() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
      {CHIPS.map((chip) => (
        <motion.div
          key={chip.label}
          className={`absolute ${chip.pos}`}
          initial={{ opacity: 0, scale: 0.6, x: 30 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: 0,
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { delay: chip.delay + 0.5, duration: 0.6 },
            scale: { delay: chip.delay + 0.5, duration: 0.6 },
            x: { delay: chip.delay + 0.5, duration: 0.6 },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: chip.delay },
          }}
        >
          <motion.div whileHover={{ scale: 1.08, y: -4 }}>
            <Link
              href={`/services/${chip.slug}`}
              className="pointer-events-auto flex items-center gap-2 rounded-full border border-background/30 bg-background/15 p-1.5 pr-3.5 text-background backdrop-blur-md transition-colors hover:bg-background/25"
            >
              <span className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-background/30">
                <Image
                  src={getImage(chip.img, chip.idx)}
                  alt={chip.label}
                  className="h-full w-full object-cover"
                  fill
                  sizes="36px"
                />
              </span>
              <span className="flex items-center gap-1.5 text-sm font-medium">
                <chip.icon className="h-3.5 w-3.5 text-salon-gold" />
                {chip.label}
              </span>
            </Link>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
