"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };
    const down = () => setIsClicking(true);
    const up = () => setIsClicking(false);
    const leave = () => setIsVisible(false);
    const enter = () => setIsVisible(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, [isVisible]);

  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        animate={{
          x: pos.x - 10,
          y: pos.y - 10,
          scale: isClicking ? 0.8 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 300, mass: 0.5 }}
      >
        <div className="w-5 h-5 rounded-full border border-white/50 bg-white/10" />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
        animate={{
          x: pos.x - 20,
          y: pos.y - 20,
          scale: isClicking ? 1.5 : 1,
          opacity: isVisible ? 0.4 : 0,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 150, mass: 0.8 }}
      >
        <div className="w-10 h-10 rounded-full bg-primary/10 blur-sm" />
      </motion.div>
    </>
  );
}
