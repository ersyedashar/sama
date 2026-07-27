"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ConfettiEffect from "./ConfettiEffect";

export default function EasterEggs() {
  const [showRainbow, setShowRainbow] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [moonClicks, setMoonClicks] = useState(0);

  // Konami Code
  useEffect(() => {
    const code = [
      "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
      "b", "a",
    ];
    let current = 0;

    const handler = (e: KeyboardEvent) => {
      if (e.key === code[current]) {
        current++;
        if (current === code.length) {
          setShowRainbow(true);
          current = 0;
          setTimeout(() => setShowRainbow(false), 5000);
        }
      } else {
        current = 0;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // 7 clicks on moon or glowing star reveals hidden signature
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("easter-moon") || target.classList.contains("star-clickable")) {
        setMoonClicks((prev) => {
          const next = prev + 1;
          if (next >= 7) {
            setShowSignature(true);
            setTimeout(() => setShowSignature(false), 6000);
            return 0;
          }
          return next;
        });
      }
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  return (
    <>
      {showRainbow && <RainbowConfetti />}
      <AnimatePresence>
        {showSignature && <HiddenSignature />}
      </AnimatePresence>
    </>
  );
}

function HiddenSignature() {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-center"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 15, stiffness: 200 }}
      >
        {/* Sparkle ring */}
        <div className="relative inline-block">
          {Array.from({ length: 12 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#ffd700] rounded-full"
              style={{
                left: `${50 + 45 * Math.cos((i * 30 * Math.PI) / 180)}%`,
                top: `${50 + 45 * Math.sin((i * 30 * Math.PI) / 180)}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                type: "tween",
                duration: 2,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}

          <div className="px-6 py-6 sm:px-10 sm:py-8 md:px-16 md:py-12">
            <motion.p
              className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-[#b48eff] via-[#ffd700] to-[#ffb8d0] bg-clip-text text-transparent mb-3"
              style={{ textShadow: "0 0 30px rgba(180, 142, 255, 0.5)" }}
            >
              Crafted with care
            </motion.p>
            <motion.p
              className="text-lg md:text-xl text-white/50 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              by{" "}
              <span className="text-[#b48eff]/80 font-medium italic">
                Er. Syed Ashar
              </span>{" "}
              <span className="text-[#ff6b9d]/80">❤️</span>
            </motion.p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function createShootingStar(x: number, y: number) {
  const star = document.createElement("div");
  star.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    width: 3px;
    height: 3px;
    background: white;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    box-shadow: 0 0 10px white, 0 0 20px #b48eff;
    animation: sparkle-float 1s ease-out forwards;
  `;
  document.body.appendChild(star);
  setTimeout(() => star.remove(), 1000);
}

function RainbowConfetti() {
  return (
    <div className="fixed inset-0 z-[200] pointer-events-none" aria-hidden="true">
      <ConfettiEffect />
    </div>
  );
}
