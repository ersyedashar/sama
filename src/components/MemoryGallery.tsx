"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const memories = [
  { id: 1, caption: "First adventure together", color: "from-purple-900/50 to-pink-900/50" },
  { id: 2, caption: "Late night talks", color: "from-indigo-900/50 to-blue-900/50" },
  { id: 3, caption: "Laughter that echoes", color: "from-pink-900/50 to-rose-900/50" },
  { id: 4, caption: "Under the stars", color: "from-violet-900/50 to-purple-900/50" },
  { id: 5, caption: "Adventures await", color: "from-blue-900/50 to-cyan-900/50" },
  { id: 6, caption: "Forever memories", color: "from-fuchsia-900/50 to-pink-900/50" },
  { id: 7, caption: "Golden moments", color: "from-amber-900/50 to-orange-900/50" },
  { id: 8, caption: "Through the seasons", color: "from-emerald-900/50 to-teal-900/50" },
];

export default function MemoryGallery() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-[#050510]" id="gallery">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <motion.p
          className="text-center text-xs sm:text-sm text-white/30 uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Cherished Moments
        </motion.p>

        <motion.h2
          className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-10 sm:mb-12 md:mb-16 bg-gradient-to-r from-[#b48eff] to-[#ffb8d0] bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Memory Gallery
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {memories.map((memory, i) => (
            <motion.div
              key={memory.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setSelected(memory.id)}
            >
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl glass border border-white/5 group-hover:border-white/15 transition-all duration-500">
                <div
                  className={`bg-gradient-to-br ${memory.color} aspect-[4/3] flex items-center justify-center`}
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-xl sm:text-2xl">📸</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-3 sm:p-4 md:p-6">
                  <p className="text-white/90 text-xs sm:text-sm font-medium break-words">
                    {memory.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected !== null && (
          <Lightbox
            memory={memories.find((m) => m.id === selected)!}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function Lightbox({
  memory,
  onClose,
}: {
  memory: (typeof memories)[number];
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-lg" />

      <motion.div
        className="relative max-w-3xl w-full glass-strong rounded-2xl sm:rounded-3xl overflow-hidden"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`bg-gradient-to-br ${memory.color} aspect-video flex items-center justify-center`}
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-white/10 flex items-center justify-center">
            <span className="text-3xl sm:text-4xl">📸</span>
          </div>
        </div>
        <div className="p-5 sm:p-6 md:p-8 text-center">
          <p className="text-white/90 text-base sm:text-lg break-words">{memory.caption}</p>
        </div>
      </motion.div>

      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-white transition-colors min-w-[44px] min-h-[44px]"
        aria-label="Close lightbox"
      >
        ✕
      </button>
    </motion.div>
  );
}
