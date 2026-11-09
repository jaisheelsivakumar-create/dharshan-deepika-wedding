"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  ExternalLink,
  QrCode,
  Copy,
  CheckCircle2,
  PhoneCall,
  Compass,
} from "lucide-react";
import { invitationData } from "@/data/invitation";

export default function LocationSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(
      `${invitationData.location.venueName}, ${invitationData.location.fullAddress}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="location-section"
      className="relative py-16 sm:py-24 md:py-28 px-5 sm:px-8 md:px-10 max-w-4xl mx-auto z-10 w-full"
      suppressHydrationWarning
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <span className="text-[#c59b4e] text-2xl sm:text-3xl">❦</span>
        <p className="text-[#95703e] font-serif text-[11px] sm:text-xs tracking-[3px] uppercase mt-1.5 font-medium">
          {invitationData.location.subheading}
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#6b1e23] tracking-tight mt-1.5 mb-2.5">
          {invitationData.location.heading}
        </h2>
        <div className="text-[#c59b4e] text-xs">❖</div>
        <p className="text-[#756055] text-xs sm:text-base font-serif italic max-w-lg mx-auto mt-2.5 px-3 leading-relaxed">
          We eagerly look forward to welcoming you. Scan the QR code or tap the button below for turn-by-turn navigation.
        </p>
      </div>

      {/* Split Layout: Left Map / Right QR Code & Direct Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
        {/* Left Side: Display Venue Name, Address & Embedded Google Maps Iframe (7 cols) */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.85, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="lg:col-span-7 flex flex-col rounded-2xl overflow-hidden glass-parchment-deep border-2 border-[#6b1e23]/25 shadow-xl"
        >
          {/* Venue Banner */}
          <div className="p-4 sm:p-5 border-b border-[#c59b4e]/20 flex items-center justify-between gap-3 bg-[#fffaf2]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#c59b4e]/50 bg-[#fff9ee] flex items-center justify-center text-[#8a3341] shrink-0">
                <MapPin className="w-5 h-5 text-[#6b1e23]" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-serif font-bold text-[#6b1e23]">
                  {invitationData.location.venueName}
                </h3>
                <p className="text-[11px] sm:text-xs text-[#8c6753] font-serif">
                  {invitationData.location.landmark}
                </p>
              </div>
            </div>
            <a
              href={invitationData.location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#a06f2f] hover:text-[#6b1e23] font-serif font-semibold shrink-0"
            >
              <Compass className="w-4 h-4 text-[#c59b4e]" />
              <span>Get Directions</span>
            </a>
          </div>

          {/* Embedded Google Maps Iframe */}
          <div className="relative w-full flex-1 min-h-[280px] sm:min-h-[340px] bg-[#fdfbf7]">
            <iframe
              title="Wedding Venue Location Map"
              src={invitationData.location.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "contrast(1.02) saturate(1.05)" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>

          {/* Full Address Details Bar & Copy Button */}
          <div className="p-3.5 sm:p-4 bg-[#fffaf0] border-t border-[#c59b4e]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-[#6a5347]">
            <span className="leading-relaxed font-medium font-serif">
              {invitationData.location.fullAddress}
            </span>
            <button
              onClick={handleCopyAddress}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#c59b4e]/40 bg-white hover:bg-[#fff9ee] text-[#6b1e23] self-start sm:self-auto shrink-0 transition-colors font-serif font-medium cursor-pointer"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Right Side: QR Code Image & Actionable Direct Button (5 cols) */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl glass-parchment-deep border-2 border-[#6b1e23]/25 shadow-xl"
        >
          <div>
            {/* Header Badge */}
            <div className="flex items-center gap-2 mb-2.5">
              <QrCode className="w-4 h-4 text-[#c59b4e]" />
              <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#a87831] font-serif font-semibold">
                Scan for Directions
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#6b1e23] mb-1.5">
              Instant GPS Navigation
            </h3>
            <p className="text-xs sm:text-sm text-[#71594d] leading-relaxed mb-4 font-sans">
              Point your smartphone camera at the QR code below to immediately open the venue coordinates directly in Google Maps.
            </p>

            {/* Display Provided QR Code Image: google-maps-qr-code.svg */}
            <div className="flex flex-col items-center justify-center my-2">
              <div className="relative p-3 rounded-xl bg-white border border-[#c59b4e]/50 shadow-md transition-transform duration-300 hover:scale-105">
                <img
                  src={invitationData.assets.qrCodeImage}
                  alt="QR code for directions"
                  className="w-36 h-36 sm:w-44 sm:h-44 rounded-lg object-contain"
                  loading="lazy"
                />
              </div>
              <span className="mt-2.5 text-[10px] sm:text-[11px] uppercase tracking-wider text-[#8c6753] font-serif font-semibold">
                Scan for Directions
              </span>
            </div>
          </div>

          {/* Actionable Button Linking Directly to Google Maps URL */}
          <div className="space-y-3 pt-5 border-t border-[#c59b4e]/20">
            <a
              href={invitationData.location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-royal-maroon w-full flex items-center justify-center gap-2 py-3 px-4 rounded-md text-xs font-serif font-semibold tracking-wider uppercase"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-4 h-4 text-[#ffd700]" />
            </a>

            <div className="flex items-center justify-between pt-1.5 px-1 text-xs text-[#756055]">
              <div className="flex items-center gap-1.5 text-[#6b1e23]">
                <PhoneCall className="w-3.5 h-3.5 text-[#c59b4e]" />
                <span className="font-serif font-semibold">{invitationData.location.contactName}:</span>
              </div>
              <a
                href={`tel:${invitationData.location.phoneContact.split("/")[0].trim()}`}
                className="text-[#6b1e23] hover:text-[#c59b4e] transition-colors font-mono text-[11px] sm:text-xs font-semibold"
              >
                {invitationData.location.phoneContact}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
