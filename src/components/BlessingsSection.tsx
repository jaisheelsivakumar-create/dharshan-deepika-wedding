"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Send, Sparkles, MessageCircleHeart, Users } from "lucide-react";
import { weddingData } from "@/data/weddingData";

interface Blessing {
  id: string;
  name: string;
  message: string;
  time: string;
}

const defaultBlessings: Blessing[] = [
  {
    id: "b1",
    name: "Uncle Ramesh & Family",
    message: "Wishing dearest Dharashan and Priyadharshini a life overflowing with laughter, deep friendship, and endless blessings!",
    time: "2 hours ago",
  },
  {
    id: "b2",
    name: "Dr. Ananya & Karthik",
    message: "May the divine grace illuminate your holy bond as you take your sacred vows. Can't wait to celebrate!",
    time: "5 hours ago",
  },
  {
    id: "b3",
    name: "Siddharth & Sneha",
    message: "Hearty congratulations! May your journey together be as magical and joyous as this grand celebration.",
    time: "Yesterday",
  },
];

export default function BlessingsSection() {
  const [blessingCount, setBlessingCount] = useState(148);
  const [hasShowered, setHasShowered] = useState(false);
  const [blessings, setBlessings] = useState<Blessing[]>(defaultBlessings);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; left: number }[]>([]);

  useEffect(() => {
    // Load persisted count if exists
    const saved = localStorage.getItem("wedding_blessing_count");
    if (saved) setBlessingCount(parseInt(saved, 10));

    const savedWishes = localStorage.getItem("wedding_guest_wishes");
    if (savedWishes) {
      try {
        setBlessings(JSON.parse(savedWishes));
      } catch {
        // fallback
      }
    }
  }, []);

  const handleShowerBlessings = () => {
    const newCount = blessingCount + 1;
    setBlessingCount(newCount);
    setHasShowered(true);
    localStorage.setItem("wedding_blessing_count", newCount.toString());

    // Generate floating hearts
    const hearts = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 80 + 10,
    }));
    setFloatingHearts((prev) => [...prev, ...hearts]);
    setTimeout(() => {
      setFloatingHearts((prev) => prev.slice(hearts.length));
    }, 2500);
  };

  const handleSendWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newWish: Blessing = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      time: "Just now",
    };

    const updated = [newWish, ...blessings];
    setBlessings(updated);
    localStorage.setItem("wedding_guest_wishes", JSON.stringify(updated));
    setName("");
    setMessage("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 max-w-5xl mx-auto z-10">
      {/* Floating Hearts Animation Container */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <AnimatePresence>
          {floatingHearts.map((heart) => (
            <motion.div
              key={heart.id}
              initial={{ opacity: 1, y: "80vh", scale: 0.6 }}
              animate={{ opacity: 0, y: "15vh", scale: 1.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.2, ease: "easeOut" }}
              className="absolute text-rose-400 drop-shadow-lg"
              style={{ left: `${heart.left}%` }}
            >
              <Heart className="w-8 h-8 fill-rose-500 text-rose-300" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 text-amber-400 text-xs sm:text-sm uppercase tracking-[0.3em] mb-2 font-serif"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Warmest Wishes</span>
          <Sparkles className="w-3.5 h-3.5" />
        </motion.div>

        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-gold-gradient tracking-tight mb-4">
          Shower Your Blessings
        </h2>

        <p className="text-amber-100/70 text-sm sm:text-base font-serif italic max-w-lg mx-auto">
          Your warm blessings and cherished presence are the greatest gifts of love you bring into our lives.
        </p>

        {/* Big Heart Tap Button */}
        <div className="mt-8 flex flex-col items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            onClick={handleShowerBlessings}
            className={`group relative flex items-center gap-3 px-8 py-4 rounded-full font-serif text-sm sm:text-base font-bold shadow-2xl transition-all duration-300 ${
              hasShowered
                ? "bg-gradient-to-r from-rose-600 to-amber-600 text-white border border-rose-400/50 shadow-rose-500/20"
                : "glass-luxury border-2 border-amber-400/50 text-amber-200 hover:border-amber-300 hover:text-white"
            }`}
          >
            <Heart
              className={`w-6 h-6 transition-transform group-hover:scale-125 ${
                hasShowered ? "fill-white text-white" : "fill-rose-500/80 text-rose-400"
              }`}
            />
            <span>
              {hasShowered ? "Blessings Showered!" : "Tap to Shower Blessings"}
            </span>
            <span
              className="ml-2 px-2.5 py-0.5 rounded-full bg-black/40 text-xs font-mono text-amber-300"
              suppressHydrationWarning
            >
              {blessingCount}
            </span>
          </motion.button>
          <span className="text-xs text-neutral-400 mt-2 font-sans">
            Tap multiple times to shower love
          </span>
        </div>
      </div>

      {/* Guest Wishes Card & Recent Messages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left: Leave a message form (5 cols) */}
        <div className="md:col-span-5 p-6 sm:p-7 rounded-3xl glass-luxury border border-amber-500/30 box-shadow-deep-3d">
          <div className="flex items-center gap-2 mb-4 text-amber-300">
            <MessageCircleHeart className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-serif font-bold text-neutral-100">
              Leave a Warm Wish
            </h3>
          </div>

          <form onSubmit={handleSendWish} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-amber-200/80 font-serif mb-1.5">
                Your Name / Family
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Uncle Suresh & Family"
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-amber-400 focus:outline-none text-sm text-neutral-100 placeholder-neutral-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-amber-200/80 font-serif mb-1.5">
                Your Blessings & Message
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your wishes for the couple..."
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-amber-400 focus:outline-none text-sm text-neutral-100 placeholder-neutral-500 font-sans resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Wedding Wish</span>
            </button>

            {submitted && (
              <p className="text-xs text-emerald-400 text-center font-medium animate-fade-in">
                Thank you! Your beautiful wish has been recorded.
              </p>
            )}
          </form>
        </div>

        {/* Right: Recent guest wishes feed (7 cols) */}
        <div className="md:col-span-7 space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs uppercase tracking-widest text-amber-300 font-serif font-semibold">
              Guest Blessings Wall
            </span>
            <span className="text-xs text-neutral-400 font-sans">
              {blessings.length} Messages
            </span>
          </div>

          <div className="space-y-3.5 max-h-[460px] overflow-y-auto pr-1">
            {blessings.map((b) => (
              <div
                key={b.id}
                className="p-5 rounded-2xl glass-luxury border border-amber-500/20 hover:border-amber-400/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-serif font-bold text-amber-200">
                    {b.name}
                  </h4>
                  <span className="text-[11px] text-neutral-400">{b.time}</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-300/90 font-serif italic leading-relaxed">
                  &ldquo;{b.message}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
