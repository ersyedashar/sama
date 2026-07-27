"use client";

import { motion } from "framer-motion";

export default function LetterSection() {
  return (
    <section
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-[#050510] via-[#0a0520] to-[#050510] overflow-hidden"
      id="letter"
    >
      <div className="max-w-3xl mx-auto px-5 sm:px-6 md:px-8">
        <motion.p
          className="text-center text-xs sm:text-sm text-white/30 uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          From The Heart
        </motion.p>

        <motion.h2
          className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-10 md:mb-12 bg-gradient-to-r from-[#b48eff] to-[#ffb8d0] bg-clip-text text-transparent break-words"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          A Letter From Er. Syed Ashar
        </motion.h2>

        <motion.div
          className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 relative overflow-hidden break-words bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(180,142,255,0.12),inset_0_1px_0_rgba(255,255,255,0.06)]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Decorative corners */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-6 h-6 sm:w-8 sm:h-8 border-t border-l border-[#b48eff]/20 rounded-tl-lg" />
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 border-t border-r border-[#b48eff]/20 rounded-tr-lg" />
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-6 h-6 sm:w-8 sm:h-8 border-b border-l border-[#b48eff]/20 rounded-bl-lg" />
          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 border-b border-r border-[#b48eff]/20 rounded-br-lg" />

          <div className="absolute inset-0 animate-shimmer opacity-30 pointer-events-none" />

          <div className="relative z-10 space-y-4 sm:space-y-5 md:space-y-6">
            <TypewriterLine
              delay={0.4}
              className="text-base sm:text-lg md:text-xl text-white/70 font-light italic"
            >
              Dear Sama,
            </TypewriterLine>

            <TypewriterLine
              delay={1.2}
              className="text-sm sm:text-base md:text-lg text-white/50 leading-relaxed"
            >
              Happy Birthday! 🎉
            </TypewriterLine>

            <TypewriterLine
              delay={2.0}
              className="text-sm sm:text-base md:text-lg text-white/50 leading-relaxed"
            >
              On your special day, I just want to wish you endless happiness,
              good health, success, and countless beautiful memories. May your
              smile always shine as brightly as it does today, and may every
              dream you have come true.
            </TypewriterLine>

            <TypewriterLine
              delay={3.2}
              className="text-sm sm:text-base md:text-lg text-white/50 leading-relaxed"
            >
              You deserve all the joy, love, and wonderful moments life has to
              offer. I hope this small surprise brings a smile to your face and
              reminds you how special today is.
            </TypewriterLine>

            <TypewriterLine
              delay={4.2}
              className="text-sm sm:text-base md:text-lg text-white/50 leading-relaxed"
            >
              Wishing you an unforgettable birthday and an amazing year ahead.
            </TypewriterLine>

            <TypewriterLine
              delay={5.2}
              className="text-base sm:text-lg md:text-xl text-white/70 font-semibold mt-6 sm:mt-8"
            >
              Happy Birthday, Sama! 🎂✨
            </TypewriterLine>

            <TypewriterLine
              delay={6.0}
              className="text-sm sm:text-base md:text-lg text-white/40 font-light mt-4 sm:mt-6"
            >
              With best wishes,
            </TypewriterLine>

            <TypewriterLine
              delay={6.6}
              className="text-base sm:text-lg md:text-xl text-[#b48eff]/80 font-medium italic mt-1 sm:mt-2"
            >
              Er. Syed Ashar
            </TypewriterLine>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TypewriterLine({
  children,
  className,
  delay,
}: {
  children: React.ReactNode;
  className?: string;
  delay: number;
}) {
  return (
    <motion.p
      className={className}
      initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.p>
  );
}
