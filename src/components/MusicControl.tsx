"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";

export default function MusicControl() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startMelody = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    const ctx = audioContextRef.current;
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const playNote = (freq: number, startTime: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.08, startTime + 0.1);
      gain.gain.linearRampToValueAtTime(0.05, startTime + duration * 0.5);
      gain.gain.linearRampToValueAtTime(0, startTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    const melody = [
      [523.25, 0, 0.8],
      [587.33, 0.6, 0.8],
      [659.25, 1.2, 1.0],
      [523.25, 2.0, 0.8],
      [698.46, 2.6, 1.0],
      [659.25, 3.4, 0.8],
      [587.33, 4.0, 1.0],
      [523.25, 4.8, 1.2],
    ];

    const loop = () => {
      if (!audioContextRef.current) return;
      const now = audioContextRef.current.currentTime;
      melody.forEach(([freq, time, dur]) => {
        playNote(freq as number, now + (time as number), dur as number);
      });
    };

    loop();
    intervalRef.current = setInterval(loop, 5800);
  }, []);

  const stopMelody = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const toggle = () => {
    if (isPlaying) {
      stopMelody();
    } else {
      startMelody();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    return () => {
      stopMelody();
      audioContextRef.current?.close();
    };
  }, [stopMelody]);

  return (
    <motion.button
      onClick={toggle}
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[100] w-11 h-11 sm:w-12 sm:h-12 rounded-full glass-strong flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 min-w-[44px] min-h-[44px]"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: "spring" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={isPlaying ? "Pause music" : "Play birthday music"}
    >
      <AnimatePresence mode="wait">
        {isPlaying ? (
          <motion.div
            key="playing"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
            className="flex items-center gap-[3px]"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-[3px] bg-white/80 rounded-full"
                animate={{ height: [8, 16, 8, 20, 8] }}
                transition={{
                  type: "tween",
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="paused"
            initial={{ scale: 0, rotate: 90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: -90 }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
