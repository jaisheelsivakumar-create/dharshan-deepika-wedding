"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeartHandshake } from "lucide-react";
import { invitationData } from "@/data/invitation";
import TiltCard from "@/components/ui/TiltCard";
import { GoldOrnament } from "@/components/ui/GoldOrnament";
import { useIsHydrated } from "@/lib/useMediaQuery";

gsap.registerPlugin(ScrollTrigger);

interface CoupleFamiliesSectionProps {
  isOpened: boolean;
}

export default function CoupleFamiliesSection({ isOpened }: CoupleFamiliesSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mounted = useIsHydrated();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetMs = new Date(invitationData.couple.weddingDateISO).getTime();

    const tick = () => {
      const diff = targetMs - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    const raf = requestAnimationFrame(tick);
    const timer = setInterval(tick, 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (!isOpened || !sectionRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-family-reveal]",
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.11,
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

  const familyCards = [
    {
      id: "groom-family",
      badge: invitationData.couple.groom.familyTitle,
      person: invitationData.couple.groom.fullName,
      parents: `${invitationData.family.groomParents.mother} & ${invitationData.family.groomParents.father}`,
      relation: invitationData.couple.groom.parents,
      note: invitationData.couple.groom.blessingNote,
      residence: invitationData.couple.groom.residence,
    },
    {
      id: "bride-family",
      badge: invitationData.couple.bride.familyTitle,
      person: invitationData.couple.bride.fullName,
      parents: `${invitationData.family.brideParents.mother} & ${invitationData.family.brideParents.father}`,
      relation: invitationData.couple.bride.parents,
      note: invitationData.couple.bride.blessingNote,
      residence: invitationData.couple.bride.residence,
    },
  ];

  return (
    <section
      id="couple-families"
      ref={sectionRef}
      data-section="families"
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 flex flex-col items-center text-center"
    >
      <div className="w-full max-w-[720px] mx-auto flex flex-col items-center text-center">
        {/* Section Header */}
        <div data-family-reveal className="flex justify-center">
          <GoldOrnament />
        </div>

        <p
          data-family-reveal
          className="font-heading text-fluid-eyebrow uppercase text-[#855E14] font-bold mt-2"
        >
          Together With Their Families
        </p>

        <h2
          data-family-reveal
          className="font-heading text-fluid-h2 font-bold text-[#6B1A1F] mt-2 text-balance"
        >
          {invitationData.story.heading}
        </h2>

        <p
          data-family-reveal
          className="font-script text-fluid-script-lg text-[#6B1A1F] mt-2"
        >
          {invitationData.story.subheading}
        </p>

        <p
          data-family-reveal
          className="text-fluid-body text-[#6B1A1F]/90 italic max-w-xl mx-auto mt-4 px-2 text-balance"
        >
          &ldquo;{invitationData.story.invitationBody}&rdquo;
        </p>

        {/* Transparent Couple Portrait seamlessly resting on Cream Paper with Gold Halo */}
        <motion.div
          data-family-reveal
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[360px] sm:max-w-[420px] mx-auto mt-10 mb-4 flex flex-col items-center text-center"
        >
          {/* Decorative Antique Gold Concentric Halo behind Couple */}
          <div className="relative w-full flex items-center justify-center pt-4">
            <div
              aria-hidden="true"
              className="absolute inset-x-4 top-6 bottom-2 rounded-[50%_50%_46%_46%] border border-[#B8892E]/55 bg-[radial-gradient(circle_at_center,rgba(255,250,238,0.82)_0%,rgba(249,238,214,0.35)_65%,transparent_100%)] pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-6 top-8 bottom-4 rounded-[50%_50%_46%_46%] border border-[#B8892E]/25 pointer-events-none"
            />

            <div className="relative z-10 w-[86%] sm:w-[88%] aspect-[682/1024]">
              <Image
                src={invitationData.assets.coupleImage}
                alt={`${invitationData.couple.groom.name} and ${invitationData.couple.bride.name} in traditional South Indian wedding attire`}
                fill
                sizes="(max-width: 640px) 310px, 370px"
                className="object-contain object-bottom drop-shadow-[0_14px_26px_rgba(107,26,31,0.2)]"
              />
            </div>
          </div>

          <p className="font-script text-fluid-script-md text-[#6B1A1F] mt-4">
            {invitationData.story.coupleCaption}
          </p>
          <div className="mt-2 w-full flex justify-center">
            <GoldOrnament className="w-6 h-6" />
          </div>
        </motion.div>

        {/* Two 3D Tilt Cards: Groom's Family & Bride's Family */}
        <div
          data-family-reveal
          className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8"
        >
          {familyCards.map((card) => (
            <TiltCard key={card.id} maxTilt={7}>
              <div className="h-full rounded-2xl parchment-card p-5 sm:p-8 flex flex-col items-center text-center justify-between">
                <div className="w-11 h-11 rounded-full border border-[#B8892E]/60 bg-[#FDF8EE] flex items-center justify-center text-[#6B1A1F] mb-3 shadow-xs">
                  <HeartHandshake className="w-5 h-5 text-[#B8892E]" aria-hidden="true" />
                </div>

                <span className="font-heading text-fluid-eyebrow uppercase text-[#855E14] font-bold">
                  {card.badge}
                </span>

                <h3 className="font-heading text-fluid-h3 font-bold text-[#6B1A1F] mt-2 text-balance">
                  {card.person}
                </h3>

                <div className="w-14 h-px bg-[#B8892E]/60 my-3" aria-hidden="true" />

                <p className="font-heading text-fluid-lead font-semibold text-[#6B1A1F] text-balance">
                  {card.parents}
                </p>

                <p className="font-body text-fluid-meta text-[#6B1A1F]/80 italic mt-1 text-balance">
                  {card.relation}
                </p>

                <p className="font-body text-fluid-meta text-[#6B1A1F]/75 mt-3 text-balance">
                  {card.note}
                </p>

                <span className="mt-4 inline-flex items-center px-3.5 py-1 rounded-full border border-[#B8892E]/45 bg-[#FDF8EE]/80 text-[11px] font-heading uppercase tracking-wider text-[#6B1A1F]">
                  {card.residence}
                </span>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Save the Dates & Live Countdown Card */}
        <div
          data-family-reveal
          className="w-full rounded-3xl parchment-card p-5 sm:p-9 mt-8 flex flex-col items-center text-center"
        >
          <span className="text-[#B8892E] text-xl" aria-hidden="true">
            ✿
          </span>
          <p className="font-heading text-fluid-eyebrow uppercase text-[#855E14] font-bold mt-2">
            Save The Auspicious Date
          </p>
          <h3 className="font-heading text-fluid-h3 font-bold text-[#6B1A1F] mt-2 text-balance">
            {invitationData.couple.displayDates}
          </h3>
          <p className="font-body text-fluid-meta uppercase tracking-[0.2em] text-[#6B1A1F]/80 mt-1">
            {invitationData.couple.displayDays}
          </p>

          <div className="w-24 h-px bg-[#B8892E]/50 my-6" aria-hidden="true" />

          <p className="font-heading text-fluid-eyebrow uppercase text-[#6B1A1F]/85 font-semibold text-balance">
            Counting Down To The Sacred Muhurtham
          </p>

          <div
            className="grid grid-cols-4 gap-1.5 sm:gap-4 w-full max-w-md mt-4"
            suppressHydrationWarning
          >
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl bg-[#FDF8EE]/90 border border-[#B8892E]/45 py-2.5 sm:py-3 px-1 sm:px-2 flex flex-col items-center text-center shadow-xs"
              >
                <span className="font-heading text-fluid-countdown font-bold text-[#6B1A1F] tabular-nums">
                  {mounted ? String(item.value).padStart(2, "0") : "--"}
                </span>
                <span className="font-heading text-[9px] sm:text-[11px] uppercase tracking-[0.06em] sm:tracking-[0.14em] text-[#855E14] font-bold mt-1">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
