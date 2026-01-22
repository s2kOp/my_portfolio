"use client";

import { motion, useScroll, useTransform } from "framer-motion";

import { HeroSection } from "./HeroSection";
import { ConversationalBio } from "./ConversationalBio";
import { TransformationSection } from "./TransformationSection";
import { ConversationalLeadIn } from "./ConversationalLeadIn";
import { GallerySection } from "./GallerySection";
import { Footer } from "../layout/Footer";
import { HypnoticCircles } from "../scene/HypnoticCircles";


export function StoryView() {
  const { scrollY } = useScroll();
  
  // Transition logic: 
  // Initially (0 scroll) -> Black text (on White Hero Card)
  // As we scroll (Hero shrinks/darkens) -> White/Neon text
  const textColor = useTransform(scrollY, [0, 200], ["#000000", "#ffffff"]);
  const neonColor = useTransform(scrollY, [0, 200], ["#000000", "#ccff00"]);
  const btnBorder = useTransform(scrollY, [0, 200], ["#000000", "#ccff00"]);

  return (
    <div className="relative w-full">
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <HypnoticCircles primaryColor="#ccff00" secondaryColor="#121212" />
      </div>
      
      {/* GLOBAL FIXED NAV */}
      <div className="fixed top-8 left-8 md:top-12 md:left-12 z-50 pointer-events-none">
          <h1 className="flex flex-col text-2xl md:text-4xl font-bold leading-[0.85] tracking-tighter">
              <span>
                <motion.span style={{ color: textColor }}>R</motion.span>
                <motion.span style={{ color: neonColor }}>R</motion.span>
                <motion.span style={{ color: textColor }}>N</motion.span>
              </span>
          </h1>
      </div>
      <div className="fixed top-8 right-8 md:top-12 md:right-12 z-50">
          <motion.a
              href = "https://ik.imagekit.io/s2kOp/Rohit_R_Nair_January_2026.pdf" 
              download  
              target = "_blank" 
              rel = "noopener noreferrer" 
              style={{ 
                  color: neonColor,
                  borderColor: btnBorder
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 border-2 font-bold tracking-wider uppercase text-sm md:text-base cursor-pointer transition-colors backdrop-blur-sm inline-block"
          >
              RESUME
          </motion.a>
      </div>

      <div className="relative z-10">
        <HeroSection />
        <ConversationalBio />
        <TransformationSection />
        <ConversationalLeadIn />
        <GallerySection />
        <Footer />
      </div>
    </div>
  );
}
