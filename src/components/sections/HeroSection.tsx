"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ChevronDown, Sparkles } from "lucide-react";
import { invitationData } from "@/data/invitation";
import { MotionButton } from "@/components/ui/MotionButton";
import { GoldDivider } from "@/components/ui/GoldOrnament";

interface HeroSectionProps {
  isOpened: boolean;
}

export default function HeroSection({ isOpened }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpened || !containerRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-line]",
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.52,
          stagger: 0.05,
          ease: "power3.out",
          delay: 0.04,
          clearProps: "transform,opacity",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isOpened]);

  const scrollToDetails = () => {
    const el = document.getElementById("couple-families");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      data-section="hero"
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-start sm:justify-center text-center px-3 sm:px-6 pt-2.5 sm:pt-4 md:pt-3 lg:pt-4 pb-[26vh] sm:pb-[33vh] md:pb-[38vh] lg:pb-[39vh]"
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={isOpened ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[720px] mx-auto rounded-3xl parchment-card-hero px-3.5 py-3.5 sm:px-8 sm:py-6 md:px-9 md:py-6 flex flex-col items-center text-center"
      >
        {/* Telugu Ganesh Shloka (3 independently animated lines) */}
        <div
          lang="te"
          className="w-full max-w-xl mx-auto flex flex-col items-center text-center px-1"
        >
          {invitationData.invocations.shlokaLines.map((line, index) => (
            <p
              key={index}
              data-hero-line
              className={
                index === 0
                  ? "font-telugu text-fluid-shloka-lead font-bold text-[#6B1A1F] tracking-wide text-balance mb-0.5"
                  : "font-telugu text-fluid-shloka font-semibold text-[#6B1A1F]/95 text-balance max-w-full"
              }
            >
              {line}
            </p>
          ))}
        </div>

        {/* Subhamasthu */}
        <p
          data-hero-line
          className="font-heading text-fluid-eyebrow uppercase text-[#855E14] font-bold mt-2 sm:mt-3"
        >
          {invitationData.invocations.subhamasthu}
        </p>

        {/* The Wedding Invitation Of */}
        <p
          data-hero-line
          className="font-heading text-fluid-eyebrow uppercase text-[#6B1A1F]/85 font-semibold mt-0.5 sm:mt-1"
        >
          {invitationData.invocations.label}
        </p>

        {/* Ornament Divider */}
        <div data-hero-line className="my-1.5 sm:my-2.5 w-full flex justify-center">
          <GoldDivider maxWidth="max-w-[190px]" />
        </div>

        {/* Couple Names: stacked cleanly on narrow mobile, horizontal single-line on sm+ for ideal hero proportions */}
        <div
          data-hero-line
          className="w-full flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-4 text-center my-0 sm:my-1"
        >
          <h1 className="font-script text-fluid-names text-[#6B1A1F] font-normal tracking-normal leading-tight">
            {invitationData.couple.groom.name}
          </h1>

          <div className="flex items-center justify-center gap-2.5 sm:gap-0 w-full max-w-[140px] sm:w-auto sm:max-w-none">
            <span className="h-px flex-1 bg-[#B8892E]/70 sm:hidden" />
            <span className="font-body italic text-lg sm:text-3xl text-[#855E14] font-semibold px-1">
              &amp;
            </span>
            <span className="h-px flex-1 bg-[#B8892E]/70 sm:hidden" />
          </div>

          <p className="font-script text-fluid-names text-[#6B1A1F] font-normal tracking-normal leading-tight">
            {invitationData.couple.bride.name}
          </p>
        </div>

        {/* Opening Invite Line */}
        <p
          data-hero-line
          className="text-fluid-lead text-[#6B1A1F]/90 italic max-w-lg mx-auto mt-1.5 sm:mt-2.5 px-1 text-balance"
        >
          {invitationData.hero.openingQuote}
        </p>

        {/* Venue Name & City */}
        <div
          data-hero-line
          className="mt-2 sm:mt-3.5 pt-2 sm:pt-3 border-t border-[#B8892E]/35 w-full max-w-md flex flex-col items-center text-center"
        >
          <p className="font-heading font-bold text-fluid-lead text-[#6B1A1F] tracking-[0.08em] uppercase text-balance">
            {invitationData.hero.venueName}
          </p>
          <p className="font-body text-fluid-meta text-[#6B1A1F]/80 tracking-[0.14em] uppercase mt-0.5 font-medium">
            {invitationData.hero.city}
          </p>
        </div>

        {/* Two Action Buttons (All >= 48px, Maroon with Gold Border) */}
        <div
          data-hero-line
          className="mt-2.5 sm:mt-5 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3.5 w-full"
        >
          <MotionButton
            onClick={scrollToDetails}
            className="w-full sm:w-auto"
          >
            <Sparkles className="w-4 h-4 text-[#DFBC6E]" aria-hidden="true" />
            <span>{invitationData.hero.ctaButtonText}</span>
          </MotionButton>

          <MotionButton
            onClick={scrollToDetails}
            className="w-full sm:w-auto"
          >
            <span>{invitationData.hero.scrollText}</span>
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="inline-flex"
            >
              <ChevronDown className="w-4 h-4 text-[#DFBC6E]" aria-hidden="true" />
            </motion.span>
          </MotionButton>
        </div>
      </motion.div>
    </section>
  );
}
