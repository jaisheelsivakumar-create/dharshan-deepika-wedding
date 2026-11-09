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
  CheckCircle2,
  CalendarPlus,
  Sun,
} from "lucide-react";
import { weddingData, EventItem } from "@/data/weddingData";

export default function EventDetails() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getIcon = (name: EventItem["iconName"]) => {
    switch (name) {
      case "Flame":
        return <Flame className="w-5 h-5 text-[#b0803c]" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5 text-[#b0803c]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#b0803c]" />;
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
    <section
      id="events-section"
      className="relative py-16 sm:py-24 md:py-28 px-5 sm:px-8 md:px-10 max-w-4xl mx-auto z-10 w-full"
      suppressHydrationWarning
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <span className="text-[#a67831] text-2xl sm:text-3xl">❦</span>
        <p className="text-[#95703e] font-heading text-[11px] sm:text-xs tracking-[3px] uppercase mt-1.5 font-medium">
          {weddingData.events.subheading}
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold text-[#6d1d29] tracking-tight mt-1.5 mb-2.5">
          {weddingData.events.heading}
        </h2>
        <div className="text-[#a87935] text-xs">❖</div>
        <p className="text-[#756055] text-xs sm:text-base font-serif italic max-w-lg mx-auto mt-2.5 px-3 leading-relaxed">
          We warmly invite you to join us in every blessed ceremony and celebrate our divine union.
        </p>
      </div>

      {/* 3D Tilt Event Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {weddingData.events.items.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.8,
              delay: index * 0.15,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="h-full"
          >
            <Tilt
              perspective={1200}
              tiltMaxAngleX={8}
              tiltMaxAngleY={8}
              scale={1.01}
              transitionSpeed={1400}
              glareEnable={true}
              glareMaxOpacity={0.12}
              glareColor="#ffffff"
              glarePosition="all"
              glareBorderRadius="1.25rem"
              className="h-full"
            >
              <div className="relative h-full flex flex-col justify-between rounded-2xl p-6 sm:p-8 glass-parchment-deep border border-[#b88c4a]/40 shadow-xl hover:border-[#9f7236] transition-colors duration-300">
                <div>
                  {/* Top Bar with Badge & Icon */}
                  <div className="flex items-center justify-between gap-2 mb-4 sm:mb-5">
                    <span className="px-3 py-1 rounded-full text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold font-heading bg-[#741e2b]/10 text-[#741e2b] border border-[#741e2b]/25">
                      {event.badge}
                    </span>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#ae7e32]/40 bg-[#fff9ee] flex items-center justify-center shadow-sm">
                      {getIcon(event.iconName)}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-semibold text-[#721e2b] mb-1">
                    {event.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8c6753] font-serif italic mb-5">
                    {event.subtitle}
                  </p>

                  {/* Date & Time details */}
                  <div className="space-y-3 mb-5 text-xs sm:text-sm text-[#6a5347]">
                    <div className="flex items-start gap-2.5">
                      <Calendar className="w-4 h-4 text-[#a87831] mt-0.5 shrink-0" />
                      <span className="font-semibold text-[#651c29] text-xs sm:text-sm">
                        {event.date}
                      </span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-[#a87831] mt-0.5 shrink-0" />
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-[#651c29] text-xs sm:text-sm">{event.time}</span>
                        {event.lagnam && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] bg-[#b88c4a]/15 text-[#701c2a] border border-[#b88c4a]/30 font-heading">
                            <Sun className="w-3 h-3 text-[#b88c4a]" />
                            <span>Lagnam: {event.lagnam}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#8a3341] mt-0.5 shrink-0" />
                      <div>
                        <p className="font-bold text-[#651c29] text-xs sm:text-sm uppercase tracking-wide">
                          {event.venue}
                        </p>
                        <p className="text-[11px] sm:text-xs text-[#756055] mt-0.5 leading-relaxed">
                          {event.address}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#71594d] leading-relaxed border-t border-[#ae7e32]/20 pt-3.5 mb-5 font-sans">
                    {event.description}
                  </p>
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center gap-2.5 pt-2">
                  <a
                    href={createGoogleCalendarLink(event)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-md bg-[#741e2b] hover:bg-[#852232] text-[#fff8ee] text-xs font-heading font-medium tracking-wider transition-colors shadow-sm"
                  >
                    <CalendarPlus className="w-3.5 h-3.5" />
                    <span>Add to Calendar</span>
                  </a>

                  <button
                    onClick={() => handleCopyVenue(event.id, `${event.venue}, ${event.address}`)}
                    className="py-2.5 px-3 rounded-md border border-[#ae7e32]/40 bg-[#fff9ee] hover:bg-white text-[#701e2a] text-xs font-medium transition-colors"
                    title="Copy venue address"
                  >
                    {copiedId === event.id ? (
                      <span className="flex items-center gap-1 text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Copied</span>
                      </span>
                    ) : (
                      <span>Copy Venue</span>
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
