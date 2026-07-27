"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { getTimeUntilBirthday } from "@/lib/utils";
import ConfettiEffect from "./ConfettiEffect";

export default function Countdown() {
  const [time, setTime] = useState(getTimeUntilBirthday());
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeUntilBirthday());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (time.isBirthday && !showCelebration) {
      setShowCelebration(true);
    }
  }, [time.isBirthday, showCelebration]);

  if (showCelebration || time.isBirthday) {
    return <CelebrationMode />;
  }

  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden" id="countdown">
      <div className="max-w-5xl mx-auto px-5 sm:px-6 text-center">
        <motion.p
          className="text-base sm:text-lg md:text-xl text-white/40 tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-3 sm:mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Counting Down To
        </motion.p>

        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-10 sm:mb-12 md:mb-16 bg-gradient-to-r from-[#b48eff] to-[#ffb8d0] bg-clip-text text-transparent break-words"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          August 7th ✨
        </motion.h2>

        <div
          className="flex justify-center items-start gap-2 sm:gap-3 md:gap-6"
          role="timer"
          aria-label="Birthday countdown"
        >
          <CountdownCard value={time.days} label="Days" index={0} />
          <Separator index={1} />
          <CountdownCard value={time.hours} label="Hours" index={2} />
          <Separator index={3} />
          <CountdownCard value={time.minutes} label="Minutes" index={4} />
          <Separator index={5} />
          <CountdownCard value={time.seconds} label="Seconds" index={6} />
        </div>
      </div>
    </section>
  );
}

function CountdownCard({
  value,
  label,
  index,
}: {
  value: number;
  label: string;
  index: number;
}) {
  return (
    <motion.div
      className="glass-strong rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 min-w-[60px] sm:min-w-[72px] md:min-w-[90px] lg:min-w-[120px] flex-1 max-w-[90px] sm:max-w-[110px] md:max-w-none"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tabular-nums"
          initial={{ y: 10, opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -10, opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.3 }}
        >
          {String(value).padStart(2, "0")}
        </motion.span>
      </AnimatePresence>
      <span className="text-[10px] sm:text-xs md:text-sm text-white/40 uppercase tracking-widest mt-1 sm:mt-2 block">
        {label}
      </span>
    </motion.div>
  );
}

function Separator({ index }: { index: number }) {
  return (
    <motion.div
      className="flex items-center text-white/20 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light self-start mt-3 sm:mt-4 md:mt-6 lg:mt-8 px-0.5 sm:px-1"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      :
    </motion.div>
  );
}

function CelebrationMode() {
  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden" id="countdown">
      <ConfettiEffect />
      <div className="max-w-4xl mx-auto px-5 sm:px-6 text-center relative z-10">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 10, stiffness: 100 }}
        >
          <motion.p
            className="text-lg md:text-xl text-white/60 mb-4"
            animate={{ y: [0, -5, 0] }}
            transition={{ type: "tween", duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            🎂🎈🌸
          </motion.p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-[#ffd700] via-[#ffb8d0] to-[#b48eff] bg-clip-text text-transparent break-words">
            Happy Birthday, Sama! 🎉
          </h2>

          <p className="text-lg sm:text-xl md:text-2xl text-white/50 font-light mb-6 sm:mb-8">
            🎉 Happy Birthday, Beautiful! 🎉
          </p>

          <motion.p
            className="text-sm sm:text-base md:text-lg text-white/40 font-light break-words"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            With lots of best wishes from{" "}
            <span className="text-[#b48eff]/70 font-medium">Er. Syed Ashar</span>{" "}
            <span className="text-[#ff6b9d]/70">❤️</span>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
