"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LandingScreen from "@/components/LandingScreen";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import StorySections from "@/components/StorySections";
import MemoryGallery from "@/components/MemoryGallery";
import GiftSection from "@/components/GiftSection";
import ReasonsCards from "@/components/ReasonsCards";
import FloatingWishes from "@/components/FloatingWishes";
import LetterSection from "@/components/LetterSection";
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
            <Hero />
            <Countdown />
            <StorySections />
            <MemoryGallery />
            <GiftSection />
            <ReasonsCards />
            <FloatingWishes />
            <LetterSection />
          </main>

          <Footer />
        </motion.div>
      )}
    </div>
  );
}
