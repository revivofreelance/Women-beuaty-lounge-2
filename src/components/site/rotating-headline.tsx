"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Scissors, Palette, Flower, Crown, Hand, Brush } from "lucide-react";

const PHRASES = [
  { text: "precision haircuts", icon: Scissors },
  { text: "hand-painted balayage", icon: Palette },
  { text: "bridal artistry", icon: Crown },
  { text: "glowing facials", icon: Flower },
  { text: "nail couture", icon: Hand },
  { text: "HD makeup", icon: Brush },
];

/** Rotating phrase that cycles through services — adds motion + curiosity to the hero. */
export function RotatingHeadline() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % PHRASES.length), 2600);
    return () => clearInterval(id);
  }, []);

  const phrase = PHRASES[idx];
  const Icon = phrase.icon;

  return (
    <span className="relative inline-flex min-w-[14ch] items-center gap-2 align-baseline">
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ y: 28, opacity: 0, rotateX: -40 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: -28, opacity: 0, rotateX: 40 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 text-salon-gold"
        >
          <Icon className="h-[0.8em] w-[0.8em]" />
          {phrase.text}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
