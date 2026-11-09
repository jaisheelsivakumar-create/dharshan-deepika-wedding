"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { invitationData } from "@/data/invitation";

export default function WelcomeStorySection() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setMounted(true);
    const targetDate = new Date(invitationData.couple.weddingDateISO).getTime();

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
    <section
      id="welcome-story-section"
      className="relative py-16 sm:py-24 px-5 sm:px-8 md:px-12 max-w-4xl mx-auto z-10 w-full text-center"
      suppressHydrationWarning
    >
      {/* 1. Header & Sacred Invitation Message */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl mx-auto text-center mb-10 sm:mb-14"
      >
        <span className="text-[#c59b4e] text-2xl sm:text-3xl">❦</span>

        {/* Heading: "We Are Getting Married" (Serif) */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#6b1e23] tracking-wide uppercase mt-2 mb-1">
          {invitationData.story.heading}
        </h2>

        {/* Subheading: "Dharshan & Deepika" (Script font) */}
        <p className="text-4xl sm:text-6xl md:text-7xl font-script text-[#6b1e23] my-3 leading-tight">
          {invitationData.story.subheading}
        </p>

        {/* Body Text */}
        <p className="max-w-xl mx-auto text-[#684f45] text-sm sm:text-base font-serif italic leading-relaxed px-3">
          &ldquo;{invitationData.story.invitationBody}&rdquo;
        </p>

        <div className="w-20 sm:w-28 h-[1px] bg-[#c59b4e] mx-auto my-6 sm:my-8" />
      </motion.div>

      {/* 2. Hero / Couple Image (Fully Framed - No Chopped Heads!) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
        className="px-2 py-4 sm:py-8 text-center"
      >
        {/* Royal Portrait Frame with full vertical height for couple faces and attire */}
        <div className="relative mx-auto max-w-[340px] sm:max-w-[420px] rounded-3xl p-3 sm:p-4 bg-gradient-to-b from-[#2d0e14] via-[#140609] to-[#080204] border-2 border-[#c59b4e]/70 shadow-[0_20px_50px_rgba(107,30,35,0.25)]">
          {/* Subtle gold inner accent border */}
          <div className="relative rounded-2xl overflow-hidden border border-[#ffd700]/25">
            <img
              src={invitationData.assets.coupleImage}
              alt="Dharshan & Deepika Wedding Couple"
              className="w-full h-auto max-h-[580px] object-contain object-top filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
              loading="eager"
            />
          </div>
        </div>

        <p className="text-[#8b6957] font-script text-2xl sm:text-4xl mt-5 sm:mt-6">
          {invitationData.story.coupleCaption}
        </p>
      </motion.div>

      {/* 3. Save The Auspicious Dates Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.85 }}
        className="max-w-xl mx-auto my-12 sm:my-16 px-6 sm:px-12 py-8 sm:py-12 text-center border-t border-b border-[#c59b4e]/40 glass-parchment rounded-2xl mx-4 sm:mx-auto"
      >
        <span className="text-[#c59b4e] text-xl sm:text-2xl">✿</span>
        <p className="text-[#95703c] font-serif text-[11px] sm:text-xs tracking-[3px] uppercase mt-2 font-medium">
          Save The Auspicious Dates
        </p>
        <h3 className="text-xl sm:text-3xl md:text-4xl font-serif font-bold text-[#6b1e23] tracking-wider mt-2.5">
          {invitationData.couple.displayDates}
        </h3>
        <p className="text-[#846c5b] text-[11px] sm:text-sm tracking-[2.5px] uppercase mt-1.5 font-medium">
          Saturday &amp; Sunday
        </p>
      </motion.div>

      {/* 4. Live Countdown Timer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto text-center px-4 py-4 sm:py-8"
      >
        <p className="text-[#95703e] font-serif text-[10px] sm:text-xs tracking-[3px] uppercase font-medium">
          Counting Down To The Sacred Muhurtham
        </p>
        <div className="text-[#c59b4e] text-xs my-2">❖</div>

        <div className="flex items-center justify-center gap-1.5 sm:gap-3 mt-4" suppressHydrationWarning>
          {[
            { label: "Days", val: timeLeft.days },
            { label: "Hours", val: timeLeft.hours },
            { label: "Minutes", val: timeLeft.minutes },
            { label: "Seconds", val: timeLeft.seconds },
          ].map((item, idx, arr) => (
            <React.Fragment key={idx}>
              <div className="min-w-[58px] sm:min-w-[72px] py-2.5 sm:py-3.5 px-1.5 sm:px-2 rounded-xl glass-parchment text-center">
                <span className="block text-xl sm:text-3xl font-serif font-bold text-[#6b1e23]">
                  {mounted ? String(item.val).padStart(2, "0") : "--"}
                </span>
                <span className="block text-[7.5px] sm:text-[9px] uppercase tracking-[1.2px] text-[#92735a] mt-0.5 sm:mt-1 font-medium">
                  {item.label}
                </span>
              </div>
              {idx < arr.length - 1 && (
                <span className="text-lg sm:text-2xl text-[#c59b4e] font-serif mb-2 select-none">
                  :
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
