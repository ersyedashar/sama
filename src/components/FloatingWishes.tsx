"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const wishes = [
  "May your birthday be filled with all the love your heart can hold 🌸",
  "Here's to another year of amazing adventures together ✨",
  "You deserve the world and so much more 🌍",
  "Wishing you all the happiness in the universe 🌙",
  "May every wish you make today come true 🎂",
  "You make life more beautiful just by being you 💫",
  "Cheers to the most incredible person I know 🥂",
  "May this year be your best one yet 🎉",
  "Sending you all the positive vibes in the world 🌈",
  "Your friendship is the greatest gift of all 💝",
];

function getBubblePositions(isSmall: boolean) {
  if (isSmall) {
    return [
      { x: 2, y: 3 },
      { x: 35, y: 1 },
      { x: 65, y: 5 },
      { x: 12, y: 22 },
      { x: 50, y: 20 },
      { x: 78, y: 18 },
      { x: 5, y: 42 },
      { x: 38, y: 38 },
      { x: 65, y: 40 },
      { x: 25, y: 58 },
    ];
  }
  return [
    { x: 5, y: 5 },
    { x: 45, y: 0 },
    { x: 25, y: 20 },
    { x: 62, y: 15 },
    { x: 8, y: 40 },
    { x: 45, y: 35 },
    { x: 72, y: 30 },
    { x: 20, y: 55 },
    { x: 55, y: 55 },
    { x: 35, y: 75 },
  ];
}

export default function FloatingWishes() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [isSmall, setIsSmall] = useState(true);

  useEffect(() => {
    const check = () => setIsSmall(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const positions = getBubblePositions(isSmall);

  return (
    <section
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 min-h-[50vh] sm:min-h-[60vh] bg-gradient-to-b from-[#050510] via-[#0a0520] to-[#050510] overflow-hidden"
      id="wishes"
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-6 md:px-8 relative z-10">
        <motion.p
          className="text-center text-xs sm:text-sm text-white/30 uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Words From The Heart
        </motion.p>

        <motion.h2
          className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-10 sm:mb-12 md:mb-16 bg-gradient-to-r from-[#b48eff] to-[#ffd700] bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Floating Wishes
        </motion.h2>
      </div>

      <div
        className="relative w-full h-[400px] sm:h-[400px] md:h-[500px] px-5 sm:px-6"
        aria-label="Floating birthday wishes"
      >
        {wishes.map((wish, i) => (
          <WishBubble
            key={i}
            wish={wish}
            index={i}
            isExpanded={expanded === i}
            onToggle={() => setExpanded(expanded === i ? null : i)}
            pos={positions[i]}
          />
        ))}
      </div>

      <AnimatePresence>
        {expanded !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpanded(null)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div
              className="relative glass-strong rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 max-w-[85vw] sm:max-w-md w-full text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-3xl sm:text-4xl mb-3 sm:mb-4 block">💫</span>
              <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed font-light break-words">
                {wishes[expanded]}
              </p>
              <button
                onClick={() => setExpanded(null)}
                className="mt-5 sm:mt-6 text-sm text-white/40 hover:text-white/70 transition-colors min-h-[44px] min-w-[44px]"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function WishBubble({
  wish,
  index,
  isExpanded,
  onToggle,
  pos,
}: {
  wish: string;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  pos: { x: number; y: number };
}) {
  return (
    <motion.div
      className="absolute cursor-pointer group"
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        maxWidth: "clamp(110px, 35vw, 200px)",
      }}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      animate={{ y: [0, -8, 0] }}
      transition={{
        type: "tween",
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.15,
      }}
      onClick={onToggle}
    >
      <motion.div
        className="glass rounded-full px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 text-center text-[10px] sm:text-xs md:text-sm text-white/60 group-hover:text-white/90 group-hover:border-white/20 border border-white/5 transition-all duration-500"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <p className="line-clamp-2">{wish.slice(0, 35)}...</p>
      </motion.div>
    </motion.div>
  );
}
