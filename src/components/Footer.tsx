"use client";

import { motion } from "framer-motion";

const emojis = [
  { emoji: "✨", delay: 0 },
  { emoji: "🌸", delay: 0.3 },
  { emoji: "🌙", delay: 0.6 },
  { emoji: "✨", delay: 0.9 },
];

export default function Footer() {
  return (
    <footer className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-[#050510] overflow-hidden">
      <div className="max-w-4xl mx-auto px-5 sm:px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-3xl sm:text-4xl mb-4 sm:mb-6">🌙</div>

          <p className="text-lg sm:text-xl md:text-2xl text-white/60 font-light mb-2 break-words">
            Made with <span className="text-[#ff6b9d]">❤️</span> especially for{" "}
            <span className="text-white/80">Sama</span>
          </p>

          <p className="text-sm sm:text-base md:text-lg text-white/30 font-light mb-1">
            by{" "}
            <span className="text-[#b48eff]/60 font-medium italic">
              Er. Syed Ashar
            </span>
          </p>

          <motion.div
            className="mx-auto mt-3 sm:mt-4 h-px w-16 sm:w-20 md:w-24 bg-gradient-to-r from-transparent via-[#b48eff]/30 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />

          <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-white/20 font-light">
            Wishing you a lifetime of happiness and magic
          </p>

          <div className="mt-6 sm:mt-8 flex justify-center gap-3 sm:gap-4 text-xl sm:text-2xl">
            {emojis.map((item, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -5, 0] }}
                transition={{
                  type: "tween",
                  duration: 2,
                  repeat: Infinity,
                  delay: item.delay,
                  ease: "easeInOut",
                }}
              >
                {item.emoji}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-64 sm:w-80 md:w-96 h-32 sm:h-36 md:h-40 bg-primary/5 blur-3xl rounded-full"
        aria-hidden="true"
      />
    </footer>
  );
}
