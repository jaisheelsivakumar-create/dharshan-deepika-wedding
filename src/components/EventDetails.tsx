"use client";

import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Flame,
  Music,
  CheckCircle2,
  CalendarPlus,
  Shirt,
  Sun,
} from "lucide-react";
import { weddingData, EventItem } from "@/data/weddingData";

export default function EventDetails() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getIcon = (name: EventItem["iconName"]) => {
    switch (name) {
      case "Flame":
        return <Flame className="w-6 h-6 text-amber-400" />;
      case "Sparkles":
        return <Sparkles className="w-6 h-6 text-amber-400" />;
      case "Music":
        return <Music className="w-6 h-6 text-amber-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-amber-400" />;
    }
  };

  const createGoogleCalendarLink = (event: EventItem) => {
    const text = encodeURIComponent(
      `${weddingData.couple.groom.firstName} & ${weddingData.couple.bride.firstName}'s ${event.title}`
    );
    const details = encodeURIComponent(
      `${event.description}\n${event.lagnam ? `Lagnam: ${event.lagnam}\n` : ""}\nVenue: ${event.venue}, ${event.address}`
    );
    const location = encodeURIComponent(`${event.venue}, ${event.address}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&details=${details}&location=${location}`;
  };

  const handleCopyVenue = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="events-section" className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto z-10" suppressHydrationWarning>
      {/* Decorative backdrop glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-2 text-amber-400 text-xs sm:text-sm uppercase tracking-[0.3em] mb-2 font-serif"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{weddingData.events.subheading}</span>
          <Sparkles className="w-3.5 h-3.5" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-serif font-bold text-gold-gradient tracking-tight mb-4"
        >
          {weddingData.events.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-amber-100/70 text-sm sm:text-base font-serif italic max-w-lg mx-auto"
        >
          We cordially invite you to join us in every blessed ceremony and celebrate our divine union.
        </motion.p>
      </div>

      {/* 3D Tilt Event Cards Grid (2 cards centered) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {weddingData.events.items.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.8,
              delay: index * 0.2,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="h-full"
          >
            {/* 3D Parallax Tilt Wrapper */}
            <Tilt
              perspective={1200}
              tiltMaxAngleX={12}
              tiltMaxAngleY={12}
              scale={1.03}
              transitionSpeed={1400}
              glareEnable={true}
              glareMaxOpacity={0.22}
              glareColor="#ffd700"
              glarePosition="all"
              glareBorderRadius="1.5rem"
              className="h-full"
            >
              <div className="relative h-full flex flex-col justify-between rounded-3xl p-7 sm:p-9 glass-luxury border border-amber-500/30 box-shadow-deep-3d hover:border-amber-400 transition-colors duration-500 overflow-hidden">
                {/* Background ambient corner ornament */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                <div>
                  {/* Top Bar: Badge and Icon */}
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <span className="px-3.5 py-1 rounded-full text-[11px] uppercase tracking-wider font-semibold font-serif bg-gradient-to-r from-amber-500/20 to-amber-700/20 text-amber-300 border border-amber-400/40">
                      {event.badge}
                    </span>
                    <div className="w-12 h-12 rounded-2xl glass-luxury border border-amber-400/30 flex items-center justify-center shadow-inner">
                      {getIcon(event.iconName)}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-100 tracking-wide mb-1">
                    {event.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-300/80 font-serif italic mb-6">
                    {event.subtitle}
                  </p>

                  {/* Details List */}
                  <div className="space-y-4 mb-6 text-xs sm:text-sm text-neutral-300">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                      <span className="font-semibold text-neutral-100 text-sm sm:text-base">
                        {event.date}
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-neutral-200">{event.time}</span>
                        {event.lagnam && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs bg-amber-500/20 text-amber-300 border border-amber-400/40 font-serif">
                            <Sun className="w-3 h-3 text-amber-300" />
                            <span>Lagnam: {event.lagnam}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-bold text-neutral-100 text-sm uppercase font-serif tracking-wide">
                          {event.venue}
                        </p>
                        <p className="text-xs text-neutral-300/80 mt-0.5 leading-relaxed">
                          {event.address}
                        </p>
                      </div>
                    </div>

                    {event.dressCode && (
                      <div className="flex items-center gap-3 pt-1">
                        <Shirt className="w-4 h-4 text-amber-300 shrink-0" />
                        <span className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-amber-200">
                          {event.dressCode}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-neutral-300/80 leading-relaxed font-sans border-t border-white/10 pt-4 mb-6">
                    {event.description}
                  </p>
                </div>

                {/* Bottom Card Actions */}
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href={createGoogleCalendarLink(event)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/30 hover:from-amber-500/40 hover:to-amber-600/50 border border-amber-400/30 text-amber-200 text-xs font-semibold tracking-wider transition-all duration-300"
                  >
                    <CalendarPlus className="w-3.5 h-3.5" />
                    <span>Add to Calendar</span>
                  </a>

                  <button
                    onClick={() => handleCopyVenue(event.id, `${event.venue}, ${event.address}`)}
                    className="py-2.5 px-3 rounded-xl glass-luxury border border-white/10 hover:border-amber-400/40 text-neutral-300 hover:text-amber-200 text-xs font-medium transition-all duration-300"
                    title="Copy venue address"
                  >
                    {copiedId === event.id ? (
                      <span className="flex items-center gap-1 text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Copied</span>
                      </span>
                    ) : (
                      <span>Copy Address</span>
                    )}
                  </button>
                </div>
              </div>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
