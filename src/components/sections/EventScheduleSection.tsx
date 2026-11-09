"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Calendar,
  CalendarPlus,
  Clock,
  Flame,
  MapPin,
  Music,
  Sparkles,
  Sun,
} from "lucide-react";
import { EventDetail, EventIconType, invitationData } from "@/data/invitation";
import TiltCard from "@/components/ui/TiltCard";
import { MotionLinkButton } from "@/components/ui/MotionButton";
import { GoldDivider, GoldOrnament } from "@/components/ui/GoldOrnament";

gsap.registerPlugin(ScrollTrigger);

function renderEventIcon(icon: EventIconType) {
  switch (icon) {
    case "flame":
      return <Flame className="w-5 h-5 text-[#B8892E]" aria-hidden="true" />;
    case "music":
      return <Music className="w-5 h-5 text-[#B8892E]" aria-hidden="true" />;
    case "sun":
      return <Sun className="w-5 h-5 text-[#B8892E]" aria-hidden="true" />;
    case "sparkles":
    default:
      return <Sparkles className="w-5 h-5 text-[#B8892E]" aria-hidden="true" />;
  }
}

function createGoogleCalendarLink(event: EventDetail) {
  const text = encodeURIComponent(
    `${invitationData.couple.groom.name} & ${invitationData.couple.bride.name} — ${event.title}`
  );
  const details = encodeURIComponent(
    `${event.description}\n${event.lagnam ? `Lagnam: ${event.lagnam}\n` : ""}Venue: ${event.venue}, ${event.address}`
  );
  const location = encodeURIComponent(`${event.venue}, ${event.address}`);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&details=${details}&location=${location}`;
}

interface EventScheduleSectionProps {
  isOpened: boolean;
}

export default function EventScheduleSection({ isOpened }: EventScheduleSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpened || !sectionRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-event-reveal]",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.78,
          stagger: 0.14,
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

  return (
    <section
      id="event-schedule"
      ref={sectionRef}
      data-section="schedule"
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 flex flex-col items-center text-center"
    >
      <div className="w-full max-w-[720px] mx-auto flex flex-col items-center text-center">
        {/* Section Heading */}
        <div data-event-reveal className="flex justify-center">
          <GoldOrnament />
        </div>
        <p
          data-event-reveal
          className="font-heading text-fluid-eyebrow uppercase text-[#855E14] font-bold mt-2"
        >
          The Celebration
        </p>
        <h2
          data-event-reveal
          className="font-heading text-fluid-h2 font-bold text-[#6B1A1F] mt-2 text-balance"
        >
          Wedding Ceremonies
        </h2>
        <div data-event-reveal className="my-3 w-full flex justify-center">
          <GoldDivider maxWidth="max-w-[160px]" />
        </div>
        <p
          data-event-reveal
          className="text-fluid-body text-[#6B1A1F]/85 italic max-w-lg mx-auto text-balance"
        >
          Your gracious presence and heartfelt blessings will fill every ceremony with joy.
        </p>

        {/* Centered Vertical Timeline */}
        <div className="relative w-full mt-12 flex flex-col items-center">
          {/* Central Vertical Gold Timeline Line */}
          <div
            aria-hidden="true"
            className="absolute top-4 bottom-4 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#B8892E]/20 via-[#B8892E]/70 to-[#B8892E]/20 pointer-events-none"
          />

          <div className="w-full flex flex-col items-center gap-10">
            {invitationData.events.map((event, idx) => (
              <div
                key={event.id}
                data-event-reveal
                className="relative w-full flex flex-col items-center text-center"
              >
                {/* Timeline Medallion Node */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-[#FDF8EE] border-2 border-[#B8892E] shadow-[0_6px_18px_rgba(107,26,31,0.14)] flex items-center justify-center mb-4">
                  {renderEventIcon(event.icon)}
                </div>

                {/* Timeline Card */}
                <TiltCard maxTilt={6}>
                  <article className="relative z-10 w-full rounded-3xl parchment-card p-5 sm:p-9 flex flex-col items-center text-center">
                    <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#6B1A1F]/10 border border-[#B8892E]/50 font-heading text-fluid-eyebrow uppercase text-[#6B1A1F] font-semibold">
                      {String(idx + 1).padStart(2, "0")} · {event.badge}
                    </span>

                    <h3 className="font-heading text-fluid-h3 font-bold text-[#6B1A1F] mt-3 text-balance">
                      {event.title}
                    </h3>

                    {event.subtitle && (
                      <p className="font-body text-fluid-meta italic text-[#6B1A1F]/80 mt-1 text-balance">
                        {event.subtitle}
                      </p>
                    )}

                    {/* Date & Time Badges */}
                    <div className="mt-5 flex flex-col items-center gap-2 text-center w-full">
                      <div className="inline-flex flex-wrap items-center justify-center gap-2 text-fluid-lead font-heading font-semibold text-[#6B1A1F]">
                        <Calendar className="w-4 h-4 text-[#B8892E] shrink-0" aria-hidden="true" />
                        <span>{event.date}</span>
                      </div>

                      <div className="inline-flex flex-wrap items-center justify-center gap-2 text-fluid-lead font-body font-semibold text-[#6B1A1F]">
                        <Clock className="w-4 h-4 text-[#B8892E] shrink-0" aria-hidden="true" />
                        <span>{event.time}</span>
                      </div>

                      {event.lagnam && (
                        <span className="mt-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B8892E]/15 border border-[#B8892E]/55 text-fluid-meta font-heading font-semibold text-[#6B1A1F]">
                          <Sun className="w-3.5 h-3.5 text-[#B8892E] shrink-0" aria-hidden="true" />
                          <span>{event.lagnam}</span>
                        </span>
                      )}
                    </div>

                    <div className="w-20 h-px bg-[#B8892E]/40 my-5" aria-hidden="true" />

                    {/* Venue */}
                    <div className="flex flex-col items-center text-center gap-1 w-full">
                      <div className="inline-flex flex-wrap items-center justify-center gap-1.5 font-heading text-fluid-meta font-bold uppercase tracking-wider text-[#6B1A1F]">
                        <MapPin className="w-4 h-4 text-[#B8892E] shrink-0" aria-hidden="true" />
                        <span>{event.venue}</span>
                      </div>
                      <p className="text-fluid-meta text-[#6B1A1F]/80 max-w-md text-balance">
                        {event.address}
                      </p>
                    </div>

                    <p className="text-fluid-body text-[#6B1A1F]/85 mt-4 max-w-lg text-balance">
                      {event.description}
                    </p>

                    {event.dressCode && (
                      <p className="mt-3 text-fluid-eyebrow font-heading uppercase text-[#855E14] font-bold text-balance">
                        Attire: {event.dressCode}
                      </p>
                    )}

                    <div className="mt-6 w-full flex justify-center">
                      <MotionLinkButton href={createGoogleCalendarLink(event)}>
                        <CalendarPlus className="w-4 h-4 text-[#DFBC6E]" aria-hidden="true" />
                        <span>Add to Calendar</span>
                      </MotionLinkButton>
                    </div>
                  </article>
                </TiltCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
