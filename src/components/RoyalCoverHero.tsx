"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronDown } from "lucide-react";
import { weddingData } from "@/data/weddingData";

interface RoyalCoverHeroProps {
  onOpenInvitation: () => void;
  isOpen: boolean;
}

export default function RoyalCoverHero({ onOpenInvitation, isOpen }: RoyalCoverHeroProps) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setMounted(true);
    const targetDate = new Date(weddingData.couple.weddingDateISO).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full z-10" suppressHydrationWarning>
      {/* 1. COVER HERO SECTION (The Royal Envelope Reveal) */}
      <section className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-5 sm:px-8 md:px-12 py-12 sm:py-20 text-center overflow-hidden">
        {/* Soft radial golden background illumination */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,248,235,0.95)_0%,_rgba(248,238,229,0.92)_65%,_rgba(244,230,218,0.96)_100%)] -z-10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-xl w-full mx-auto my-auto flex flex-col items-center"
        >
          {/* Sacred Deity Circle */}
          <div className="mb-3 sm:mb-4">
            <div className="w-13 h-13 sm:w-16 sm:h-16 mx-auto mb-2 rounded-full border border-[#ae7e32] flex items-center justify-center text-[#741d2b] text-2xl sm:text-3xl font-serif bg-[#fff9ee]/90 shadow-[0_0_0_5px_rgba(170,125,53,0.12)]">
              <span>ॐ</span>
            </div>
            <p className="text-[#85424a] text-[11px] sm:text-xs tracking-[2.5px] uppercase font-serif font-semibold">
              ॥ श्री गणेशाय नमः ॥
            </p>
            <p className="text-[#a07036] text-xs sm:text-sm tracking-[2px] uppercase font-serif mt-0.5 sm:mt-1 font-medium">
              Subhamasthu
            </p>
          </div>

          {/* Invitation Label */}
          <div className="mt-2 text-[#80685b] font-heading text-[10px] sm:text-xs tracking-[3.5px] sm:tracking-[4px] uppercase font-medium">
            The Wedding Invitation Of
          </div>

          {/* Floral Motif */}
          <div className="text-[#b78391] text-lg sm:text-2xl my-1 sm:my-1.5">❦</div>

          {/* Couple Names in Flowing Calligraphy */}
          <div className="my-2 sm:my-3 select-none w-full">
            <h1 className="text-[clamp(2.75rem,8vw,5.5rem)] font-script font-normal text-[#701c2a] leading-[1.05] tracking-tight drop-shadow-sm py-0.5">
              {weddingData.couple.groom.firstName}
            </h1>
            <div className="flex items-center justify-center my-1.5 sm:my-2">
              <span className="w-10 sm:w-20 h-[1px] bg-[#b18a4e]" />
              <span className="text-xl sm:text-3xl font-serif text-[#a87831] mx-3 sm:mx-4 italic font-semibold">
                {"&"}
              </span>
              <span className="w-10 sm:w-20 h-[1px] bg-[#b18a4e]" />
            </div>
            <h1 className="text-[clamp(2.75rem,8vw,5.5rem)] font-script font-normal text-[#701c2a] leading-[1.05] tracking-tight drop-shadow-sm py-0.5">
              {weddingData.couple.bride.firstName}
            </h1>
          </div>

          {/* Opening Message */}
          <p className="max-w-md mx-auto mt-3 sm:mt-4 text-[#684f45] text-xs sm:text-base font-serif italic leading-relaxed px-3">
            Together with their families, cordially invite you to celebrate their auspicious wedding ceremonies.
          </p>

          {/* Venue Preview */}
          <div className="mt-5 sm:mt-6 text-center">
            <p className="text-[#681c28] text-sm sm:text-lg font-heading font-semibold tracking-wide px-2">
              {weddingData.location.venueName}
            </p>
            <p className="text-[#80685a] text-[11px] sm:text-xs tracking-wider uppercase mt-0.5">
              Hosur, Tamil Nadu
            </p>
          </div>

          {/* Open Invitation Action Button */}
          <div className="mt-7 sm:mt-9 flex flex-col items-center">
            <button
              onClick={onOpenInvitation}
              className="btn-royal-maroon px-8 sm:px-10 py-3 sm:py-3.5 rounded-sm text-xs sm:text-sm font-heading tracking-[2px] uppercase flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none"
            >
              <span>{isOpen ? "View Invitation Details" : "Open Invitation"}</span>
              <Sparkles className="w-4 h-4 text-[#ffd700]" />
            </button>
            <span className="text-[#92786a] text-[10px] tracking-widest uppercase mt-2.5">
              {isOpen ? "Scroll to Explore" : "Tap to open and play music"}
            </span>
          </div>
        </motion.div>

        {/* Scroll down indicator if open */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-6 flex flex-col items-center cursor-pointer animate-bounce"
            onClick={() => {
              const el = document.getElementById("portrait-section");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <ChevronDown className="w-5 h-5 text-[#ae7e32]" />
          </motion.div>
        )}
      </section>

      {/* 2. REVEALED INVITATION DETAILS */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="portrait-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {/* Sacred Introduction Message */}
            <div className="max-w-2xl mx-auto text-center px-5 sm:px-8 pt-16 sm:pt-24 pb-10">
              <span className="text-[#a67831] text-2xl sm:text-3xl">❦</span>
              <p className="text-[#9a753e] font-heading text-[11px] sm:text-xs tracking-[3px] uppercase mt-2 font-medium">
                We Are Getting Married
              </p>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-script text-[#6d1c28] my-3 sm:my-4 leading-tight">
                {weddingData.couple.groom.firstName} <span className="font-serif text-2xl sm:text-3xl text-[#a87934]">&amp;</span> {weddingData.couple.bride.firstName}
              </h2>
              <p className="max-w-lg mx-auto text-[#6e5549] text-sm sm:text-lg font-serif italic leading-relaxed px-2">
                &ldquo;{weddingData.couple.subQuote}&rdquo;
              </p>
              <div className="w-20 sm:w-24 h-[1px] bg-[#b1894d] mx-auto my-6 sm:my-8" />
            </div>

            {/* Sacred Arched Couple Portrait Frame */}
            <div className="px-4 py-8 sm:py-14 text-center">
              <div className="couple-image-frame shadow-2xl">
                <div className="image-glow" />
                <img
                  src={weddingData.assets.coupleImage}
                  alt="Dharshan & Deepika Wedding Couple"
                  className="relative z-10 w-full h-full object-contain object-bottom filter drop-shadow-[0_16px_22px_rgba(0,0,0,0.5)]"
                  loading="eager"
                />
              </div>
              <p className="text-[#8b6957] font-script text-2xl sm:text-3xl md:text-4xl mt-5 sm:mt-6">
                Two Souls, One Heart
              </p>
            </div>

            {/* Save The Auspicious Dates Card */}
            <div className="max-w-xl mx-auto my-12 sm:my-18 px-6 sm:px-12 py-8 sm:py-12 text-center border-t border-b border-[#9d7435]/40 glass-parchment rounded-2xl mx-4 sm:mx-auto">
              <span className="text-[#a97a39] text-xl sm:text-2xl">✿</span>
              <p className="text-[#95703c] font-heading text-[11px] sm:text-xs tracking-[3px] uppercase mt-2 font-medium">
                Save The Auspicious Dates
              </p>
              <h3 className="text-xl sm:text-3xl md:text-4xl font-heading font-semibold text-[#701d2a] tracking-wider mt-2.5">
                {weddingData.couple.displayDate}
              </h3>
              <p className="text-[#846c5b] text-[11px] sm:text-sm tracking-[2.5px] uppercase mt-1.5 font-medium">
                Saturday &amp; Sunday
              </p>
            </div>

            {/* Live Countdown Timer */}
            <div className="max-w-md mx-auto text-center px-4 py-8 sm:py-12">
              <p className="text-[#95703e] font-heading text-[10px] sm:text-xs tracking-[3px] uppercase font-medium">
                Counting Down To The Sacred Muhurtham
              </p>
              <div className="text-[#a87935] text-xs my-2">❖</div>

              <div className="flex items-center justify-center gap-1.5 sm:gap-3 mt-4" suppressHydrationWarning>
                {[
                  { label: "Days", val: timeLeft.days },
                  { label: "Hours", val: timeLeft.hours },
                  { label: "Minutes", val: timeLeft.minutes },
                  { label: "Seconds", val: timeLeft.seconds },
                ].map((item, idx, arr) => (
                  <React.Fragment key={idx}>
                    <div className="min-w-[58px] sm:min-w-[72px] py-2.5 sm:py-3.5 px-1.5 sm:px-2 rounded-xl glass-parchment text-center">
                      <span className="block text-xl sm:text-3xl font-heading font-bold text-[#6e1c28]">
                        {mounted ? String(item.val).padStart(2, "0") : "--"}
                      </span>
                      <span className="block text-[7.5px] sm:text-[9px] uppercase tracking-[1.2px] text-[#92735a] mt-0.5 sm:mt-1 font-medium">
                        {item.label}
                      </span>
                    </div>
                    {idx < arr.length - 1 && (
                      <span className="text-lg sm:text-2xl text-[#ae7e39] font-serif mb-2 select-none">
                        :
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
