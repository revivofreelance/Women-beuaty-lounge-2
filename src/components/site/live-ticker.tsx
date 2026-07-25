"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CalendarHeart, Star, Heart, Zap } from "lucide-react";

const ACTIVITIES = [
  { icon: CalendarHeart, text: "Jessica just booked a Balayage", color: "text-rose-500" },
  { icon: Star, text: "Meera completed a 5★ bridal trial", color: "text-amber-500" },
  { icon: Heart, text: "Sofia saved 3 looks to her mood board", color: "text-pink-500" },
  { icon: Sparkles, text: "New review: “Best facial in SF!”", color: "text-violet-500" },
  { icon: Zap, text: "Flash offer claimed: 20% off hair color", color: "text-orange-500" },
  { icon: CalendarHeart, text: "Olivia booked a Keratin treatment", color: "text-rose-500" },
  { icon: Star, text: "Kavya styled her 640th bride today", color: "text-amber-500" },
  { icon: Heart, text: "Priya's Hydra-Glow Facial: fully booked", color: "text-pink-500" },
];

/** A thin animated band that cycles through live salon activities — creates urgency + social proof. */
export function LiveTicker() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % ACTIVITIES.length), 3500);
    return () => clearInterval(id);
  }, []);

  const activity = ACTIVITIES[idx];
  const Icon = activity.icon;

  return (
    <div className="flex items-center justify-center gap-2.5 overflow-hidden border-y border-primary/15 bg-primary/5 px-4 py-2.5 text-sm">
      <span className="relative flex h-2 w-2 flex-shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
      </span>
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Live</span>
      <div className="h-3.5 w-px bg-border" />
      <div className="relative h-5 min-w-0 flex-1 max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex items-center gap-1.5"
          >
            <Icon className={`h-3.5 w-3.5 flex-shrink-0 ${activity.color}`} />
            <span className="truncate text-foreground/85">{activity.text}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
