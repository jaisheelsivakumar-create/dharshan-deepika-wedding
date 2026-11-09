"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Calendar, MapPin, Heart, ChevronDown } from "lucide-react";
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
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 text-center overflow-hidden">
        {/* Soft radial golden background illumination */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,248,235,0.95)_0%,_rgba(248,238,229,0.92)_65%,_rgba(244,230,218,0.96)_100%)] -z-10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-2xl w-full mx-auto my-auto flex flex-col items-center"
        >
          {/* Sacred Deity Circle */}
          <div className="mb-3">
            <div className="w-14 h-14 mx-auto mb-2 rounded-full border border-[#ae7e32] flex items-center justify-center text-[#741d2b] text-2xl font-serif bg-[#fff9ee]/80 shadow-[0_0_0_5px_rgba(170,125,53,0.12)]">
              <span>ॐ</span>
            </div>
            <p className="text-[#85424a] text-[11px] sm:text-xs tracking-[2px] uppercase font-serif">
              ॥ श्री गणेशाय नमः ॥
            </p>
            <p className="text-[#a07036] text-xs sm:text-sm tracking-[1.5px] uppercase font-serif mt-1">
              Subhamasthu
            </p>
          </div>

          {/* Invitation Label */}
          <div className="mt-2 text-[#80685b] font-heading text-[10px] sm:text-xs tracking-[4px] uppercase">
            The Wedding Invitation Of
          </div>

          {/* Floral Motif */}
          <div className="text-[#b78391] text-xl sm:text-2xl my-1">❦</div>

          {/* Couple Names in Flowing Calligraphy */}
          <div className="my-2 select-none">
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-script font-normal text-[#701c2a] leading-none tracking-tight drop-shadow-sm">
              {weddingData.couple.groom.firstName}
            </h1>
            <div className="flex items-center justify-center my-1">
              <span className="w-12 sm:w-20 h-[1px] bg-[#b18a4e]" />
              <span className="text-2xl sm:text-3xl font-serif text-[#a87831] mx-3 italic font-semibold">
                {"&"}
              </span>
              <span className="w-12 sm:w-20 h-[1px] bg-[#b18a4e]" />
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-script font-normal text-[#701c2a] leading-none tracking-tight drop-shadow-sm">
              {weddingData.couple.bride.firstName}
            </h1>
          </div>

          {/* Opening Message */}
          <p className="max-w-md mx-auto mt-4 text-[#684f45] text-sm sm:text-base font-serif italic leading-relaxed px-4">
            Together with their families, cordially invite you to celebrate their auspicious wedding ceremonies.
          </p>

          {/* Venue Preview */}
          <div className="mt-5 text-center">
            <p className="text-[#681c28] text-base sm:text-lg font-heading font-semibold tracking-wide">
              {weddingData.location.venueName}
            </p>
            <p className="text-[#80685a] text-xs tracking-wider uppercase mt-0.5">
              Hosur, Tamil Nadu
            </p>
          </div>

          {/* Open Invitation Action Button */}
          <div className="mt-8 flex flex-col items-center">
            <button
              onClick={onOpenInvitation}
              className="btn-royal-maroon px-8 py-3.5 rounded-sm text-xs sm:text-sm font-heading tracking-[2px] uppercase flex items-center gap-3 cursor-pointer select-none"
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
            <div className="max-w-2xl mx-auto text-center px-4 pt-16 pb-10">
              <span className="text-[#a67831] text-2xl">❦</span>
              <p className="text-[#9a753e] font-heading text-xs tracking-[3px] uppercase mt-2">
                We Are Getting Married
              </p>
              <h2 className="text-4xl sm:text-6xl font-script text-[#6d1c28] my-3">
                {weddingData.couple.groom.firstName} <span className="font-serif text-2xl sm:text-3xl text-[#a87934]">&</span> {weddingData.couple.bride.firstName}
              </h2>
              <p className="max-w-lg mx-auto text-[#6e5549] text-base sm:text-lg font-serif italic leading-relaxed">
                &ldquo;{weddingData.couple.subQuote}&rdquo;
              </p>
              <div className="w-20 h-[1px] bg-[#b1894d] mx-auto my-6" />
            </div>

            {/* Sacred Arched Couple Portrait Frame */}
            <div className="px-4 py-8 text-center">
              <div className="couple-image-frame shadow-2xl">
                <div className="image-glow" />
                <img
                  src={weddingData.assets.coupleImage}
                  alt="Dharshan & Deepika Wedding Couple"
                  className="relative z-10 w-full h-full object-contain object-bottom filter drop-shadow-[0_16px_20px_rgba(79,44,37,0.22)]"
                  loading="eager"
                />
              </div>
              <p className="text-[#8b6957] font-script text-2xl sm:text-3xl mt-5">
                Two Souls, One Heart
              </p>
            </div>

            {/* Save The Auspicious Dates Card */}
            <div className="max-w-xl mx-auto my-12 px-6 py-10 text-center border-t border-b border-[#9d7435]/40 glass-parchment rounded-xl">
              <span className="text-[#a97a39] text-xl">✿</span>
              <p className="text-[#95703c] font-heading text-xs tracking-[3px] uppercase mt-2">
                Save The Auspicious Dates
              </p>
              <h3 className="text-2xl sm:text-4xl font-heading font-semibold text-[#701d2a] tracking-wider mt-3">
                {weddingData.couple.displayDate}
              </h3>
              <p className="text-[#846c5b] text-xs sm:text-sm tracking-[3px] uppercase mt-2 font-medium">
                Saturday &amp; Sunday
              </p>
            </div>

            {/* Live Countdown Timer */}
            <div className="max-w-md mx-auto text-center px-4 py-8">
              <p className="text-[#95703e] font-heading text-[11px] tracking-[3px] uppercase">
                Counting Down To The Sacred Muhurtham
              </p>
              <div className="text-[#a87935] text-xs my-2">❖</div>

              <div className="flex items-center justify-center gap-2 sm:gap-4 mt-4" suppressHydrationWarning>
                {[
                  { label: "Days", val: timeLeft.days },
                  { label: "Hours", val: timeLeft.hours },
                  { label: "Minutes", val: timeLeft.minutes },
                  { label: "Seconds", val: timeLeft.seconds },
                ].map((item, idx, arr) => (
                  <React.Fragment key={idx}>
                    <div className="min-w-[62px] sm:min-w-[75px] py-3 px-2 rounded-lg glass-parchment text-center">
                      <span className="block text-2xl sm:text-3xl font-heading font-bold text-[#6e1c28]">
                        {mounted ? String(item.val).padStart(2, "0") : "--"}
                      </span>
                      <span className="block text-[8px] sm:text-[9px] uppercase tracking-[1.5px] text-[#92735a] mt-1">
                        {item.label}
                      </span>
                    </div>
                    {idx < arr.length - 1 && (
                      <span className="text-xl sm:text-2xl text-[#ae7e39] font-serif mb-3 select-none">
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
