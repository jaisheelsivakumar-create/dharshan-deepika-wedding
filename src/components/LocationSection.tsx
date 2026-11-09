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
import { weddingData } from "@/data/weddingData";

export default function LocationSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(
      `${weddingData.location.venueName}, ${weddingData.location.fullAddress}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="location-section"
      className="relative py-24 sm:py-32 px-6 sm:px-10 max-w-4xl mx-auto z-10"
      suppressHydrationWarning
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
        <span className="text-[#a67831] text-3xl">❦</span>
        <p className="text-[#95703e] font-heading text-xs tracking-[3px] uppercase mt-2 font-medium">
          {weddingData.location.subheading}
        </p>
        <h2 className="text-3xl sm:text-5xl font-heading font-semibold text-[#6d1d29] tracking-tight mt-2 mb-3">
          {weddingData.location.heading}
        </h2>
        <div className="text-[#a87935] text-xs">❖</div>
        <p className="text-[#756055] text-sm sm:text-base font-serif italic max-w-lg mx-auto mt-3 leading-relaxed">
          We eagerly look forward to welcoming you. Scan the QR code or tap the button below for turn-by-turn navigation.
        </p>
      </div>

      {/* Split Layout: Left Map / Right QR Code & Direct Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Side: Embedded Google Map Iframe (7 cols) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="lg:col-span-7 flex flex-col rounded-2xl overflow-hidden glass-parchment-deep border border-[#b88c4a]/40 shadow-xl"
        >
          {/* Venue Banner */}
          <div className="p-5 border-b border-[#ae7e32]/20 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#ae7e32]/40 bg-[#fff9ee] flex items-center justify-center text-[#8a3341] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-heading font-semibold text-[#651c29]">
                  {weddingData.location.venueName}
                </h3>
                <p className="text-xs text-[#8c6753] font-serif">
                  {weddingData.location.landmark}
                </p>
              </div>
            </div>
            <a
              href={weddingData.location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#a06f2f] hover:text-[#741e2b] font-heading font-medium"
            >
              <Compass className="w-4 h-4 text-[#a87831]" />
              <span>Get Directions</span>
            </a>
          </div>

          {/* Interactive Map Iframe */}
          <div className="relative w-full flex-1 min-h-[340px] sm:min-h-[380px] bg-[#f8eee5]">
            <iframe
              title="Wedding Venue Location Map"
              src={weddingData.location.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "contrast(1.02) saturate(1.05)" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>

          {/* Address Details & Copy Button */}
          <div className="p-4 bg-[#fffaf0]/80 border-t border-[#ae7e32]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#6a5347]">
            <span className="leading-relaxed font-medium">{weddingData.location.fullAddress}</span>
            <button
              onClick={handleCopyAddress}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#ae7e32]/40 bg-white hover:bg-[#fff9ee] text-[#701e2a] self-start sm:self-auto shrink-0 transition-colors"
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

        {/* Right Side: QR Code & Navigation Card (5 cols) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="lg:col-span-5 flex flex-col justify-between p-7 sm:p-9 md:p-10 rounded-2xl glass-parchment-deep border border-[#b88c4a]/40 shadow-xl"
        >
          <div>
            {/* Header Badge */}
            <div className="flex items-center gap-2 mb-3">
              <QrCode className="w-5 h-5 text-[#a87831]" />
              <span className="text-xs uppercase tracking-widest text-[#a87831] font-heading font-semibold">
                Scan for Directions
              </span>
            </div>

            <h3 className="text-2xl font-heading font-semibold text-[#651c29] mb-2">
              Instant GPS Navigation
            </h3>
            <p className="text-xs sm:text-sm text-[#71594d] leading-relaxed mb-5">
              Point your smartphone camera at the QR code below to immediately open the venue coordinates directly in Google Maps.
            </p>

            {/* QR Code Container */}
            <div className="flex flex-col items-center justify-center my-2">
              <div className="relative p-3 rounded-xl bg-white border border-[#b88c4a]/50 shadow-md transition-transform duration-300 hover:scale-105">
                <img
                  src={weddingData.assets.qrCodeImage}
                  alt="Location QR Code for Google Maps"
                  className="w-40 h-40 sm:w-48 sm:h-48 rounded-lg object-contain"
                  loading="lazy"
                />
              </div>
              <span className="mt-3 text-[11px] uppercase tracking-wider text-[#8c6753] font-heading">
                Scan with any Smartphone Camera
              </span>
            </div>
          </div>

          {/* Action Buttons & Help Desk */}
          <div className="space-y-3 pt-6 border-t border-[#ae7e32]/20">
            <a
              href={weddingData.location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-royal-maroon w-full flex items-center justify-center gap-2 py-3 px-5 rounded-md text-xs font-heading tracking-wider uppercase"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-4 h-4 text-[#ffd700]" />
            </a>

            <div className="flex items-center justify-between pt-2 px-1 text-xs text-[#756055]">
              <div className="flex items-center gap-1.5 text-[#741e2b]">
                <PhoneCall className="w-3.5 h-3.5 text-[#a87831]" />
                <span className="font-heading">{weddingData.location.contactName}:</span>
              </div>
              <a
                href={`tel:${weddingData.location.phoneContact.split("/")[0].trim()}`}
                className="text-[#651c29] hover:text-[#a87831] transition-colors font-mono"
              >
                {weddingData.location.phoneContact}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
