"use client";

import React from "react";
import { ArrowUp, Heart } from "lucide-react";
import { invitationData } from "@/data/invitation";
import { MotionButton } from "@/components/ui/MotionButton";
import { GoldOrnament } from "@/components/ui/GoldOrnament";

export default function FooterSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="footer"
      data-section="footer"
      className="relative w-full pt-16 sm:pt-24 pb-52 sm:pb-64 md:pb-[36vh] lg:pb-[39vh] px-4 sm:px-6 flex flex-col items-center text-center"
    >
      <div className="w-full max-w-[720px] mx-auto rounded-3xl parchment-card px-5 py-9 sm:px-10 sm:py-12 flex flex-col items-center text-center">
        <GoldOrnament />

        <h2 className="font-script text-fluid-script-lg text-[#6B1A1F] font-normal mt-3 text-balance">
          {invitationData.footer.heading}
        </h2>

        <p className="text-fluid-body text-[#6B1A1F]/85 italic max-w-lg mx-auto mt-3 text-balance">
          {invitationData.footer.message}
        </p>

        <div className="w-24 h-px bg-[#B8892E]/55 my-6" aria-hidden="true" />

        <p className="font-script text-fluid-script-md text-[#6B1A1F]">
          {invitationData.couple.groom.name}{" "}
          <span className="font-body italic text-lg sm:text-2xl text-[#855E14]">
            &amp;
          </span>{" "}
          {invitationData.couple.bride.name}
        </p>

        <p className="font-heading text-fluid-eyebrow uppercase text-[#855E14] font-bold mt-2">
          {invitationData.couple.displayDates}
        </p>

        <p className="font-body text-fluid-meta text-[#6B1A1F]/80 italic max-w-md mx-auto mt-5 text-balance">
          {invitationData.footer.blessingsText}
        </p>

        <div className="mt-7 flex justify-center w-full">
          <MotionButton onClick={scrollToTop} ariaLabel="Return to top of invitation">
            <span>Return to Top</span>
            <ArrowUp className="w-4 h-4 text-[#DFBC6E]" aria-hidden="true" />
          </MotionButton>
        </div>

        <p className="mt-7 inline-flex flex-wrap items-center justify-center gap-1.5 text-fluid-meta font-body text-[#6B1A1F]/70 text-center">
          <span>{invitationData.footer.creditLine}</span>
          <Heart className="w-3.5 h-3.5 text-[#6B1A1F] fill-[#6B1A1F] shrink-0" aria-hidden="true" />
        </p>
      </div>
    </footer>
  );
}
