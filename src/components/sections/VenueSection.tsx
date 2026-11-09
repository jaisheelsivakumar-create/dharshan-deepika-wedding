"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { QRCodeSVG } from "qrcode.react";
import {
  CheckCircle2,
  Compass,
  Copy,
  ExternalLink,
  MapPin,
  QrCode,
} from "lucide-react";
import { invitationData } from "@/data/invitation";
import { MotionButton, MotionLinkButton } from "@/components/ui/MotionButton";
import { GoldDivider, GoldOrnament } from "@/components/ui/GoldOrnament";

gsap.registerPlugin(ScrollTrigger);

interface VenueSectionProps {
  isOpened: boolean;
  onShowToast: (msg: string) => void;
}

export default function VenueSection({ isOpened, onShowToast }: VenueSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpened || !sectionRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-venue-reveal]",
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.78,
          stagger: 0.1,
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

  const handleCopyAddress = async () => {
    const text = `${invitationData.location.venueName}, ${invitationData.location.fullAddress}`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    onShowToast("Venue address copied to clipboard!");
    setTimeout(() => setCopied(false), 2600);
  };

  return (
    <section
      id="venue"
      ref={sectionRef}
      data-section="venue"
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 flex flex-col items-center text-center"
    >
      <div className="w-full max-w-[720px] mx-auto flex flex-col items-center text-center">
        {/* Section Heading */}
        <div data-venue-reveal className="flex justify-center">
          <GoldOrnament />
        </div>
        <p
          data-venue-reveal
          className="font-heading text-fluid-eyebrow uppercase text-[#855E14] font-bold mt-2"
        >
          {invitationData.location.subheading}
        </p>
        <h2
          data-venue-reveal
          className="font-heading text-fluid-h2 font-bold text-[#6B1A1F] mt-2 text-balance"
        >
          {invitationData.location.heading}
        </h2>
        <div data-venue-reveal className="my-3 w-full flex justify-center">
          <GoldDivider maxWidth="max-w-[160px]" />
        </div>
        <p
          data-venue-reveal
          className="text-fluid-body text-[#6B1A1F]/85 italic max-w-lg mx-auto text-balance"
        >
          We eagerly await welcoming you. Use the interactive map or scan the QR code below for instant directions.
        </p>

        {/* Map & Address Card */}
        <div
          data-venue-reveal
          className="w-full mt-10 rounded-3xl parchment-card p-5 sm:p-8 flex flex-col items-center text-center gap-5"
        >
          <div className="w-11 h-11 rounded-full border border-[#B8892E]/60 bg-[#FDF8EE] flex items-center justify-center">
            <MapPin className="w-5 h-5 text-[#6B1A1F]" aria-hidden="true" />
          </div>

          <div className="flex flex-col items-center text-center">
            <h3 className="font-heading text-fluid-h3 font-bold text-[#6B1A1F] uppercase tracking-wide text-balance">
              {invitationData.location.venueName}
            </h3>
            <p className="font-body text-fluid-meta text-[#6B1A1F]/75 mt-1 text-balance">
              {invitationData.location.landmark}
            </p>
          </div>

          {/* Rounded Gold-Bordered Google Map Embed Frame (rendered once opened so splash load stays ultra-fast) */}
          <div className="w-full h-[270px] sm:h-[340px] rounded-2xl overflow-hidden border-2 border-[#B8892E]/70 shadow-[0_12px_30px_rgba(107,26,31,0.12)] bg-[#FDF8EE] flex items-center justify-center">
            {isOpened ? (
              <iframe
                title={`Map to ${invitationData.location.venueName}`}
                src={invitationData.location.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            ) : (
              <p className="font-heading text-fluid-eyebrow uppercase text-[#6B1A1F]/70">
                {invitationData.location.venueName} Map
              </p>
            )}
          </div>

          {/* Address Text */}
          <p className="font-body text-fluid-lead text-[#6B1A1F] font-medium max-w-lg text-balance">
            {invitationData.location.fullAddress}
          </p>

          {/* Action Buttons: Get Directions & Copy Address */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full">
            <MotionLinkButton
              href={invitationData.location.googleMapsUrl}
              className="w-full sm:w-auto"
            >
              <Compass className="w-4 h-4 text-[#DFBC6E]" aria-hidden="true" />
              <span>Get Directions</span>
            </MotionLinkButton>

            <MotionButton
              onClick={handleCopyAddress}
              className="w-full sm:w-auto"
              ariaLabel="Copy venue address to clipboard"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#DFBC6E]" aria-hidden="true" />
                  <span>Address Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#DFBC6E]" aria-hidden="true" />
                  <span>Copy Address</span>
                </>
              )}
            </MotionButton>
          </div>
        </div>

        {/* QR Code Card ("Scan for Directions / Instant GPS Navigation") */}
        <div
          data-venue-reveal
          className="w-full mt-8 rounded-3xl parchment-card p-6 sm:p-9 flex flex-col items-center text-center gap-4"
        >
          <div className="inline-flex items-center gap-2 text-[#855E14]">
            <QrCode className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="font-heading text-fluid-eyebrow uppercase font-bold">
              Scan for Directions
            </span>
          </div>

          <h3 className="font-heading text-fluid-h3 font-bold text-[#6B1A1F] text-balance">
            Instant GPS Navigation
          </h3>

          <p className="font-body text-fluid-meta text-[#6B1A1F]/80 max-w-md text-balance">
            Point your phone camera at the QR code below to open the venue directly in Google Maps.
          </p>

          {/* Dynamically Generated SVG QR Code */}
          <div className="my-2 p-4 rounded-2xl bg-white border-2 border-[#B8892E]/70 shadow-[0_12px_28px_rgba(107,26,31,0.12)] flex items-center justify-center">
            <QRCodeSVG
              value={invitationData.location.googleMapsUrl}
              size={176}
              bgColor="#FFFFFF"
              fgColor="#6B1A1F"
              level="M"
              title="QR code for Google Maps directions"
            />
          </div>

          <MotionLinkButton href={invitationData.location.googleMapsUrl}>
            <span>Open in Google Maps</span>
            <ExternalLink className="w-4 h-4 text-[#DFBC6E]" aria-hidden="true" />
          </MotionLinkButton>
        </div>
      </div>
    </section>
  );
}
