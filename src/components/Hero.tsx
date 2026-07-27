"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      id="hero"
    >
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0020] via-[#120030] to-[#050510]" />
        <AuroraBackground />
      </motion.div>

      <motion.div
        className="relative z-10 text-center w-full max-w-4xl mx-auto px-5 sm:px-6 md:px-8"
        style={{ opacity }}
      >
        <motion.p
          className="text-sm sm:text-base md:text-xl text-white/50 tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          For Someone Special
        </motion.p>

        <motion.h1
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <span className="bg-gradient-to-r from-white via-[#e8d5ff] to-white bg-clip-text text-transparent">
            Sama
          </span>
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-2xl lg:text-3xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed break-words"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          A magical journey through memories, wishes,{" "}
          <br className="hidden sm:block" />
          and everything that makes you extraordinary
        </motion.p>

        <motion.p
          className="mt-8 sm:mt-10 text-xs sm:text-sm md:text-base text-white/30 font-light break-words"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          A special birthday surprise from{" "}
          <span className="text-[#b48eff]/70">Er. Syed Ashar</span>{" "}
          <span className="text-[#ff6b9d]/70">❤️</span>
        </motion.p>

        <motion.div
          className="mt-10 sm:mt-12 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.div
            className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 border-white/20 flex justify-center pt-1.5 sm:pt-2"
            animate={{ y: [0, 5, 0] }}
            transition={{ type: "tween", duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="w-0.5 h-1.5 sm:w-1 sm:h-2 rounded-full bg-white/40"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ type: "tween", duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute top-[-50%] left-[-20%] w-[140%] h-[140%] opacity-30"
        animate={{
          background: [
            "radial-gradient(ellipse at 20% 50%, rgba(180, 142, 255, 0.3) 0%, transparent 60%)",
            "radial-gradient(ellipse at 80% 50%, rgba(100, 200, 255, 0.3) 0%, transparent 60%)",
            "radial-gradient(ellipse at 50% 80%, rgba(255, 184, 208, 0.3) 0%, transparent 60%)",
            "radial-gradient(ellipse at 20% 50%, rgba(180, 142, 255, 0.3) 0%, transparent 60%)",
          ],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-[-30%] right-[-10%] w-[80%] h-[80%] opacity-20"
        animate={{
          background: [
            "radial-gradient(ellipse at 50% 50%, rgba(255, 184, 208, 0.4) 0%, transparent 50%)",
            "radial-gradient(ellipse at 30% 50%, rgba(180, 142, 255, 0.4) 0%, transparent 50%)",
            "radial-gradient(ellipse at 50% 50%, rgba(255, 184, 208, 0.4) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
