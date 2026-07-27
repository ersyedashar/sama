"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const stories = [
  {
    title: "You make the world brighter.",
    subtitle: "A light that touches everything",
    description:
      "Every room you enter becomes warmer, every moment becomes more beautiful. Your presence is a gift to everyone around you.",
    gradient: "from-[#1a0030] via-[#2d1050] to-[#1a0030]",
    accentColor: "rgba(180, 142, 255, 0.2)",
    icon: "✨",
  },
  {
    title: "A smile that lights every room.",
    subtitle: "An irreplaceable warmth",
    description:
      "Your smile is the sunrise that brightens the darkest mornings. It carries hope, love, and a kindness that words can never fully capture.",
    gradient: "from-[#1a0520] via-[#301040] to-[#1a0520]",
    accentColor: "rgba(255, 184, 208, 0.2)",
    icon: "🌸",
  },
  {
    title: "May every dream come true.",
    subtitle: "Wishes upon stars",
    description:
      "You deserve every beautiful thing this world has to offer. May your path be filled with wonder, joy, and dreams that become reality.",
    gradient: "from-[#050515] via-[#150530] to-[#050515]",
    accentColor: "rgba(100, 200, 255, 0.15)",
    icon: "🌙",
  },
  {
    title: "The best adventures are yet to come.",
    subtitle: "A beautiful future awaits",
    description:
      "Every ending is a new beginning. The most magical chapters of your story are still waiting to be written, and they will be extraordinary.",
    gradient: "from-[#0a0a15] via-[#15102a] to-[#0a0a15]",
    accentColor: "rgba(52, 211, 153, 0.15)",
    icon: "🦋",
  },
];

export default function StorySections() {
  return (
    <div className="relative">
      {stories.map((story, i) => (
        <StorySection key={i} story={story} index={i} />
      ))}
    </div>
  );
}

function StorySection({
  story,
  index,
}: {
  story: (typeof stories)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <section
      ref={ref}
      className={`relative min-h-[80vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b ${story.gradient}`}
      id={`story-${index}`}
    >
      <FloatingParticles color={story.accentColor} count={12} />

      <motion.div
        className="relative z-10 max-w-3xl mx-auto px-5 sm:px-6 md:px-8 text-center"
        style={{ y, opacity, scale }}
      >
        <motion.span
          className="text-4xl sm:text-5xl md:text-6xl block mb-6 sm:mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {story.icon}
        </motion.span>

        <motion.p
          className="text-xs sm:text-sm md:text-base text-white/30 uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {story.subtitle}
        </motion.p>

        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 sm:mb-8 text-white break-words"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {story.title}
        </motion.h2>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-white/50 leading-relaxed max-w-xl mx-auto font-light break-words"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {story.description}
        </motion.p>

        <motion.div
          className="mt-8 sm:mt-10 md:mt-12 mx-auto h-px w-16 sm:w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
        />
      </motion.div>
    </section>
  );
}

function FloatingParticles({
  color,
  count,
}: {
  color: string;
  count: number;
}) {
  const particles = useRef(
    Array.from({ length: count }, () => ({
      w: Math.random() * 100 + 40,
      h: Math.random() * 100 + 40,
      left: Math.random() * 100,
      top: Math.random() * 100,
      xDrift: Math.random() * 50 - 25,
      yDrift: Math.random() * 50 - 25,
      dur: Math.random() * 10 + 10,
    }))
  ).current;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.w,
            height: p.h,
            left: `${p.left}%`,
            top: `${p.top}%`,
            background: color,
            filter: "blur(40px)",
          }}
          animate={{
            x: [0, p.xDrift, 0],
            y: [0, p.yDrift, 0],
          }}
          transition={{
            type: "tween",
            duration: p.dur,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
