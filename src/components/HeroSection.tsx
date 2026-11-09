"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ChevronDown } from "lucide-react";
import { invitationData } from "@/data/invitation";

interface HeroSectionProps {
  onViewDetails?: () => void;
}

export default function HeroSection({ onViewDetails }: HeroSectionProps) {
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
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-16 sm:py-24 overflow-hidden"
      suppressHydrationWarning
    >
      {/* Background Layer: Traditional Watercolor Parchment Card with temple bells */}
      <div className="absolute inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-top sm:bg-center bg-no-repeat opacity-40 mix-blend-multiply"
          style={{ backgroundImage: `url('${invitationData.assets.traditionalCardBg}')` }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(253,251,247,0.7)_0%,_rgba(253,251,247,0.92)_75%)]" />
      </div>

      {/* Main Centered Royal Wedding Invitation Card */}
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-xl w-full mx-auto my-auto flex flex-col items-center justify-center text-center p-6 sm:p-10 md:p-12 rounded-3xl glass-parchment-deep border-2 border-[#c59b4e]/50 shadow-[0_20px_50px_rgba(107,30,35,0.1)] z-10"
      >
        {/* Top Invocations in Serif Font */}
        <div className="mb-2 text-center w-full">
          <p className="text-[#6b1e23] font-serif text-sm sm:text-base font-bold tracking-[3px] uppercase">
            {invitationData.invocations.sanskrit}
          </p>
          <p className="text-[#a07036] font-serif text-xs sm:text-sm tracking-[2px] uppercase mt-1 font-semibold">
            {invitationData.invocations.subhamasthu}
          </p>
        </div>

        {/* "The Wedding Invitation Of" (Serif font) */}
        <p className="text-[#80685b] font-serif text-xs sm:text-sm tracking-[4px] uppercase font-medium mt-2 text-center">
          {invitationData.invocations.label}
        </p>

        {/* Floral Motif */}
        <div className="text-[#c59b4e] text-xl sm:text-2xl my-1 text-center">❦</div>

        {/* The Couple's Names: Dharshan & Deepika stacked with & in between */}
        <div className="my-2 select-none w-full text-center">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-script font-normal text-[#6b1e23] leading-[1.05] tracking-tight drop-shadow-sm">
            {invitationData.couple.groom.name}
          </h1>

          <div className="flex items-center justify-center my-1.5 sm:my-2 w-full">
            <span className="w-12 sm:w-20 h-[1px] bg-[#c59b4e]" />
            <span className="text-2xl sm:text-3xl font-serif text-[#a87831] mx-4 italic font-bold">
              {"&"}
            </span>
            <span className="w-12 sm:w-20 h-[1px] bg-[#c59b4e]" />
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-script font-normal text-[#6b1e23] leading-[1.05] tracking-tight drop-shadow-sm">
            {invitationData.couple.bride.name}
          </h1>
        </div>

        {/* Invitation Lead Quote */}
        <p className="max-w-md mx-auto mt-4 text-[#684f45] text-xs sm:text-base font-serif italic leading-relaxed px-2 text-center">
          {invitationData.hero.openingQuote}
        </p>

        {/* Venue and City Preview */}
        <div className="mt-5 sm:mt-6 text-center w-full">
          <p className="text-[#6b1e23] text-base sm:text-xl font-serif font-bold tracking-wide">
            {invitationData.hero.venueName}
          </p>
          <p className="text-[#80685a] text-xs sm:text-sm tracking-wider uppercase mt-1 font-medium">
            {invitationData.hero.city}
          </p>
        </div>

        {/* Action Button & Scroll to Explore Label */}
        <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full">
          {/* Prominent "View Invitation Details ✨" Button */}
          <button
            onClick={handleScrollToStory}
            className="btn-royal-maroon px-8 sm:px-9 py-3.5 rounded-md text-xs sm:text-sm font-serif font-semibold tracking-[2px] uppercase flex items-center justify-center gap-2.5 cursor-pointer select-none"
          >
            <span>{invitationData.hero.ctaButtonText}</span>
          </button>

          {/* "Scroll to Explore" label with downward chevron icon */}
          <button
            onClick={handleScrollToStory}
            className="flex items-center gap-1.5 text-xs text-[#80685b] hover:text-[#6b1e23] font-serif tracking-[2px] uppercase transition-colors cursor-pointer select-none font-medium"
          >
            <span>{invitationData.hero.scrollText}</span>
            <ChevronDown className="w-4 h-4 text-[#c59b4e] animate-bounce" />
          </button>
        </div>
      </motion.div>

      {/* Auspicious Brass Deepams, Kalasam and Lotus Foreground Layer */}
      <div className="relative mt-8 sm:mt-12 w-full max-w-4xl mx-auto pointer-events-none z-10 px-4">
        <img
          src={invitationData.assets.poojaElementsImage}
          alt="Auspicious Kalasam, Deepams and Lotuses"
          className="w-full h-auto max-h-[140px] sm:max-h-[180px] object-contain object-bottom filter drop-shadow-[0_8px_16px_rgba(107,30,35,0.15)] mx-auto"
          loading="eager"
        />
      </div>
    </section>
  );
}
