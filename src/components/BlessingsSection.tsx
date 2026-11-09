"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Send, MessageCircleHeart } from "lucide-react";

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
    message: "Wishing dearest Dharshan and Deepika a lifetime overflowing with laughter, deep friendship, and divine blessings!",
    time: "2 hours ago",
  },
  {
    id: "b2",
    name: "Dr. Ananya & Karthik",
    message: "May the divine grace illuminate your sacred union as you take your sacred vows. Can't wait to celebrate!",
    time: "5 hours ago",
  },
  {
    id: "b3",
    name: "Siddharth & Sneha",
    message: "Hearty congratulations! May your journey together be as magical and joyous as this auspicious celebration.",
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

    const hearts = Array.from({ length: 10 }, (_, i) => ({
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
    <section className="relative py-20 px-4 sm:px-6 max-w-5xl mx-auto z-10" suppressHydrationWarning>
      {/* Floating Hearts Animation */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
        <AnimatePresence>
          {floatingHearts.map((heart) => (
            <motion.div
              key={heart.id}
              initial={{ opacity: 1, y: "85vh", scale: 0.6 }}
              animate={{ opacity: 0, y: "15vh", scale: 1.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.2, ease: "easeOut" }}
              className="absolute text-[#e78ba1] drop-shadow-sm"
              style={{ left: `${heart.left}%` }}
            >
              <Heart className="w-8 h-8 fill-[#e78ba1] text-[#741e2b]" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-[#a67831] text-2xl">❦</span>
        <p className="text-[#95703e] font-heading text-xs tracking-[3px] uppercase mt-1">
          Warmest Wishes
        </p>
        <h2 className="text-3xl sm:text-5xl font-heading font-semibold text-[#6d1d29] tracking-tight mt-2 mb-3">
          Shower Your Blessings
        </h2>
        <div className="text-[#a87935] text-xs">❖</div>
        <p className="text-[#756055] text-sm sm:text-base font-serif italic max-w-lg mx-auto mt-3">
          Your warm blessings and cherished presence are the greatest gifts of love you bring into our lives.
        </p>

        {/* Big Heart Tap Button */}
        <div className="mt-8 flex flex-col items-center justify-center">
          <button
            onClick={handleShowerBlessings}
            className={`group relative flex items-center gap-3 px-8 py-3.5 rounded-full font-heading text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-md ${
              hasShowered
                ? "bg-[#741e2b] text-[#fff8ee] border border-[#b1823c]"
                : "glass-parchment-deep border border-[#b88c4a]/50 text-[#741e2b] hover:bg-white"
            }`}
          >
            <Heart
              className={`w-5 h-5 transition-transform group-hover:scale-125 ${
                hasShowered ? "fill-white text-white" : "fill-[#e78ba1] text-[#741e2b]"
              }`}
            />
            <span>{hasShowered ? "Blessings Showered!" : "Tap to Shower Blessings"}</span>
            <span
              className="ml-2 px-2.5 py-0.5 rounded-full bg-black/10 text-xs font-mono text-[#741e2b]"
              suppressHydrationWarning
            >
              {blessingCount}
            </span>
          </button>
          <span className="text-xs text-[#8c6753] mt-2 font-serif italic">
            Tap multiple times to shower love
          </span>
        </div>
      </div>

      {/* Guest Wishes Card & Feed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left: Message Form (5 cols) */}
        <div className="md:col-span-5 p-6 sm:p-7 rounded-2xl glass-parchment-deep border border-[#b88c4a]/40 shadow-xl">
          <div className="flex items-center gap-2 mb-4 text-[#741e2b]">
            <MessageCircleHeart className="w-5 h-5 text-[#a87831]" />
            <h3 className="text-lg font-heading font-semibold text-[#651c29]">
              Leave a Warm Wish
            </h3>
          </div>

          <form onSubmit={handleSendWish} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#8c6753] font-heading mb-1.5">
                Your Name / Family
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Uncle Suresh & Family"
                className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#b88c4a]/30 focus:border-[#741e2b] focus:outline-none text-sm text-[#651c29] placeholder-[#a0897b] font-serif"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#8c6753] font-heading mb-1.5">
                Your Blessings &amp; Message
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your wishes for Dharshan & Deepika..."
                className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#b88c4a]/30 focus:border-[#741e2b] focus:outline-none text-sm text-[#651c29] placeholder-[#a0897b] font-serif resize-none"
              />
            </div>

            <button
              type="submit"
              className="btn-royal-maroon w-full flex items-center justify-center gap-2 py-3 px-5 rounded-md text-xs uppercase tracking-wider font-heading"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Wedding Wish</span>
            </button>

            {submitted && (
              <p className="text-xs text-emerald-700 text-center font-medium">
                Thank you! Your beautiful wish has been recorded.
              </p>
            )}
          </form>
        </div>

        {/* Right: Wishes Feed (7 cols) */}
        <div className="md:col-span-7 space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs uppercase tracking-widest text-[#a87831] font-heading font-semibold">
              Guest Blessings Wall
            </span>
            <span className="text-xs text-[#8c6753] font-serif">
              {blessings.length} Messages
            </span>
          </div>

          <div className="space-y-3.5 max-h-[460px] overflow-y-auto pr-1">
            {blessings.map((b) => (
              <div
                key={b.id}
                className="p-5 rounded-xl glass-parchment border border-[#b88c4a]/30"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-heading font-semibold text-[#741e2b]">
                    {b.name}
                  </h4>
                  <span className="text-[11px] text-[#8c6753]">{b.time}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#71594d] font-serif italic leading-relaxed">
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
