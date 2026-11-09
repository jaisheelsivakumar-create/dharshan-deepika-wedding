"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Sparkles } from "lucide-react";
import { invitationData } from "@/data/invitation";
import { emitParticleBurst } from "@/lib/particleBus";
import { GoldDivider, GoldOrnament } from "@/components/ui/GoldOrnament";
import { useIsHydrated } from "@/lib/useMediaQuery";

gsap.registerPlugin(ScrollTrigger);

const BLESSINGS_STORAGE_KEY = "wedding_blessing_count";

function readStoredBlessingCount(): number {
  if (typeof window === "undefined") return invitationData.blessings.initialCount;
  try {
    const saved = localStorage.getItem(BLESSINGS_STORAGE_KEY);
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (!Number.isNaN(parsed) && parsed >= invitationData.blessings.initialCount) {
        return parsed;
      }
    }
  } catch {
    // ignore storage errors
  }
  return invitationData.blessings.initialCount;
}

interface BlessingsSectionProps {
  isOpened: boolean;
}

export default function BlessingsSection({ isOpened }: BlessingsSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const hydrated = useIsHydrated();
  const [localOffset, setLocalOffset] = useState(0);
  const [hasShowered, setHasShowered] = useState(false);

  const count = (hydrated ? readStoredBlessingCount() : invitationData.blessings.initialCount) + localOffset;

  useEffect(() => {
    if (!isOpened || !sectionRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-blessings-reveal]",
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.78,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isOpened]);

  const handleShowerBlessing = (e: React.MouseEvent<HTMLButtonElement>) => {
    const current = readStoredBlessingCount() + localOffset;
    const next = current + 1;
    setLocalOffset((prev) => prev + 1);
    setHasShowered(true);
    try {
      localStorage.setItem(BLESSINGS_STORAGE_KEY, String(next));
      setLocalOffset(0);
    } catch {
      // ignore if storage blocked; localOffset keeps state
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const tapX = e.clientX > 0 ? e.clientX : rect.left + rect.width * 0.5;
    const tapY = e.clientY > 0 ? e.clientY : rect.top + rect.height * 0.5;

    emitParticleBurst("blessing", { clientX: tapX, clientY: tapY });
  };

  return (
    <section
      id="blessings"
      ref={sectionRef}
      data-section="blessings"
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 flex flex-col items-center text-center"
    >
      <div className="w-full max-w-[720px] mx-auto flex flex-col items-center text-center">
        <div className="w-full rounded-3xl parchment-card p-7 sm:p-12 flex flex-col items-center text-center relative overflow-visible">
          <div data-blessings-reveal className="flex justify-center">
            <GoldOrnament />
          </div>

          <p
            data-blessings-reveal
            className="font-heading text-fluid-eyebrow uppercase text-[#855E14] font-bold mt-2"
          >
            {invitationData.blessings.subheading}
          </p>

          <h2
            data-blessings-reveal
            className="font-heading text-fluid-h2 font-bold text-[#6B1A1F] mt-2 text-balance"
          >
            {invitationData.blessings.heading}
          </h2>

          <div data-blessings-reveal className="my-3 w-full flex justify-center">
            <GoldDivider maxWidth="max-w-[160px]" />
          </div>

          <p
            data-blessings-reveal
            className="text-fluid-body text-[#6B1A1F]/85 italic max-w-lg mx-auto text-balance"
          >
            {invitationData.blessings.description}
          </p>

          {/* Big Tactile Heart Blessing Button (bursts render via R3F WebGL canvas) */}
          <div
            data-blessings-reveal
            className="relative mt-8 w-full flex flex-col items-center text-center"
          >
            <motion.button
              type="button"
              onClick={handleShowerBlessing}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.93 }}
              transition={{ type: "spring", stiffness: 360, damping: 20 }}
              aria-label="Shower your wedding blessings"
              className="group relative inline-flex items-center justify-center gap-2 sm:gap-3.5 min-h-[54px] sm:min-h-[60px] px-5 sm:px-9 py-3.5 sm:py-4 rounded-full bg-gradient-to-b from-[#7A1E24] to-[#561216] text-[#FDF8EE] border-2 border-[#B8892E] shadow-[0_14px_34px_rgba(107,26,31,0.34),inset_0_1px_0_rgba(255,235,180,0.3)] hover:border-[#DFBC6E] font-heading text-[11px] sm:text-base font-bold tracking-[0.07em] sm:tracking-[0.12em] uppercase whitespace-nowrap cursor-pointer select-none"
            >
              <motion.span
                animate={hasShowered ? { scale: [1, 1.35, 1] } : { scale: [1, 1.12, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.8,
                  ease: "easeInOut",
                }}
                className="inline-flex shrink-0"
              >
                <Heart
                  className="w-5 h-5 sm:w-6 sm:h-6 fill-[#F29AB6] text-[#DFBC6E]"
                  aria-hidden="true"
                />
              </motion.span>
              <span>
                {hasShowered
                  ? invitationData.blessings.showeredLabel
                  : invitationData.blessings.buttonLabel}
              </span>
              <Sparkles className="w-4 h-4 text-[#DFBC6E] shrink-0" aria-hidden="true" />
            </motion.button>

            <motion.p
              key={count}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="mt-4 inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#FDF8EE] border border-[#B8892E]/50 font-heading text-fluid-meta font-semibold text-[#6B1A1F] tracking-wide shadow-xs"
              suppressHydrationWarning
            >
              {count} blessings showered
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
