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
  Sparkles,
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
    <section id="location-section" className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto z-10">
      {/* Decorative Glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

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
          <span>{weddingData.location.subheading}</span>
          <Sparkles className="w-3.5 h-3.5" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-serif font-bold text-gold-gradient tracking-tight mb-4"
        >
          {weddingData.location.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-amber-100/70 text-sm sm:text-base font-serif italic max-w-lg mx-auto"
        >
          Find your way easily to our wedding venue. Scan the QR code or use the map below for one-click GPS navigation.
        </motion.p>
      </div>

      {/* Split Layout: Left Map / Right QR & Action Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Side: Stylized Google Maps Embed (7 cols) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="lg:col-span-7 flex flex-col rounded-3xl overflow-hidden glass-luxury border border-amber-500/30 box-shadow-deep-3d relative"
        >
          {/* Top venue banner */}
          <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl glass-luxury border border-amber-400/30 flex items-center justify-center text-rose-400 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-serif font-bold text-neutral-100">
                  {weddingData.location.venueName}
                </h3>
                <p className="text-xs text-amber-300/80 font-serif">
                  {weddingData.location.landmark}
                </p>
              </div>
            </div>
            <a
              href={weddingData.location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-100 font-serif"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Get Directions</span>
            </a>
          </div>

          {/* Interactive Google Map Iframe */}
          <div className="relative w-full flex-1 min-h-[360px] sm:min-h-[420px] bg-neutral-950">
            <iframe
              title="Wedding Venue Location Map"
              src={weddingData.location.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "contrast(1.05) saturate(1.1)" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>

          {/* Bottom address details bar */}
          <div className="p-4 sm:p-5 bg-neutral-950/60 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-neutral-300">
            <span className="leading-relaxed">{weddingData.location.fullAddress}</span>
            <button
              onClick={handleCopyAddress}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-luxury border border-white/10 hover:border-amber-400/40 text-amber-200 self-start sm:self-auto shrink-0 transition-colors"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
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

        {/* Right Side: QR Code & Directions Card (5 cols) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="lg:col-span-5 flex flex-col justify-between p-7 sm:p-8 rounded-3xl glass-luxury border border-amber-500/30 box-shadow-deep-3d relative overflow-hidden"
        >
          {/* Subtle floral gold motif in background */}
          <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            {/* Header Badge */}
            <div className="flex items-center gap-2 mb-4">
              <QrCode className="w-5 h-5 text-amber-400" />
              <span className="text-xs uppercase tracking-widest text-amber-300 font-serif font-semibold">
                Scan for Directions
              </span>
            </div>

            <h3 className="text-2xl font-serif font-bold text-neutral-100 mb-2">
              Instant GPS Navigation
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300/80 leading-relaxed font-sans mb-6">
              Point your smartphone camera at the QR code below to immediately open the exact venue location in Google Maps or Apple Maps.
            </p>

            {/* QR Code Container with 3D ornamental frame */}
            <div className="flex flex-col items-center justify-center my-4">
              <div className="relative p-4 rounded-2xl glass-luxury border-2 border-amber-400/40 shadow-2xl group transition-all duration-300 hover:scale-105 hover:border-amber-400">
                {/* Golden corner flourishes */}
                <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-amber-300 pointer-events-none" />
                <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-amber-300 pointer-events-none" />
                <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-amber-300 pointer-events-none" />
                <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-amber-300 pointer-events-none" />

                <img
                  src={weddingData.location.qrCodeUrl}
                  alt="Location QR Code for Google Maps"
                  className="w-44 h-44 sm:w-52 sm:h-52 rounded-xl object-contain bg-[#140e18]"
                  loading="lazy"
                />
              </div>

              <span className="mt-3 text-[11px] uppercase tracking-wider text-amber-300/80 font-serif">
                Scan with any Smartphone Camera
              </span>
            </div>
          </div>

          {/* Action Buttons & Contact Desk */}
          <div className="space-y-3 pt-6 border-t border-white/10">
            {/* Primary Action Button */}
            <a
              href={weddingData.location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-neutral-950 font-bold text-sm tracking-wide shadow-xl shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Hospitality contact */}
            <div className="flex items-center justify-between pt-2 px-1 text-xs text-neutral-400">
              <div className="flex items-center gap-2 text-amber-200">
                <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-serif">{weddingData.location.contactName}:</span>
              </div>
              <a
                href={`tel:${weddingData.location.phoneContact.split("/")[0].trim()}`}
                className="text-neutral-300 hover:text-amber-300 transition-colors font-mono"
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
