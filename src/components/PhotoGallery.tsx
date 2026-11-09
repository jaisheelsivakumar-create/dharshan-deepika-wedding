"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Maximize2, X, Sparkles } from "lucide-react";
import { weddingData, GalleryPhoto } from "@/data/weddingData";

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  return (
    <section id="gallery-section" className="relative py-20 px-4 sm:px-6 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-2 text-amber-400 text-xs sm:text-sm uppercase tracking-[0.3em] mb-2 font-serif"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{weddingData.story.subheading}</span>
          <Sparkles className="w-3.5 h-3.5" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-serif font-bold text-gold-gradient tracking-tight mb-4"
        >
          {weddingData.story.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-amber-100/70 text-sm sm:text-base font-serif italic max-w-lg mx-auto"
        >
          {weddingData.story.quote}
        </motion.p>
      </div>

      {/* 3D Depth Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {weddingData.story.photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.9,
              delay: index * 0.15,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            whileHover={{
              y: -8,
              scale: 1.03,
              transition: { duration: 0.3 },
            }}
            onClick={() => setSelectedPhoto(photo)}
            className="group relative cursor-pointer rounded-2xl overflow-hidden glass-luxury border border-amber-500/20 shadow-2xl transition-all duration-300"
          >
            {/* Aspect container with image */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-900">
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-[0.88] group-hover:brightness-100"
                loading="lazy"
              />

              {/* Gradient Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c090e] via-[#0c090e]/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

              {/* Shimmer Border on Hover */}
              <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-amber-400/50 transition-colors duration-300 pointer-events-none" />

              {/* Expand Icon Button */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full glass-luxury border border-amber-400/30 flex items-center justify-center text-amber-200 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Caption Card at Bottom */}
              <div className="absolute bottom-0 inset-x-0 p-5 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-[11px] uppercase tracking-wider text-amber-300 font-serif">
                  {photo.subtitle}
                </span>
                <h3 className="text-lg font-serif font-bold text-neutral-100 group-hover:text-amber-200 transition-colors">
                  {photo.title}
                </h3>
                <p className="text-xs text-neutral-300/80 font-sans mt-1 line-clamp-2">
                  {photo.caption}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full rounded-2xl overflow-hidden glass-luxury border border-amber-400/40 shadow-2xl p-2 sm:p-3"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full glass-luxury border border-amber-400/40 flex items-center justify-center text-amber-200 hover:text-white hover:scale-105 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[4/5] sm:aspect-[16/10] w-full overflow-hidden rounded-xl bg-black">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-4 sm:p-6 text-center">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-serif">
                  {selectedPhoto.subtitle}
                </span>
                <h3 className="text-2xl font-serif font-bold text-neutral-100 mt-1">
                  {selectedPhoto.title}
                </h3>
                <p className="text-sm text-neutral-300 mt-2 max-w-lg mx-auto font-serif italic">
                  {selectedPhoto.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
