"use client";

import { motion } from "framer-motion";
import { useScrollProgress } from "@/hooks/useAnimations";

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
      style={{
        scaleX: progress,
        background: "linear-gradient(90deg, #b48eff, #ffb8d0, #ffd700)",
      }}
      aria-label="Scroll progress"
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}
