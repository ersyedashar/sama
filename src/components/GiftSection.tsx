"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";

export default function GiftSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (!isOpen) setIsOpen(true);
  };

  return (
    <section
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-[#050510] via-[#0a0520] to-[#050510] flex items-center justify-center"
      id="gift"
    >
      <div className="max-w-4xl mx-auto px-5 sm:px-6 text-center w-full">
        <motion.p
          className="text-xs sm:text-sm text-white/30 uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          A Special Surprise
        </motion.p>

        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-10 md:mb-12 bg-gradient-to-r from-[#ffd700] to-[#ffb8d0] bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          A Gift For You
        </motion.h2>

        <motion.div
          ref={ref}
          className="relative inline-block cursor-pointer"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onClick={handleClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56 lg:w-64 lg:h-64 mx-auto">
            {/* Box body */}
            <motion.div
              className="absolute bottom-0 w-full h-[70%] rounded-lg sm:rounded-xl bg-gradient-to-br from-[#b48eff] to-[#8b5cf6] shadow-[0_10px_40px_rgba(180,142,255,0.3)]"
              animate={{ rotateX: isOpen ? -10 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute top-1/2 left-0 right-0 h-3 sm:h-4 bg-gradient-to-r from-[#ffd700] to-[#ffed4a] -translate-y-1/2" />
              <div className="absolute top-0 bottom-0 left-1/2 w-3 sm:w-4 bg-gradient-to-b from-[#ffd700] to-[#ffed4a] -translate-x-1/2" />
            </motion.div>

            {/* Box lid */}
            <motion.div
              className="absolute top-0 w-full h-[35%] rounded-t-lg sm:rounded-t-xl bg-gradient-to-br from-[#c9a0ff] to-[#a78bfa] shadow-lg"
              animate={{
                y: isOpen ? -60 : isHovered ? -6 : 0,
                rotateX: isOpen ? -30 : 0,
                scale: isOpen ? 1.05 : 1,
              }}
              transition={{ type: "spring", damping: 15 }}
              style={{ transformOrigin: "bottom center" }}
            >
              <div className="absolute top-1/2 left-0 right-0 h-3 sm:h-4 bg-gradient-to-r from-[#ffd700] to-[#ffed4a] -translate-y-1/2" />
              <div className="absolute top-0 bottom-0 left-1/2 w-3 sm:w-4 bg-gradient-to-b from-[#ffd700] to-[#ffed4a] -translate-x-1/2" />
              {/* Bow */}
              <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2">
                <div className="w-8 h-5 sm:w-10 sm:h-7 md:w-12 md:h-8 relative">
                  <div className="absolute left-0 top-0 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-[#ffd700] rounded-full -rotate-12" />
                  <div className="absolute right-0 top-0 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-[#ffd700] rounded-full rotate-12" />
                  <div className="absolute left-1/2 top-1 sm:top-2 w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-[#e6b800] rounded-full -translate-x-1/2" />
                </div>
              </div>
            </motion.div>

            {isOpen && <OpenSparkles />}
          </div>
        </motion.div>

        <AnimatedMessage visible={isOpen} />
      </div>
    </section>
  );
}

function OpenSparkles() {
  const sparkles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 300,
    y: -(Math.random() * 200 + 50),
    size: Math.random() * 6 + 2,
    color: ["#ffd700", "#ffb8d0", "#b48eff", "#ff6b9d", "#34d399"][
      Math.floor(Math.random() * 5)
    ],
    delay: Math.random() * 0.5,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute left-1/2 bottom-1/2"
          initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
          animate={{ x: s.x, y: s.y, scale: [0, 1, 0], opacity: [1, 1, 0] }}
          transition={{ type: "tween", duration: 1.5, delay: s.delay, ease: "easeOut" }}
        >
          <div
            className="rounded-full"
            style={{
              width: s.size,
              height: s.size,
              backgroundColor: s.color,
              boxShadow: `0 0 ${s.size * 2}px ${s.color}`,
            }}
          />
        </motion.div>
      ))}

      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={`flower-${i}`}
          className="absolute left-1/2 bottom-1/2"
          initial={{ x: 0, y: 0, scale: 0, rotate: 0, opacity: 1 }}
          animate={{
            x: (Math.random() - 0.5) * 200,
            y: -(Math.random() * 150 + 80),
            scale: [0, 1, 0.5],
            rotate: Math.random() * 360,
            opacity: [1, 1, 0],
          }}
          transition={{
            type: "tween",
            duration: 2,
            delay: Math.random() * 0.3 + 0.2,
            ease: "easeOut",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20">
            <ellipse
              cx="10"
              cy="10"
              rx="8"
              ry="4"
              fill="rgba(255, 184, 208, 0.7)"
              transform={`rotate(${Math.random() * 180})`}
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

function AnimatedMessage({ visible }: { visible: boolean }) {
  const message =
    "You are the most incredible person I know. May this year bring you everything your heart desires and more. Happy Birthday, Sama! 🎂✨🌸";

  return (
    <motion.div
      className="mt-10 sm:mt-12 max-w-lg mx-auto w-full"
      initial={{ opacity: 0, y: 30, height: 0 }}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 30,
        height: visible ? "auto" : 0,
      }}
      transition={{ duration: 1, delay: 0.8 }}
    >
      <div className="glass-strong rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10">
        <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">🎂</div>
        <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed font-light italic break-words">
          &ldquo;{message}&rdquo;
        </p>
        <div className="mt-4 sm:mt-6 flex justify-center gap-2 text-lg sm:text-xl">
          <span>❤️</span>
          <span>🌸</span>
          <span>✨</span>
        </div>
      </div>
    </motion.div>
  );
}
