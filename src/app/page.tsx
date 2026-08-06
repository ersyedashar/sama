"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LandingScreen from "@/components/LandingScreen";
import StorySections from "@/components/StorySections";
import GiftSection from "@/components/GiftSection";
import Footer from "@/components/Footer";
import MusicControl from "@/components/MusicControl";
import ScrollProgress from "@/components/ScrollProgress";
import StarField from "@/components/StarField";
import FloatingPetals from "@/components/FloatingPetals";
import CustomCursor from "@/components/CustomCursor";
import EasterEggs from "@/components/EasterEggs";
import ClickEffects from "@/components/ClickEffects";

export default function Home() {
  const [started, setStarted] = useState(false);

  return (
    <div className="relative w-full">
      <CustomCursor />
      <ClickEffects />
      <EasterEggs />

      <AnimatePresence mode="wait">
        {!started && (
          <LandingScreen key="landing" onComplete={() => setStarted(true)} />
        )}
      </AnimatePresence>

      {started && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full"
        >
          <ScrollProgress />
          <StarField />
          <FloatingPetals />
          <MusicControl />

          <main className="w-full">
            <StorySections />
            <GiftSection />
          </main>

          <Footer />
        </motion.div>
      )}
    </div>
  );
}
