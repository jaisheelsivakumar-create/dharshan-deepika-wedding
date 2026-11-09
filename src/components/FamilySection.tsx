"use client";

import React from "react";
import { motion } from "framer-motion";
import { HeartHandshake } from "lucide-react";
import { weddingData } from "@/data/weddingData";

export default function FamilySection() {
  return (
    <section
      id="family-section"
      className="relative py-20 px-4 sm:px-6 max-w-5xl mx-auto z-10"
      suppressHydrationWarning
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-[#a67831] text-2xl">❦</span>
        <p className="text-[#95703e] font-heading text-xs tracking-[3px] uppercase mt-1">
          {weddingData.family.subheading}
        </p>
        <h2 className="text-3xl sm:text-5xl font-heading font-semibold text-[#6d1d29] tracking-tight mt-2 mb-3">
          {weddingData.family.heading}
        </h2>
        <div className="text-[#a87935] text-xs">❖</div>
        <p className="text-[#756055] text-sm sm:text-base font-serif italic max-w-lg mx-auto mt-3">
          {weddingData.family.traditionalNote}
        </p>
      </div>

      {/* Parents Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Groom's Parents Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="p-8 rounded-2xl glass-parchment-deep border border-[#b88c4a]/40 shadow-xl text-center"
        >
          <div className="w-12 h-12 mx-auto mb-3 rounded-full border border-[#ae7e32]/40 bg-[#fff9ee] flex items-center justify-center text-[#741e2b]">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <span className="text-xs uppercase tracking-widest text-[#a87831] font-heading font-semibold">
            {weddingData.family.groomParents.label}
          </span>
          <h3 className="text-2xl font-heading font-semibold text-[#651c29] mt-2 mb-1">
            {weddingData.family.groomParents.mother} {"&"} {weddingData.family.groomParents.father}
          </h3>
          <p className="text-xs sm:text-sm text-[#8c6753] font-serif italic mb-4">
            Parents of Groom Dharshan
          </p>
          <p className="text-xs text-[#71594d] leading-relaxed border-t border-[#ae7e32]/20 pt-4">
            {weddingData.family.groomParents.description}
          </p>
        </motion.div>

        {/* Bride's Parents Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="p-8 rounded-2xl glass-parchment-deep border border-[#b88c4a]/40 shadow-xl text-center"
        >
          <div className="w-12 h-12 mx-auto mb-3 rounded-full border border-[#ae7e32]/40 bg-[#fff9ee] flex items-center justify-center text-[#741e2b]">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <span className="text-xs uppercase tracking-widest text-[#a87831] font-heading font-semibold">
            {weddingData.family.brideParents.label}
          </span>
          <h3 className="text-2xl font-heading font-semibold text-[#651c29] mt-2 mb-1">
            {weddingData.family.brideParents.mother} {"&"} {weddingData.family.brideParents.father}
          </h3>
          <p className="text-xs sm:text-sm text-[#8c6753] font-serif italic mb-4">
            Parents of Bride Deepika
          </p>
          <p className="text-xs text-[#71594d] leading-relaxed border-t border-[#ae7e32]/20 pt-4">
            {weddingData.family.brideParents.description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
