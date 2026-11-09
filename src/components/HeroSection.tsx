"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, MapPin, ChevronDown, Heart, Sparkles } from "lucide-react";
import { weddingData } from "@/data/weddingData";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // 3D Parallax transforms
  const textY = useTransform(scrollY, [0, 600], [0, 160]);
  const textScale = useTransform(scrollY, [0, 600], [1, 0.95]);
  const bgY = useTransform(scrollY, [0, 600], [0, 90]);
  const overlayOpacity = useTransform(scrollY, [0, 400], [0.65, 0.85]);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
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

  const scrollToEvents = () => {
    const el = document.getElementById("events-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-between overflow-hidden px-4 sm:px-6 pt-16 pb-12 select-none"
    >
      {/* Parallax Background Image with Dark Romantic Gradient Overlay */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -top-12 -bottom-12 w-full h-[120%] pointer-events-none z-0"
      >
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat filter brightness-[0.7] contrast-[1.1] transform scale-105"
          style={{
            backgroundImage: `url('${weddingData.hero.backgroundImage}')`,
          }}
        />
        {/* Layered romantic overlays */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-gradient-to-b from-[#0c090e]/90 via-[#180e1e]/60 to-[#0c090e]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-[#0c090e]/95" />
      </motion.div>

      {/* Top Auspicious Monogram */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="flex items-center gap-3 px-5 py-1.5 rounded-full glass-luxury border border-amber-400/30 text-amber-200/90 text-xs sm:text-sm tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{weddingData.couple.hashtag}</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        </div>
      </motion.div>

      {/* Main Hero Parallax Text Content */}
      <motion.div
        style={{ y: textY, scale: textScale }}
        className="relative z-10 flex flex-col items-center text-center my-auto max-w-4xl px-2"
      >
        {/* Invitation lead */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex items-center gap-3 text-amber-200/90 text-xs sm:text-base tracking-[0.25em] uppercase font-serif mb-4"
        >
          <span className="w-8 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-amber-400/80" />
          <span>{weddingData.hero.welcomeText}</span>
          <span className="w-8 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-amber-400/80" />
        </motion.div>

        {/* Couple Names with 3D Depth Shadow and Gold Finish */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-shadow-3d tracking-tight font-bold text-gold-gradient py-2">
            {weddingData.couple.groom.firstName}
          </h1>

          <div className="flex items-center justify-center my-1 sm:my-2">
            <span className="w-12 sm:w-24 h-[1px] bg-gradient-to-r from-transparent to-amber-400" />
            <div className="mx-4 flex items-center gap-2">
              <span className="text-2xl sm:text-4xl text-amber-300 font-script italic text-shadow-romantic">
                &amp;
              </span>
            </div>
            <span className="w-12 sm:w-24 h-[1px] bg-gradient-to-l from-transparent to-amber-400" />
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-shadow-3d tracking-tight font-bold text-gold-gradient py-2">
            {weddingData.couple.bride.firstName}
          </h1>
        </motion.div>

        {/* Romantic sub-quote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="mt-6 text-sm sm:text-lg text-amber-100/80 font-serif italic max-w-xl text-center leading-relaxed"
        >
          &ldquo;{weddingData.couple.invitationQuote}&rdquo;
        </motion.p>

        {/* Date and Location Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-neutral-200"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-luxury border border-amber-400/20 text-amber-100 shadow-lg">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>{weddingData.couple.displayDate}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-luxury border border-amber-400/20 text-amber-100 shadow-lg">
            <MapPin className="w-4 h-4 text-rose-400" />
            <span>{weddingData.hero.locationBrief}</span>
          </div>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-8 grid grid-cols-4 gap-2 sm:gap-4 w-full max-w-md"
        >
          {[
            { label: "Days", val: timeLeft.days },
            { label: "Hours", val: timeLeft.hours },
            { label: "Minutes", val: timeLeft.minutes },
            { label: "Seconds", val: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl glass-luxury border border-amber-500/20 shadow-xl"
            >
              <span className="text-xl sm:text-3xl font-heading font-bold text-gold-light">
                {String(item.val).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-amber-200/60 font-sans mt-0.5">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom Scroll Indicator Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        className="relative z-10 flex flex-col items-center mt-6"
      >
        <button
          onClick={scrollToEvents}
          aria-label="Scroll to events"
          className="group flex flex-col items-center text-xs tracking-widest text-amber-200/70 hover:text-amber-300 transition-colors focus:outline-none"
        >
          <span className="uppercase text-[11px] mb-1 font-serif tracking-widest">
            Explore Invitation
          </span>
          <div className="w-8 h-8 rounded-full flex items-center justify-center border border-amber-400/30 group-hover:border-amber-400 transition-colors animate-bounce">
            <ChevronDown className="w-4 h-4 text-amber-400" />
          </div>
        </button>
      </motion.div>
    </section>
  );
}
