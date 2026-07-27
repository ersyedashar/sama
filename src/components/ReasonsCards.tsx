"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const reasons = [
  { emoji: "❤️", title: "Kind", description: "Your kindness knows no bounds" },
  { emoji: "🌸", title: "Beautiful", description: "Inside and out, always" },
  { emoji: "✨", title: "Intelligent", description: "Brilliant in every way" },
  { emoji: "🌙", title: "Caring", description: "Always there for others" },
  { emoji: "🌷", title: "Strong", description: "Unstoppable force of nature" },
  { emoji: "😊", title: "Wonderful Friend", description: "The best anyone could ask for" },
];

export default function ReasonsCards() {
  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-[#050510]" id="reasons">
      <div className="max-w-5xl mx-auto px-5 sm:px-6 md:px-8">
        <motion.p
          className="text-center text-xs sm:text-sm text-white/30 uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          In No Particular Order
        </motion.p>

        <motion.h2
          className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-10 sm:mb-12 md:mb-16 bg-gradient-to-r from-[#ffb8d0] to-[#b48eff] bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Reasons You&apos;re Amazing
        </motion.h2>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {reasons.map((reason, i) => (
            <TiltCard key={i} reason={reason} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TiltCard({
  reason,
  index,
}: {
  reason: (typeof reasons)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="group cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      style={{ rotateX, rotateY, perspective: 800 }}
    >
      <motion.div
        className="glass-strong rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center h-full relative overflow-hidden"
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
        </div>

        <div className="relative z-10">
          <motion.span
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl block mb-3 sm:mb-4"
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {reason.emoji}
          </motion.span>

          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-2 break-words">
            {reason.title}
          </h3>

          <p className="text-white/40 text-xs sm:text-sm md:text-base break-words">
            {reason.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
