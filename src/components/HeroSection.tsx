"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, ChevronDown } from "lucide-react";
import { invitationData } from "@/data/invitation";

interface HeroSectionProps {
  onViewDetails?: () => void;
}

export default function HeroSection({ onViewDetails }: HeroSectionProps) {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();

  // Scroll parallax transforms
  const textY = useTransform(scrollY, [0, 500], [0, 80]);
  const bgY = useTransform(scrollY, [0, 500], [0, 40]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / 45;
      const y = (e.clientY - innerHeight / 2) / 45;
      setMouseOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleScrollToStory = () => {
    if (onViewDetails) onViewDetails();
    const el = document.getElementById("welcome-story-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero-section"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-5 sm:px-8 md:px-12 py-16 sm:py-24 text-center overflow-hidden"
      suppressHydrationWarning
    >
      {/* Background Layer: Traditional Watercolor Parchment Card with temple bells */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 w-full h-[115%] pointer-events-none -z-10"
      >
        <div
          className="w-full h-full bg-cover bg-top sm:bg-center bg-no-repeat opacity-45 mix-blend-multiply"
          style={{ backgroundImage: `url('${invitationData.assets.traditionalCardBg}')` }}
        />
        {/* Soft radial golden illumination */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(253,251,247,0.75)_0%,_rgba(253,251,247,0.92)_70%)]" />
      </motion.div>

      {/* Main Hero Card Composition */}
      <motion.div
        style={{
          y: textY,
          transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
        }}
        className="relative max-w-xl w-full mx-auto my-auto flex flex-col items-center z-10"
      >
        {/* Top Invocations in Serif Font */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="mb-3 sm:mb-4"
        >
          <p className="text-[#6b1e23] font-serif text-xs sm:text-sm font-semibold tracking-[3px] uppercase">
            {invitationData.invocations.sanskrit}
          </p>
          <p className="text-[#a07036] font-serif text-xs sm:text-sm tracking-[2px] uppercase mt-1 font-medium">
            {invitationData.invocations.subhamasthu}
          </p>
        </motion.div>

        {/* "The Wedding Invitation Of" (Serif font) */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="text-[#80685b] font-serif text-[11px] sm:text-xs tracking-[4px] uppercase font-medium mt-2"
        >
          {invitationData.invocations.label}
        </motion.p>

        {/* The Couple's Names: Dharshan & Deepika stacked with & in between */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="my-3 sm:my-4 select-none w-full"
        >
          <h1 className="text-[clamp(3.25rem,10vw,6.5rem)] font-script font-normal text-[#6b1e23] leading-[1.02] tracking-tight drop-shadow-sm py-0.5">
            {invitationData.couple.groom.name}
          </h1>

          <div className="flex items-center justify-center my-2 sm:my-3">
            <span className="w-12 sm:w-24 h-[1px] bg-[#c59b4e]" />
            <span className="text-2xl sm:text-3xl font-serif text-[#a87831] mx-4 italic font-semibold">
              {"&"}
            </span>
            <span className="w-12 sm:w-24 h-[1px] bg-[#c59b4e]" />
          </div>

          <h1 className="text-[clamp(3.25rem,10vw,6.5rem)] font-script font-normal text-[#6b1e23] leading-[1.02] tracking-tight drop-shadow-sm py-0.5">
            {invitationData.couple.bride.name}
          </h1>
        </motion.div>

        {/* Invitation Lead Quote */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="max-w-md mx-auto mt-3 sm:mt-4 text-[#684f45] text-xs sm:text-base font-serif italic leading-relaxed px-2"
        >
          {invitationData.hero.openingQuote}
        </motion.p>

        {/* Venue and City Preview */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65 }}
          className="mt-6 sm:mt-7 text-center"
        >
          <p className="text-[#6b1e23] text-sm sm:text-lg font-serif font-semibold tracking-wide">
            {invitationData.hero.venueName}
          </p>
          <p className="text-[#80685a] text-xs tracking-wider uppercase mt-1">
            {invitationData.hero.city}
          </p>
        </motion.div>

        {/* Action Button & Scroll to Explore Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="mt-8 sm:mt-11 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          {/* Prominent "View Invitation Details ✨" Button */}
          <button
            onClick={handleScrollToStory}
            className="btn-royal-maroon px-8 sm:px-10 py-3.5 sm:py-4 rounded-md text-xs sm:text-sm font-serif font-semibold tracking-[2px] uppercase flex items-center gap-2.5 cursor-pointer select-none"
          >
            <span>{invitationData.hero.ctaButtonText}</span>
          </button>

          {/* "Scroll to Explore" label with downward chevron icon */}
          <button
            onClick={handleScrollToStory}
            className="flex items-center gap-1.5 text-xs text-[#80685b] hover:text-[#6b1e23] font-serif tracking-[2px] uppercase transition-colors cursor-pointer"
          >
            <span>{invitationData.hero.scrollText}</span>
            <ChevronDown className="w-4 h-4 text-[#c59b4e] animate-bounce" />
          </button>
        </motion.div>
      </motion.div>

      {/* Auspicious Brass Deepams, Kalasam and Lotus Foreground Layer */}
      <div className="absolute -bottom-2 inset-x-0 w-full pointer-events-none opacity-85 max-w-5xl mx-auto z-20">
        <img
          src={invitationData.assets.poojaElementsImage}
          alt="Auspicious Kalasam and Deepams"
          className="w-full h-auto max-h-[170px] sm:max-h-[220px] object-contain object-bottom filter drop-shadow-[0_8px_16px_rgba(107,30,35,0.18)]"
          loading="eager"
        />
      </div>
    </section>
  );
}
