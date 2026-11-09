"use client";

import React, { useState, useRef, useEffect } from "react";
import { Music, Volume2, VolumeX, Sparkles } from "lucide-react";
import { weddingData } from "@/data/weddingData";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Auto-dismiss tooltip after 7 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 7000);
    return () => clearTimeout(timer);
  }, []);

  // Web Audio API ambient chime fallback
  const playGentleAmbientHarp = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Pentatonic Indian classical wedding notes (Mohanam / Raga Bhupali: C, D, E, G, A, C)
      const freqs = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 659.25];

      const playTone = () => {
        if (!ctx) return;
        const note = freqs[Math.floor(Math.random() * freqs.length)];
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Warm sine / triangle acoustic harmonic tone
        osc.type = "sine";
        osc.frequency.setValueAtTime(note, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.07, ctx.currentTime + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 3.3);
      };

      playTone();
      synthIntervalRef.current = setInterval(playTone, 1400);
    } catch {
      // AudioContext not supported
    }
  };

  const stopGentleAmbientHarp = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "running") {
      audioCtxRef.current.suspend();
    }
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      stopGentleAmbientHarp();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
        setShowTooltip(false);
      } catch {
        // Fallback to Web Audio synthesis if network audio stream fails
        playGentleAmbientHarp();
        setIsPlaying(true);
        setShowTooltip(false);
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip notice */}
      {showTooltip && (
        <div
          onClick={toggleMusic}
          className="cursor-pointer hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full glass-luxury text-amber-200 text-xs border border-amber-400/30 shadow-lg animate-pulse"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Click to play wedding music</span>
        </div>
      )}

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={weddingData.audio.src}
        preload="auto"
        loop
        onEnded={() => setIsPlaying(false)}
        onError={() => {
          // If the audio URL fails, synthesize
          if (isPlaying) playGentleAmbientHarp();
        }}
      />

      {/* Floating Action Button */}
      <button
        onClick={toggleMusic}
        aria-label={isPlaying ? "Mute music" : "Play music"}
        className={`group relative flex items-center justify-center w-14 h-14 rounded-full transition-all duration-500 shadow-2xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${
          isPlaying
            ? "bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-300 text-neutral-950 scale-105 shadow-amber-500/40"
            : "glass-luxury text-amber-300 hover:text-amber-100 hover:scale-105 border border-amber-500/40 hover:border-amber-400"
        }`}
      >
        {/* Outer glowing pulsing ring when playing */}
        {isPlaying && (
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-300 opacity-60 blur-sm animate-ping pointer-events-none" />
        )}

        {/* Rotating ring ornament */}
        <span
          className={`absolute inset-0 rounded-full border border-amber-300/40 ${
            isPlaying ? "animate-spin" : ""
          }`}
          style={{ animationDuration: "12s" }}
        />

        {/* Center icon / visualizer */}
        <div className="relative flex items-center justify-center">
          {isPlaying ? (
            <div className="flex items-end gap-1 h-5">
              <span className="w-1 bg-neutral-950 rounded-full animate-bounce [animation-delay:0ms] h-3.5" />
              <span className="w-1 bg-neutral-950 rounded-full animate-bounce [animation-delay:150ms] h-5" />
              <span className="w-1 bg-neutral-950 rounded-full animate-bounce [animation-delay:300ms] h-4" />
              <span className="w-1 bg-neutral-950 rounded-full animate-bounce [animation-delay:450ms] h-2.5" />
            </div>
          ) : (
            <Music className="w-6 h-6 transition-transform group-hover:scale-110" />
          )}
        </div>
      </button>
    </div>
  );
}
