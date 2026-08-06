"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface Props {
  onComplete: () => void;
}

export default function LandingScreen({ onComplete }: Props) {
  const [phase, setPhase] = useState(0);
  const [starsVisible, setStarsVisible] = useState(false);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    timers.push(setTimeout(() => setStarsVisible(true), 300));
    timers.push(setTimeout(() => setPhase(1), 1800));
    timers.push(setTimeout(() => setPhase(2), 3200));
    timers.push(setTimeout(() => setPhase(3), 4500));
    timers.push(setTimeout(() => setPhase(4), 5800));
    return () => timers.forEach(clearTimeout);
  }, []);

  const titleWords = "Happy Birthday".split(" ");

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#050510] overflow-hidden"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      <LandingStars visible={starsVisible} />

      {/* Moon */}
      <motion.div
        className="absolute top-[5%] right-[5%] sm:top-[15%] sm:right-[20%] md:right-[25%]"
        initial={{ opacity: 0, scale: 0.5, y: 50 }}
        animate={{
          opacity: phase >= 1 ? 0.9 : 0,
          scale: phase >= 1 ? 1 : 0.5,
          y: phase >= 1 ? 0 : 50,
        }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <div className="relative">
          <div className="w-12 h-12 sm:w-20 sm:h-20 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-50 shadow-[0_0_60px_rgba(255,220,130,0.4),0_0_120px_rgba(255,200,80,0.2)]" />
          <div className="absolute top-0.5 left-1 sm:top-2 sm:left-4 w-3 h-3 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full bg-orange-200/30 blur-sm" />
          <div className="absolute bottom-2 right-1 sm:bottom-6 sm:right-3 w-2 h-2 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full bg-orange-200/20 blur-sm" />
        </div>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 text-center w-full max-w-lg md:max-w-3xl mx-auto px-4 sm:px-5">
        {/* Happy Birthday */}
        <div
          className="flex justify-center flex-wrap gap-x-1 gap-y-0 sm:gap-x-2 md:gap-1 mb-3 sm:mb-4 md:mb-6"
          aria-label="Happy Birthday"
        >
          {titleWords.map((word, wi) => (
            <span key={wi} className="flex gap-[1px] sm:gap-[2px] md:gap-1">
              {word.split("").map((letter, li) => (
                <motion.span
                  key={`${wi}-${li}`}
                  className="text-[1.5rem] sm:text-4xl md:text-6xl lg:text-7xl font-light tracking-wider text-white/90"
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{
                    opacity: phase >= 2 ? 1 : 0,
                    y: phase >= 2 ? 0 : 20,
                    filter: phase >= 2 ? "blur(0px)" : "blur(10px)",
                  }}
                  transition={{
                    duration: 0.6,
                    delay: wi * 0.3 + li * 0.05,
                    ease: "easeOut",
                  }}
                >
                  {letter}
                </motion.span>
              ))}
              {wi < titleWords.length - 1 && (
                <span className="w-1.5 sm:w-3 md:w-4" />
              )}
            </span>
          ))}
        </div>

        {/* Sama */}
        <div
          className="flex justify-center gap-1 sm:gap-1.5 md:gap-2"
          aria-label="Sama"
        >
          {"Sama".split("").map((letter, i) => (
            <motion.span
              key={`name-${i}`}
              className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-semibold bg-gradient-to-r from-[#b48eff] via-[#ffb8d0] to-[#b48eff] bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 40, scale: 0.8 }}
              animate={{
                opacity: phase >= 3 ? 1 : 0,
                y: phase >= 3 ? 0 : 40,
                scale: phase >= 3 ? 1 : 0.8,
              }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Sparkles around name */}
        {phase >= 3 && <Sparkles />}

        {/* Author dedication */}
        <motion.p
          className="mt-5 sm:mt-6 md:mt-8 text-xs sm:text-sm md:text-base text-white/40 font-light tracking-wide leading-relaxed break-words"
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: phase >= 4 ? 1 : 0,
            y: phase >= 4 ? 0 : 10,
          }}
          transition={{ duration: 1.2 }}
        >
          A special birthday surprise from{" "}
          <span className="text-[#b48eff] font-medium">Er. Syed Ashar</span>{" "}
          <span className="text-[#ff6b9d]">❤️</span>
        </motion.p>

        {/* Begin button */}
        <motion.button
          onClick={onComplete}
          className="mt-8 sm:mt-10 md:mt-14 px-6 py-3 sm:px-8 sm:py-3.5 md:px-10 md:py-4 rounded-full glass-strong text-white/90 text-xs sm:text-sm md:text-base font-medium tracking-wider hover:bg-white/10 transition-all duration-500 cursor-pointer group relative overflow-hidden min-h-[44px] min-w-[44px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: phase >= 3 ? 1 : 0,
            y: phase >= 3 ? 0 : 20,
          }}
          transition={{ duration: 0.8, delay: 0.8 }}
          aria-label="Begin the magical journey"
        >
          <span className="relative z-10">Begin the Journey ✨</span>
          <motion.div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.button>
      </div>
    </motion.div>
  );
}

function LandingStars({ visible }: { visible: boolean }) {
  const [stars, setStars] = useState<
    { x: number; y: number; size: number; delay: number }[]
  >([]);

  useEffect(() => {
    const count = window.innerWidth < 768 ? 40 : 80;
    setStars(
      Array.from({ length: count }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 3,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: visible ? [0.2, 0.8, 0.2] : 0,
            scale: visible ? [0.8, 1.2, 0.8] : 0,
          }}
          transition={{
            type: "tween",
            duration: 3,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function Sparkles() {
  const sparkles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100 - 50,
    y: Math.random() * 100 - 50,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 2,
    duration: Math.random() * 2 + 1.5,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute left-1/2 top-1/2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: s.x,
            y: s.y,
          }}
          transition={{
            type: "tween",
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          <svg width={s.size} height={s.size} viewBox="0 0 10 10">
            <path
              d="M5 0L6 4L10 5L6 6L5 10L4 6L0 5L4 4Z"
              fill="rgba(255, 215, 0, 0.8)"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
