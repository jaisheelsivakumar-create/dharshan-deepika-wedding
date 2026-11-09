"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, HeartHandshake } from "lucide-react";
import { weddingData } from "@/data/weddingData";

export default function FamilySection() {
  return (
    <section id="family-section" className="relative py-20 px-4 sm:px-6 max-w-5xl mx-auto z-10" suppressHydrationWarning>
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-2 text-amber-400 text-xs sm:text-sm uppercase tracking-[0.3em] mb-2 font-serif"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{weddingData.family.subheading}</span>
          <Sparkles className="w-3.5 h-3.5" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-serif font-bold text-gold-gradient tracking-tight mb-4"
        >
          {weddingData.family.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-amber-100/70 text-sm sm:text-base font-serif italic max-w-lg mx-auto"
        >
          {weddingData.family.traditionalNote}
        </motion.p>
      </div>

      {/* Parents Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Groom's Parents Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="p-8 rounded-3xl glass-luxury border border-amber-500/30 box-shadow-deep-3d relative overflow-hidden text-center"
        >
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-2xl glass-luxury border border-amber-400/40 flex items-center justify-center text-amber-300">
              <HeartHandshake className="w-6 h-6" />
            </div>
          </div>
          <span className="text-xs uppercase tracking-widest text-amber-400 font-serif font-semibold">
            {weddingData.family.groomParents.label}
          </span>
          <h3 className="text-2xl font-serif font-bold text-neutral-100 mt-2 mb-1">
            {weddingData.family.groomParents.mother} {"&"} {weddingData.family.groomParents.father}
          </h3>
          <p className="text-xs sm:text-sm text-amber-200/70 font-serif italic mb-4">
            Parents of Groom Dharshan
          </p>
          <p className="text-xs text-neutral-300/80 leading-relaxed font-sans border-t border-white/10 pt-4">
            {weddingData.family.groomParents.description}
          </p>
        </motion.div>

        {/* Bride's Parents Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="p-8 rounded-3xl glass-luxury border border-amber-500/30 box-shadow-deep-3d relative overflow-hidden text-center"
        >
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-2xl glass-luxury border border-amber-400/40 flex items-center justify-center text-amber-300">
              <HeartHandshake className="w-6 h-6" />
            </div>
          </div>
          <span className="text-xs uppercase tracking-widest text-amber-400 font-serif font-semibold">
            {weddingData.family.brideParents.label}
          </span>
          <h3 className="text-2xl font-serif font-bold text-neutral-100 mt-2 mb-1">
            {weddingData.family.brideParents.mother} {"&"} {weddingData.family.brideParents.father}
          </h3>
          <p className="text-xs sm:text-sm text-amber-200/70 font-serif italic mb-4">
            Parents of Bride Deepika
          </p>
          <p className="text-xs text-neutral-300/80 leading-relaxed font-sans border-t border-white/10 pt-4">
            {weddingData.family.brideParents.description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
