"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ParallaxLayer } from "@/components/scene/ParallaxLayer";
import { useStory } from "@/components/providers/StoryProvider";
import { HypnoticCircles } from "@/components/scene/HypnoticCircles";

// Helper for random organic motion
const useAmbientMotion = (delay: number, intensity: number = 1) => {
  return {
    animate: {
      x: [0, 30 * intensity, -20 * intensity, 0],
      y: [0, -40 * intensity, 20 * intensity, 0],
      scale: [1, 1.1, 0.9, 1],
      opacity: [0.3, 0.5, 0.3],
    },
    transition: {
      duration: (15 + Math.random() * 10) / intensity, // Higher intensity = faster
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: delay,
    },
  };
};

export function LivingBackground() {
  const [mounted, setMounted] = useState(false);
  const { phase } = useStory();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Phase-based configurations (Reduced to strict black)
  const config = {
    ADRENALINE: { intensity: 1 },
    IMPACT: { intensity: 0.2 },
    ASCENSION: { intensity: 0.8 },
  }[phase];

  return (
    <motion.div 
      className="absolute inset-0 overflow-hidden bg-black"
    >
      
      {/* Layer 1 & 2 Removed for "Black Only" Aesthetic */}

      {/* Noise Overlay */}
      <div className={`absolute inset-0 opacity-[0.05] pointer-events-none ${phase === "IMPACT" ? "mix-blend-multiply" : "mix-blend-overlay"}`}
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
      
      {/* Vignette - Less intense in IMPACT phase */}
      <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 pointer-events-none transition-opacity duration-1000 ${phase === "IMPACT" ? "opacity-20" : "opacity-100"}`} />
      
      {/* Global Hypnotic Animation (Replaces Neon Grid) */}
      <HypnoticCircles className="absolute inset-0 z-0 pointer-events-none mix-blend-screen" opacity={0.5} />

    </motion.div>
  );
}
