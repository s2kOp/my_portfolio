"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { HypnoticCircles } from "@/components/scene/HypnoticCircles";

// Placeholder Image (Dark/Moody)
const HERO_IMAGE = "https://ik.imagekit.io/s2kOp/rrn_cult.png"; 

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // --- Animation Phases ---
  
  // 1. Card Shrink (Reveal Black Background)
  // Shrink to Square (35vh x 35vh)
  const shrinkProgress = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const cardWidth = useTransform(shrinkProgress, (v) => `calc(100vw * ${1 - v} + 35vh * ${v})`);
  const cardHeight = useTransform(shrinkProgress, (v) => `calc(100vh * ${1 - v} + 35vh * ${v})`);
  const cardRadius = useTransform(scrollYProgress, [0, 0.4], [0, 60]); // Rounds more as it gets smaller
  
  // Image Movement: Stays anchored to bottom?
  // User: "place it at the center touching the bottom border... reduce white box... with image inside"
  // If we scale the box, the image inside scales with it automatically.
  // We just need to position it correctly initially.
  
  // Image Filter: Less aggressive dimming since we are darkening the background color manually
  const cardFilter = useTransform(scrollYProgress, [0, 0.4], ["brightness(1) grayscale(0%)", "brightness(0.8) grayscale(100%)"]);
  
  // Card Background: White -> Dark Grey
  const cardBg = useTransform(scrollYProgress, [0, 0.4], ["#ffffff", "#121212"]);
  
  // Circle Opacities: Cross-fade
  const darkCirclesOpacity = useTransform(scrollYProgress, [0, 0.2], [0.5, 0]);
  const neonCirclesOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 0.5]);

  // Text Colors: Flash from Black (on full white) to White (for Global Dark theme)
  const textColor = useTransform(scrollYProgress, [0, 0.15], ["#000000", "#ffffff"]);
  const neonColor = useTransform(scrollYProgress, [0, 0.15], ["#000000", "#ccff00"]);
  const btnBorder = useTransform(scrollYProgress, [0, 0.15], ["#000000", "#ccff00"]);
  const infoTextOpacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);

  return (
    <section ref={containerRef} className="relative h-[300vh] font-sans">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* --- LAYER 0: GLOBAL ATMOSPHERE (Revealed by Shrink) --- */}
        <div className="absolute inset-0 z-0 bg-transparent flex flex-col justify-center gap-4 pointer-events-none select-none opacity-30">
             {/* Line 1: Neon Green L->R */}
             <div className="w-full overflow-hidden flex whitespace-nowrap">
                 <motion.div 
                    className="flex gap-4 sm:gap-20 text-[12vw] md:text-[16vh] font-black text-[#ccff00] leading-none"
                    animate={{ x: ["-20%", "0%"] }} 
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                 >
                    {Array(4).fill("CURIOSITY DID THIS").map((t, i) => (
                        <span key={i}>{t}</span>
                    ))}
                 </motion.div>
             </div>
             {/* Line 2: White R->L */}
             <div className="w-full overflow-hidden flex whitespace-nowrap">
                 <motion.div 
                    className="flex gap-4 sm:gap-20 text-[12vw] md:text-[16vh] font-black text-white leading-none"
                    animate={{ x: ["0%", "-20%"] }} 
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                 >
                    {Array(4).fill("NOT DONE YET").map((t, i) => (
                        <span key={i}>{t}</span>
                    ))}
                 </motion.div>
             </div>
        </div>

        {/* --- LAYER 1.5: INFO TEXT (Appears above card) --- */}
        <motion.div 
            style={{ opacity: infoTextOpacity }}
            className="absolute top-[28vh] left-0 right-0 text-center z-20 pointer-events-none"
        >
             <span className="text-[#ccff00] text-[10px] md:text-xs tracking-[0.2em] font-mono mix-blend-difference opacity-80">
                THIS PART TOOK A WHILE
             </span>
        </motion.div>

        {/* --- LAYER 1: THE SHRINKING CARD --- */}
        <motion.div 
            style={{ 
                width: cardWidth,
                height: cardHeight,
                borderRadius: cardRadius,
                filter: cardFilter,
                backgroundColor: cardBg
            }}
            className="relative z-10 w-full h-screen overflow-hidden shadow-2xl flex flex-col items-center justify-end origin-center"
        >
            {/* 1. Dark Hypnotic Circles (Fade Out) */}
            <motion.div style={{ opacity: darkCirclesOpacity }} className="absolute inset-0">
                <HypnoticCircles 
                    className="w-full h-full" 
                    primaryColor="#000000" 
                    secondaryColor="#999999" 
                />
            </motion.div>

            {/* 2. Neon Hypnotic Circles (Fade In) */}
            <motion.div style={{ opacity: neonCirclesOpacity }} className="absolute inset-0">
                 <HypnoticCircles 
                    className="w-full h-full" 
                    primaryColor="#ccff00" 
                    secondaryColor="#333333" 
                />
            </motion.div>
            
            {/* Main Image */}
            <motion.div 
              className="relative z-10 h-[85%] w-auto max-w-[90%] md:max-w-[60%] flex items-end"
            >
                <img 
                   src={HERO_IMAGE} 
                   alt="Hero" 
                   className="w-full h-full object-contain object-bottom"
                />
            </motion.div>

            {/* Signature Removed per request */}
            
        </motion.div>


      </div>
    </section>
  );
}
